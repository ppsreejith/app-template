import React from "react";
import {
  View,
  Linking,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import {
  Text,
  Button,
  Divider,
  Card,
  Image,
  Icon
} from "react-native-elements";
import { connect } from "react-redux";
import { addToLike, removeFromLike, removeFromBookmark, addToBookmark } from "../actions";
var config = require("../config");

class Article extends React.Component {
  constructor(props) {
    super(props);
    let reducer = this.props.reducer.toJS();
    let article = this.props.article;
    this.state = {
      grayColor: "#cccccc",
      redColor: "#c0392b",
      liked: reducer.userNewsMap.likedArticles.find(function(element) {
        return element == article.news_id;
      })!=undefined,
      bookmarked: reducer.userNewsMap.bookmarkedArticles.find(function(element) {
            return element == article.news_id;
          })!=undefined,
      likeCount: 0
    };
    this.fetchLikeCount(article.news_id);
  }

  goToStory() {
    this.props.onPress();
  }

  componentWillReceiveProps() {
    this.hasLikedArticle(this.props.article.news_id);
    this.hasBookmarkedArticle(this.props.article.news_id);
    this.fetchLikeCount(this.props.article.news_id);
  }

  hasLikedArticle(news_id) {
    const reducer = this.props.reducer.toJS();
    if (
      reducer.userNewsMap.likedArticles.find(function(element) {
        return element == news_id;
      })!=undefined
    ) {
      this.setState({ liked: true });
    }
    else {
      this.setState({ liked: false });
    }
  }

  hasBookmarkedArticle(news_id) {
    const reducer = this.props.reducer.toJS();
    if (
      reducer.userNewsMap.bookmarkedArticles.find(function(element) {
        return element == news_id;
      })!=undefined
    )
      this.setState({ bookmarked: true });
    else this.setState({ bookmarked: false });
  }

  fetchLikeCount(news_id) {
    const reducer = this.props.reducer.toJS();
    fetch(config.server_url + "api/news/" + news_id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${reducer.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(news => {
        return news.json();
      })
      .then(news => {
        this.setState({
          likeCount: news.data.likeCount
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      if (index > -1) {
        this.props.dispatch(removeFromLike(index));
      }
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
        bookmarked: false
      });
      var index = reducer.userNewsMap.bookmarkedArticles.indexOf(news_id);
      if (index > -1) 
        this.props.dispatch(removeFromBookmark(index));
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
        bookmarked: true
      });
      var index = reducer.userNewsMap.bookmarkedArticles.indexOf(news_id);
      if (index <= -1) this.props.dispatch(addToBookmark(news_id));
    }
  }


  render() {
    const {
      news_id,
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url,
      price,
      content,
      
    } = this.props.article;
    this.props.article.liked = this.state.liked;
    this.props.article.bookmarked = this.state.bookmarked;
    this.props.article.likeCount = this.state.likeCount;
    var colorLike, typeBookmark;
    this.props.article.readTime = 3;
    if (this.state.liked) colorLike = this.state.redColor;
    else colorLike = this.state.grayColor;
    if (this.state.bookmarked) 
      typeBookmark = "font-awesome";
    else 
      typeBookmark = "feather";

    return (
      <TouchableNativeFeedback onPress={() => this.goToStory()}>
        <Card containerStyle={styles.container} wrapperStyle={styles.container}>
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
                  {source.name.toUpperCase()}
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

              <Text style={styles.readTime}>{this.props.article.readTime} min read</Text>
              <Text style={styles.headTitle}>{title}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{description || "Read More.."}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Article);

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 0,
    padding: 0,
    marginBottom: 5,
  },
  noteStyle: {
    margin: 5,
    fontStyle: "normal",
    color: "white",
    fontSize: 10,
    fontWeight: "800",
    textAlignVertical: "center"
  },
  featuredTitleStyle: {
    textAlign: "left",
    padding: 10,
    textAlignVertical: "bottom"
  },
  image: {
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  content: {
    padding: 10,
    fontFamily: "Roboto",
    borderColor: 'gray',
    borderWidth: 0.1,
    borderTopWidth: 0
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  text: {
    marginBottom: 10,
    color: "#333"
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
});
