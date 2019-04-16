import React from "react";
import {
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {Card, Button, Divider} from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import {setCategoryFilter} from "./actions";
var config = require('./config');

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
  });
  

const topics = [
            'All',
            'Business',
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

class CategoryFilter extends React.Component {

    constructor(props){
        super(props);
        this.state = {selectedTopics: []};
    }

    onSelectionsChange = (selectedTopics) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedTopics })
      }

      renderItem = ({item}) => (
        <TouchableOpacity onPress = {() => {
            var topic = "";
            if(item != "All")
                topic = item;
            this.props.dispatch(setCategoryFilter(topic));
            this.props.navigation.navigate('HomeScreen');
        }}>
            <Text style = {styles.listStyle}>{item}</Text>
            <Divider style={{ backgroundColor: "#dfe6e9" }} />
        </TouchableOpacity>
      );
    render() {
        console.log('Category Filter screen');
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
          <FlatList
            data = {topics}
            renderItem={this.renderItem}
            keyExtractor={item => item}
          />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(CategoryFilter)

const styles = {
    listStyle:{
        padding: 10,
        fontSize: 20,
        marginLeft: 10,
    }
}