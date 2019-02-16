import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import { DriverStatus } from '../components/DriverStatus';
import { ListItem } from '../components/ListItem';
const _ = require('lodash');

class Home extends React.Component {
	static navigationOptions = {
		title: 'Meter Mele',
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
		this.state = {
			visible: false
		};
		this.bidAccept = (bid) => {
			console.log(bid);
			Alert.alert(
				'Bid Confirmation',
				'Accept this bid with meter mele ' + bid.metermele.fare.toFixed(0) + 'Rs. ?',
				[
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{
						text: 'OK', onPress: () => {
							console.log('OK Pressed');
							this.props.dispatch({
								type: "BID_SELECT",
								payload: {
									bid: bid
								}
							});
							Navigation.navigate('AcceptedRide');
						}
					}
				],
				{ cancelable: true },
			);
		};
	}


	render() {
		const bids = this.props.test.get('bids');
		const minimumMeterMele = this.props.test.get('minimumMeterMele')
		const filteredBids = bids.filter(function(item){
								return item.metermele.fare.toFixed(0)>=minimumMeterMele;         
							}).sort(function(a,b){ 
								var x = a.metermele.fare > b.metermele.fare? -1:1; 
								return x; 
							})
		return (
			<View style={styles.container}>
				<DriverStatus></DriverStatus>
				<ScrollView style={styles.scroller}>
					{
						_.map(filteredBids, bid => <TouchableOpacity onPress={() => this.bidAccept(bid)}><ListItem bid={bid} /></TouchableOpacity>)
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: '#eee'
	},
	scroller: {
		marginTop: 20,
		flex: 1,
		backgroundColor: '#eee'
	}
});

export default connect(({ test }) => ({ test }))(Home);
