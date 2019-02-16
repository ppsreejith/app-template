import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image} from 'react-native';
import {update_meter_mele} from '../actions/metermele'
import { Button} from '@ant-design/react-native';

class DriverStatusComponent extends React.Component {
    render() {
        const earnings = this.props.test.get('earnings');
        const minimumMeterMele = this.props.test.get('minimumMeterMele');
      return (
        <View style={styles.container}>
            <View style={styles.rowDivider}>
              <Text style={styles.title}>{earnings}</Text>
              <Text style={styles.backgroundText}>Today's Earnings</Text>
            </View>
            <View style={styles.rowDivider}>
                <View style={styles.colDivider}>
                    <Button style={styles.rectButtons}
                        onPress={() => this.props.dispatch(update_meter_mele(-10))}
                    ><Text style={styles.white}>-</Text></Button>
                    <Text style={styles.title}>{minimumMeterMele}</Text>
                    <Button style={styles.rectButtons}
                        onPress={() => this.props.dispatch(update_meter_mele(10))}
                    ><Text style={styles.white}>+</Text></Button>
                </View>
                <Text style={styles.backgroundText}>Minimum Meter Mele</Text>
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
      padding: 10
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
    rectButtons: {
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor:  '#eee',
        borderColor: "#fff"
    },
    backgroundText:{
        color: "#aaa"
    },
    white:{
        color: "#333"
    }
  });
  
export const DriverStatus = connect(
    ({ test }) => ({ test })
    )(DriverStatusComponent);

  