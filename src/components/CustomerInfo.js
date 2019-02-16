import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@ant-design/react-native';

export class CustomerInfo extends React.Component {
    render() {

        const bid = this.props.acceptedBid;
        return (
            <View style={styles.container}>
                <View style={styles.rowDivider}>
                    <View style={[styles.colDivider,{borderBottomColor:"#eee",borderBottomWidth: 1}]}>
                        <View style={{flex:2, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Image source={require('../../assets/batman.jpg')} style={{width: 100, height: 100, borderRadius: 100/2}} />
                            <Text>{bid.user.name}</Text>
                        </View>
                        <View  style={{flex:3, justifyContent: 'space-between', padding: 10}}>
                            <Text><Text style={{fontWeight:"800"}}>From: </Text><Text>{bid.pickup.description}</Text></Text>
                            <Text><Text  style={{fontWeight:"800"}}>To: </Text><Text>{bid.drop.description}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.colDivider}>
                        <View style={styles.rowDivider}>
                            <Text style={styles.title}>₹{Math.max(bid.travel.distance.value*13/1000,26).toFixed(0)}</Text>
                            <Text style={styles.backgroundText}>Total Fare</Text>
                        </View>
                        <View style={styles.rowDivider}>
                            <Text style={styles.title}>₹{bid.metermele.fare.toFixed(0)}</Text>
                            <Text style={styles.backgroundText}>Meter Mele</Text>
                        </View>
                    
                    </View>
                    
                </View>
                    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    rowDivider: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    colDivider: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 50,
        fontWeight: "800",
    },
    backgroundText: {
        color: "#aaa"
    },
    white: {
        color: "#333"
    }
});
