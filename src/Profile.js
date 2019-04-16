import React from "react";
import { View, TouchableNativeFeedback, AsyncStorage, TextInput, Modal, BackHandler } from "react-native";
import { Text, Button, Card, Divider, Icon } from "react-native-elements";
import {connect} from 'react-redux';
import { updateCoins } from "./actions";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

var config = require('./config');

var radio_props = [
  { label: "Debit/Credit Card", value: 0 },
  { label: "Net banking", value: 1 },
  { label: "UPI", value: 2 },
  { label: "More payment options", value: 3 }
];

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {modalVisible: false, rechargeAmount: 0 };
  }
  logout = () => {
    console.log("Logout pressed");
    AsyncStorage.multiRemove(["userId", "token"]);
    this.props.navigation.navigate("LoginScreen");
  };

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onRecharge() {
    console.log("Recharge amount: " + this.state.rechargeAmount);
    reducer = this.props.reducer.toJS();
    fetch(config.server_url + "api/user/" + reducer.userObject._id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${reducer.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coins: reducer.userObject.coins + Number(this.state.rechargeAmount)
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.dispatch(updateCoins(Number(this.state.rechargeAmount)));
        this.setState({rechargeAmount:0});
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log("Profile Screen");
    const { label, data, input } = styles;
    const { navigation } = this.props;
    const reducer = this.props.reducer.toJS();
    var asterisk = "*"
    var password = asterisk.repeat(reducer.userObject.password.length);
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.modalBack}>
            <View style={styles.modal}>
              <View 
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
                alignItems: 'center'
              }}>
                <Text style={label}>Enter recharge amount</Text>
                <TextInput
                  style={input}
                  underlineColorAndroid="transparent"
                  placeholder="0"
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  clearButtonMode="always"
                  onChangeText={(text) => this.setState({rechargeAmount : Number(text)})}
                />
              </View>
              <Divider style={{ backgroundColor: "#dfe6e9" }} />
              <View style={{padding: 20}}>
              <RadioForm
                  buttonTextActiveStyle={{ color: "white" }}
                  radio_props={radio_props}
                  initial={0}
                  onPress={value => {
                    this.setState({ value: value });
                  }}
                />
                </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 40
                }}
              >
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Cancel"
                  type="outline"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Confirm"
                  type="outline"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.onRecharge();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>
          My Profile
        </Text>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10
          }}
        >
          <Text style={label}>Username</Text>
          <Text style={data}>{reducer.userObject.email}</Text>
        </View>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10
          }}
        >
          <Text style={label}>Change Password</Text>
          <Text style={data} secureTextEntry="true">
            {password}
          </Text>
        </View>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10
          }}
        >
          <Text style={label}>Coins</Text>
          <Text style={data}>{reducer.userObject.coins} &#8377;</Text>
        </View>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <TouchableNativeFeedback onPress={() => this.setModalVisible(true)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10
          }}
        >
        <Text style={label}>Recharge</Text>
        <View style={{alignItems: 'center'}}>
        <Icon name="plus-circle" type='font-awesome' color= 'gray' size= {20} iconStyle={{padding:4, textAlign:'right'}}/>  
        </View>
          </View></TouchableNativeFeedback>
          <Divider style={{ backgroundColor: "#dfe6e9" }} />
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("BookmarkScreen")}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10
          }}
        >
          <Text style={label}>Bookmarked Articles</Text>
        </View>
        </TouchableNativeFeedback>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <TouchableNativeFeedback onPress={() => this.logout()}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10
            }}
          >
            <Text style={label}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
        {/* <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-end"
                }}
              >
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Recharge"
                  type="outline"
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                />
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Logout"
                  type="outline"
                  onPress={() => {
                    this.logout();
                  }}
                />
              </View> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Profile)


const styles = {
  label: {
    textAlign: "left",
    margin: 5,
    color: "black",
    fontSize: 15
  },
  data: {
    textAlign: "right",
    margin: 5,
    fontStyle: "italic",
    color: "gray",
    fontSize: 15
  }, 
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: "#16a085",
    borderWidth: 1,
    textAlign: "center",
    color: "gray"
  },
  modal: {
    flex: 0,
    margin: 40,
    alignItems: "stretch",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    flexDirection: "column",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  modalBack: {
    backgroundColor: "#999",
    flex: 1,
    alignItems: "center",
    height: "auto",
    textAlignVertical: "center",
    justifyContent: "center"
  },
};
