import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import {Card, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';
import { StackActions, NavigationActions } from 'react-navigation'

var config = require('./config');

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
  });
  

const topics = ['Business',
            'Colleges and Universities',
            'Economy',
            'Entertainment',
            'Environment',
            'Government',
            'Local/Regional',
            'Media',
            'Opinion/Editorial',
            'Policy',
            'Politics',
            'Regulations',
            'Religion-and-Spirituality',
            'Science',
            'Sports',
            'Startups',
            'Technology',
            'Traffic & Roads',
            'Weather',
            'World']

// const renderLabel = (label, style) => {
//     return (
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
//         <View style={{marginLeft: 10}}>
//           <Text style={style}>{label}</Text>
//         </View>
//       </View>
//     )
//   }

class UserOnboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {selectedTopics: []};
    }

    onSelectionsChange = (selectedTopics) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedTopics })
      }
    render() {
        console.log('User Onboard screen');
        return (
            <View style={styles.page}>
                        

                {/* <View style={{ flex: 3, flexDirection: 'row', width: '100%',justifyContent: 'space-evenly' }}>
                <TouchableOpacity>
                    <Card containerStyle={styles.topic} wrapperStyle={styles.topic}>
                    <View style ={{flexDirection: 'column'}}>
                        <Image 
                        resizeMode="cover"
                        source={require('../icons/play.png')} 
                        style={styles.topicImage}
                        />
                        <View style={{alignItems: "stretch"}}>
                            <Text style={styles.text}>Play</Text>
                        </View>
                        </View>
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Card containerStyle={styles.topic} wrapperStyle={styles.topic}>
                    <View style ={{flexDirection: 'column'}}>
                        <Image 
                        resizeMode="cover"
                        source={require('../icons/play.png')} 
                        style={styles.topicImage}
                        />
                        <View style={{alignItems: "stretch"}}>
                            <Text style={styles.text}>Play</Text>
                        </View>
                        </View>
                    </Card>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Card containerStyle={styles.topic} wrapperStyle={styles.topic}>
                    <View style ={{flexDirection: 'column'}}>
                        <Image 
                        resizeMode="cover"
                        source={require('../icons/play.png')} 
                        style={styles.topicImage}
                        />
                        <View style={{alignItems: "stretch"}}>
                            <Text style={styles.text}>Play</Text>
                        </View>
                        </View>
                    </Card>
                    </TouchableOpacity>
                </View> */}
                <View>
                <SelectMultiple
          items={topics}
        //   renderLabel={renderLabel}
          selectedItems={this.state.selectedTopics}
          onSelectionsChange={this.onSelectionsChange} />
            </View>
            <View style={{padding: 5}}>
            <Button
                  containerStyle={{ width: "40%" }}
                  title="Submit"
                  type="outline"
                  onPress={() => {
                    // this.setModalVisible(!this.state.modalVisible);
                    // this.onClaimReimbursement(news_id, price);
                    this.props.navigation.dispatch(resetAction);
                  }}
                />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(UserOnboard)

const styles = {
    topic: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        // padding: 5,
        margin: 5,
        backgroundColor: "yellow",
        // alignItems: "stretch",
    },
    page: {
        padding: 5,
        marginBottom: 100
        // backgroundColor: "#dfe6e9",
        // height: 'auto',
    },
    topicImage: {
        width: 100,
        height: 100,
        
    },
    text: {
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}