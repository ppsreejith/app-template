import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ProgressBarAndroid } from 'react-native';
import { DriverStatus } from '../components/DriverStatus';
import {CustomerInfo} from '../components/CustomerInfo';
import {Button, Progress} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';


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
            //Do something
            Navigation.navigate('RideInProgress');
        }
        this.state = {
            time : 300
        }
    }
   
    render() {
        const acceptedBid = this.props.test.get('selectedBid');
		return (
			<View style={styles.container}>
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
