import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DriverStatus } from '../components/DriverStatus';
import {CustomerInfo} from '../components/CustomerInfo';
import {Button} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';


class AcceptedRide extends React.Component {
    static navigationOptions = {
        title: 'Ride Accepted',
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
		this.reached = () => {
            //Do something
            Navigation.navigate('ArrivedAtPickup');
        }
    }
    render() {
        const acceptedBid = this.props.test.get('selectedBid');
		return (
			<View style={styles.container}>
				<DriverStatus></DriverStatus>
                <CustomerInfo acceptedBid={acceptedBid}></CustomerInfo>
                <Button style={styles.butt}><Text style={styles.buttText}>Call Customer</Text></Button>
                <Button style={styles.butt}><Text style={styles.buttText}>Navigate to Pickup</Text></Button>
                <Button style={styles.butt} onPress={this.reached}><Text style={styles.buttText}>Reached Pickup Point</Text></Button>
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
		flex: 1,
        backgroundColor: '#f39c12',
	},buttText:{
        color: "#fff",
    }
});

export default connect(({ test }) => ({ test }))(AcceptedRide);
