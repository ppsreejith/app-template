import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation'
import {storeUserLogin, storeUserNewsMap, storeSessionToken} from "./actions";
import { connect } from "react-redux";

var config = require('./config');
var didSignUp = 0;
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
});

const resetActionToUserOnboard = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'UserOnboardScreen' })],
});

import {Icon} from 'react-native-elements';

class Login extends React.Component {
  constructor(props) {
    super(props);
    didSignUp = 0;
    this.state = { token: null, user: {}, badLogin: null, tokenCheck: false, modalVisible: false, isSigninInProgress: false };
  }

  getUserMap = (userID) => {
    const reducer = this.props.reducer.toJS();
    return fetch(config.server_url + "api/map/" + userID, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${reducer.token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).
    then(response => {
      return response.json();
    })
    .then(response => {
      this.props.dispatch(storeUserNewsMap(response.data));
    })
    .then(response => {
      if(didSignUp == 0)
        this.props.navigation.dispatch(resetAction);
      else
      this.props.navigation.dispatch(resetActionToUserOnboard);
    })
    .catch(error => {
      console.error(error);
    });
  };

  // async googleSetup()
  // {
  //   try {
  //     await GoogleSignIn.initAsync({ clientId: '873721887121-s46hbmoqmo3jv7jf6tc4kmo18gi1qqnm.apps.googleusercontent.com' });
  //   } catch ({ message }) {
  //     alert('GoogleSignIn.initAsync(): ' + message);
  //   }
  // }

  componentWillMount = () => {
    // this.googleSetup();
    var token;
    AsyncStorage.multiGet(["token", "userId"])
      .then(data => {
        if (data[0][1]) {
          token = data[0][1];
          return this.getUser(data[1][1], token);
        }
      })
      .then(user => {
        if(user.status == 404)
        {
          this.setState({token: null});
          return;
        }
        return user.json();
      })
      .then(user => {
        console.log(token);
        this.props.dispatch(storeSessionToken(token));
        this.props.dispatch(storeUserLogin(user.data));
        this.setState({
          user: user,
          token: token,
        });
      })
      .catch(error =>
      {
        this.setState({token: null});
      })
      .finally(() => this.setState({tokenCheck: true}));
  };

  getUser (userId, token) {
    return  fetch(config.server_url + "api/user/" + userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  submitCredentials = user => {
    if (user.username !== undefined && user.password !== undefined) {
      this.login(
        {
          username: user.username,
          password: user.password
        },
        () => {
          this.setState({ badLogin: true });
        }
      );
    }
  };

  signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  login = (user, callback) => {
    fetch(config.server_url + "api/login", {
    method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.token && response.user) {
          AsyncStorage.multiSet([
            ["token", response.token],
            ["userId", response.user._id.toString()]
          ]);
          this.props.dispatch(storeSessionToken(response.token));
          this.props.dispatch(storeUserLogin(response.user));
          this.setState({token: response.token});
          this.getUserMap(response.user._id);
          
        } else {
          console.log("Wrong password");
          if (callback) {
            callback();
          }
        }
      })
      .done();
  };

  handleEmail = text => {
    this.state.user.username = text;
  };

  handlePassword = text => {
    this.state.user.password = text;
  };

  onSignUp() {
    didSignUp = 1;
    fetch(config.server_url + "api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.user.username,
        password: this.state.user.password,
        imgUrl: 'www.facebook.com/'
      })
    })
      .then( response => {
        return response.json();
      })
      .then(response => {
        if (response.token && response.user) {
          AsyncStorage.multiSet([
            ["token", response.token],
            ["userId", response.user._id.toString()]
          ]);
          this.props.dispatch(storeSessionToken(response.token));
          this.props.dispatch(storeUserLogin(response.user));
          this.setState({token: response.token});
          this.getUserMap(response.user._id);
        }
      });
  }

  render() {
   console.log("Login Screen");
    const { navigate } = this.props.navigation;
       if (!this.state.tokenCheck) {
           return (
             <View style={{backgroundColor:'#db0b30', flex: 1, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
               {/* <Icon name="bullhorn"  type='font-awesome' color="#fff" size= {105}/> */}
               <Image
                 source = {require('../assets/icon.png')}
               />
             </View>
          )
         }
      else if (!this.state.token && this.state.tokenCheck) {      
        return (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email ID"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={this.handleEmail}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.submitCredentials(this.state.user)}
          >
            <Text style={styles.submitButtonText}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.onSignUp()}
          >
            <Text style={styles.submitButtonText}> Sign Up</Text>
            </TouchableOpacity>
            {/* <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
              disabled={this.state.isSigninInProgress} 
              /> */}
              
        </View>
      );
    } else {
      const reducer = this.props.reducer.toJS();
      this.getUserMap(reducer.userObject._id);
      return (
        // this.props.navigation.dispatch(resetAction)
        <View></View>
      );
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Login)


const styles = {
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: "#db0b30",
    borderWidth: 1,
    textAlign: "center",
    color: "white"
  },
  submitButton: {
    backgroundColor: "#db0b30",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
};
