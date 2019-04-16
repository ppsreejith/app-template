import React from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  CheckBox,
  TouchableNativeFeedback,
  BackHandler
} from "react-native";
import { Text, Icon, Divider, Button } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
var config = require("../config");
import { connect } from "react-redux";
import Toast from 'react-native-root-toast';
import { addToLike, removeFromLike, removeFromRead, addToReimburse, updateCoins, removeFromBookmark, addToBookmark } from "../actions";

var radio_props = [
  { label: "I opened the article by accident", value: 0 },
  { label: "Its too pricey", value: 1 },
  { label: "The article was too short", value: 2 },
  { label: "The article was too long", value: 3 },
  { label: "The article did not meet my expectations", value: 4 },
  { label: "Article was illegible", value: 5 }
];

class Count extends React.Component {
  render() {
    return (
      <Text>
        {JSON.stringify(this.props.reducer.toJS().userObject.coins, 0)}
      </Text>
    );
  }
}

let CountContainer = connect(({ reducer }) => ({ reducer }))(Count);

class Story extends React.Component {
  state = {
    modalVisible: false,
    liked: false,
    bookmarked: false,
    likeCount: 0,
    grayColor: "#a6a6a6",
    redColor: "#c0392b"
  };
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ color: "#fff", fontSize: 15, marginRight: 25 }}>
          <CountContainer /> &#8377;
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileScreen");
          }}
        >
          <Icon name="account-circle" color="#fff" />
        </TouchableOpacity>
      </View>
    )
  });

  onBackPressed(){
    this.props.handleRefresh();
  }

  componentDidMount() {
    this.setState({ liked: this.props.navigation.getParam("liked") });
    this.setState({ likeCount: this.props.navigation.getParam("likeCount") });
    this.setState({bookmarked : this.props.navigation.getParam("bookmarked")});
    //BackHandler.addEventListener("hardwareBackPress", this.onBackPressed());
  }

  componentWillUnmount(){
    //BackHandler.removeEventListener("hardwareBackPress", this.onBackPressed());
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleRefund(price) {
    reducer = this.props.reducer.toJS();
    fetch(config.server_url + "api/user/" + reducer.userObject._id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${reducer.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coins: reducer.userObject.coins + Number(price)
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.dispatch(updateCoins(Number(price)));
        //BackHandler.removeEventListener("hardwareBackPress", this.onBackPressed());
        this.props.navigation.navigate("HomeScreen");
      })
      .catch(error => {
        console.error(error);
      });
  }

  onClaimReimbursement(news_id, price) {
    const reducer = this.props.reducer.toJS();
    var indexRead = reducer.userNewsMap.readArticles.indexOf(news_id);
    if (indexRead > -1) 
        this.props.dispatch(removeFromRead(indexRead));
    var indexReimburse = reducer.userNewsMap.reimbursedArticles.indexOf(
      news_id
    );
    if (indexReimburse > -1) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      var coinsLeft = Number(price) + Number(reducer.userObject.coins);
      let toast = Toast.show('Coins reimbursed. Balance: ' + coinsLeft , {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
      fetch(config.server_url + "api/reimburse", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reducer.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: reducer.userObject._id,
          news_id: news_id
        })
      }).catch(error => {
        console.log(error);
      });
      this.props.dispatch(addToReimburse(news_id));
      this.handleRefund(price);
    }
  }

  onBookmarkPress(news_id) {
    const reducer = this.props.reducer.toJS();
    if (this.state.bookmarked) {
      fetch(config.server_url + "api/unsave", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reducer.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: reducer.userObject._id,
          news_id: news_id
        })
      }).catch(error => {
        console.error(error);
      });
      this.setState({
        bookmarked: false,
      });
      var index = reducer.userNewsMap.bookmarkedArticles.indexOf(news_id);
      if (index > -1) this.props.dispatch(removeFromBookmark(index));
    } else {
      fetch(config.server_url + "api/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reducer.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: reducer.userObject._id,
          news_id: news_id
        })
      }).catch(error => {
        console.error(error);
      });
      this.setState({
        bookmarked: true,
      });
      var index = reducer.userNewsMap.bookmarkedArticles.indexOf(news_id);
      if (index <= -1) this.props.dispatch(addToBookmark(news_id));
    }
  }


  onLikePress(news_id) {
    const reducer = this.props.reducer.toJS();
    if (this.state.liked) {
      fetch(config.server_url + "api/unlike", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reducer.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: reducer.userObject._id,
          news_id: news_id
        })
      }).catch(error => {
        console.error(error);
      });
      this.setState({
        liked: false,
        likeCount: this.state.likeCount - 1
      });
      var index = reducer.userNewsMap.likedArticles.indexOf(news_id);
      if (index > -1) this.props.dispatch(removeFromLike(index));
    } else {
      fetch(config.server_url + "api/like", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${reducer.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: reducer.userObject._id,
          news_id: news_id
        })
      }).catch(error => {
        console.error(error);
      });
      this.setState({
        liked: true,
        likeCount: this.state.likeCount + 1
      });
      var index = reducer.userNewsMap.likedArticles.indexOf(news_id);
      if (index <= -1) this.props.dispatch(addToLike(news_id));
    }
  }

  render() {
    console.log("Story Screen");
    const defaultImg =
      "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";
    const { navigation } = this.props;
    const news_id = navigation.getParam("news_id", "1");
    const title = navigation.getParam("title", "Lorem Ipsum");
    const content = navigation.getParam("content", "Lorem Ipsum");
    const publishedAt = navigation.getParam("publishedAt", "Lorem Ipsum");
    const source = navigation.getParam("source", "Lorem Ipsum");
    const urlToImage =
      navigation.getParam("urlToImage", "Lorem Ipsum") || defaultImg;
    const price = Number( navigation.getParam("price", "Lorem Ipsum"));
    const readTime = navigation.getParam("readTime", "Lorem Ipsum");
    var colorLike;
    var typeBookmark = "feather";
    if (this.state.liked) colorLike = this.state.redColor;
    else colorLike = this.state.grayColor;
    if (this.state.bookmarked) 
      typeBookmark = "font-awesome";
    else 
      typeBookmark = "feather";
    return (
      <ScrollView showsVerticalScrollIndicator={true} >
        <Modal 
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.modalBack}>
            <View style={styles.modal}>
              <View style={styles.qa}>
                <Text style={styles.why}>Why do you wish to get a refund?</Text>
                <RadioForm
                  buttonTextActiveStyle={{ color: "white" }}
                  radio_props={radio_props}
                  initial={0}
                  onPress={value => {
                    this.setState({ value: value });
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: 40
                }}
              >
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Cancel"
                  type="outline"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
                <Button
                  containerStyle={{ width: "40%" }}
                  title="Confirm"
                  type="outline"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.onClaimReimbursement(news_id, price);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View>
            <Image
              resizeMode="cover"
              source={{ uri: urlToImage }}
              style={styles.image}
            />
            <View style={styles.overlay} />
            <View style={styles.newsSource}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.noteStyle}>
                  {source.toUpperCase()}
                </Text>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                  <View style={{borderRadius: 5, borderColor:'white', borderWidth: 1}}>
                  <Text style={styles.noteStyle}>{price} &#8377;</Text>
                  </View>
                  <TouchableWithoutFeedback
                  onPress={() => this.onBookmarkPress(news_id)}
                >
                  <Icon
                    name="bookmark"
                    // type="font-awesome"
                    type={typeBookmark}
                    color="white"
                    size={25}
                    iconStyle={{ padding: 4, paddingLeft: 10}}
                  />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View>
                
                  <View style={styles.headIconsContainer}>
                  <TouchableNativeFeedback
                  onPress={() => this.onLikePress(news_id)}
                >
                    <View style={styles.headIcons}>
                      <Text
                        style={{ fontSize: 12, padding: 2, fontWeight: "800" }}
                      >
                        {this.state.likeCount}
                      </Text>
                      <Icon
                        name="heart"
                        type="font-awesome"
                        color={colorLike}
                        size={15}
                        iconStyle={{ padding: 4 }}
                      />
                    </View>
                </TouchableNativeFeedback>
                  </View>
              </View>
            </View>

            <View style={styles.head}>

              <Text style={styles.readTime}>{readTime} min read</Text>
              <Text style={styles.headTitle}>{title}</Text>
            </View>
          </View>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <View>
          <Text style={styles.content}>{content}</Text>
        </View>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <TouchableOpacity>
          <Text
            style={styles.reimbursedStyle}
            onPress
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            Didn't like the article? Claim a refund.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Story);

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: "normal",
    color: "white",
    fontSize: 10,
    fontWeight: "800",
    textAlignVertical: "center"
  },
  reimbursedStyle: {
    margin: 5,
    fontStyle: "normal",
    color: "#dfe6e9",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    padding: 5,
  },
  headline: {
    margin: 5,
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    justifyContent: "center",
    color: "white"
  },
  content: {
    margin: 5,
    marginBottom: 20,
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "justify",
    fontFamily: "Roboto",
    color: "#333"
  },
  modal: {
    flex: 0,
    margin: 40,
    alignItems: "stretch",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    flexDirection: "column",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  modalBack: {
    backgroundColor: "#999",
    flex: 1,
    alignItems: "center",
    height: "auto",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  image: {
    height: 250,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  head: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 10
  },
  headTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
    fontFamily: "notoserif"
  },
  headIconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5
  },
  headIcons: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: "row"
  },
  overlay: {
    backgroundColor: "#333",
    opacity: 0.6,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    marginBottom: 10,
    color: "#333"
  },
  why: {
    fontWeight: "800",
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center"
  },
  qa: {
    padding: 40
  },
  newsSource: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    padding: 10
  },
  readTime: {
    color: 'white',
  }
};
