import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Button} from '@ant-design/react-native';
import _ from 'lodash';

export class ListItem extends React.Component {
    render() {
        const bid = this.props.bid;
        // console.log('yo',bid.metermele);
      return (
        <View style={styles.container}>
            <View style={styles.rowDivider}>
                <View style={styles.colDivider}>
                    <View style={styles.rowDividerLeft}>
                        <View style={styles.colDivider}>
                            <Text style={styles.fromto}>From</Text>
                            <Text numberOfLines={1} style={styles.title}>{bid.pickup.description || "GoJek Office"}</Text>
                        </View>
                        <View style={styles.colDivider}>
                            <Text style={styles.fromto}>To</Text>
                            <Text numberOfLines={1} style={styles.title}>{bid.drop.description || "Indiranagar metro station"}</Text>
                        </View>
                        <View style={styles.colDividerSpace}>
                            <Text>
                                <Text style={styles.backgroundText}>Distance : </Text>
                                <Text style={styles.backgroundText}>{_.get(bid, 'travel.distance.text', '1.2 km')}</Text>
                            </Text>
                            <Text>
                                <Text style={styles.backgroundText}>Est. Time : </Text>
                                <Text style={styles.backgroundText}>{_.get(bid, 'travel.duration.text', '5 min')}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rowDividerRight}>
                      <Text style={styles.fatTitle}>₹{Math.max(_.get(bid, 'travel.distance.value', 1.2)*13/1000,26).toFixed(0)}</Text>
                        <Text>+ meter mele</Text>
                        <Text style={styles.mm}>₹{bid.metermele.fare.toFixed(0)}</Text>
                    </View>
                </View>
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 10,
      borderBottomColor: '#eee',
      borderBottomWidth: 1
    },
    rowDivider: {
        flex: 1,
        flexDirection: 'column',
    },
    rowDividerLeft: {
        flex: 3,
        flexDirection: 'column',
    },
    rowDividerRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colDivider: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    colDividerSpace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "300",
        maxWidth: 200
    },
    fatTitle: {
        fontSize: 30,
        fontWeight: "800",
    },
    mm: {
        fontSize: 30,
        fontWeight: "800",
        color: "#fff",
        backgroundColor: "#27ae60",
        padding: 5,
        width: 80,
        textAlign: 'center',
        borderRadius: 5
    },
    backgroundText:{
        color: "#aaa"
    },
    white:{
        color: "#333"
    },
    fromto:{
        backgroundColor: "#eee",
        color: "#333",
        padding: 3,
        width: 50,
        textAlign: "center",
        marginRight: 5,
        borderRadius: 5
    }
  });

  
