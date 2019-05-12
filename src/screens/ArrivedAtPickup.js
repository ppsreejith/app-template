import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ProgressBarAndroid, TextInput } from 'react-native';
import { DriverStatus } from '../components/DriverStatus';
import {CustomerInfo} from '../components/CustomerInfo';
import {Button, Progress} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import Dialog from "react-native-dialog";

class ArrivedAtPickup extends React.Component {
  static navigationOptions = {
    title: 'Arrived at Pickup',
    headerStyle: {
      backgroundColor: '#f39c12',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  componentDidMount(){
    setInterval(() => {
      this.setState(({time}) => ({time: time-1}));
    }, 100);
  }
  constructor(props) {
    super(props);
    this.start = () => {
      this.openOTPDialog();
    }
    this.state = {
      time : 300
    }
    this.closeOTPDialog = this.closeOTPDialog.bind(this);
    this.openOTPDialog = this.openOTPDialog.bind(this);
  }

  closeOTPDialog() {
    this.setState({
      otpDialog: false
    });
  }

  openOTPDialog() {
    this.setState({
      otpDialog: true
    });
  }
  
  render() {
    const acceptedBid = this.props.test.get('selectedBid');
    return (
      <View style={styles.container}>
        <Dialog.Container visible={this.state.otpDialog}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Please enter OTP
          </Dialog.Description>
          <TextInput
              onChangeText={(otp) => this.setState({otp})}
              value={this.state.otp}
          />
          <Dialog.Button label="Cancel" onPress={() => {
              this.closeOTPDialog();
            }}/>
          <Dialog.Button label="Submit" onPress={() => {
              console.log("Comparing", this.state.otp, acceptedBid.otp);
              if (this.state.otp != acceptedBid.otp) {
                return
              };
              this.closeOTPDialog();
              Navigation.navigate('RideInProgress');
            }}/>
        </Dialog.Container>
	<DriverStatus></DriverStatus>
        <CustomerInfo acceptedBid={acceptedBid}></CustomerInfo>
        
        <View style={{flex:1, flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch"}}>
          <View style={{textAlign: "center"}}>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={Math.min((300-this.state.time)/300, 1)}/>
            <Text style={{textAlign: "center", fontSize: 80, fontWeight: "800"}}>{Math.floor(this.state.time/60)}:{(this.state.time%60)} </Text>
          </View>
          <Button style={styles.butt} onPress={this.start}><Text style={styles.buttText}>Start Ride</Text></Button>
          
        </View>
                
			</View>
		);
    }
}

const styles = StyleSheet.create({
    container: {
		padding: 20,
		flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'flex-start'
    },
    butt: {
		padding: 20,
		marginTop: 5,
        backgroundColor: '#f39c12',
	},buttText:{
        color: "#fff",
    }
});

export default connect(({ test }) => ({ test }))(ArrivedAtPickup);
