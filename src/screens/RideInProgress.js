import React from 'react';
import { connect } from 'react-redux';
import {end_bid} from '../actions/metermele';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DriverStatus } from '../components/DriverStatus';
import {CustomerInfo} from '../components/CustomerInfo';
import {Button} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';

class RideInProgress extends React.Component {
    static navigationOptions = {
        title: 'Ride in Progress',
        headerStyle: {
          backgroundColor: '#f39c12',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    constructor(props) {
		super(props);
		this.end = (bid) => {
                  //Do something
                  end_bid(bid);
            Navigation.navigate('Home');
        }
    }
   
    render() {
        const acceptedBid = this.props.test.get('selectedBid');
		return (
			<View style={styles.container}>
				<DriverStatus></DriverStatus>
                <CustomerInfo acceptedBid={acceptedBid}></CustomerInfo>
                <Button style={styles.butt} onPress={() => this.end(acceptedBid)}><Text style={styles.buttText}>End Ride</Text></Button>
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
		padding: 10,
		marginTop: 5,
        backgroundColor: '#f39c12',
	},buttText:{
        color: "#fff",
    }
});

export default connect(({ test }) => ({ test }))(RideInProgress);
