import React from "react";
import {
  View,
  FlatList,
  TouchableNativeFeedback,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { getNewsForID } from "./News";
import Article from "./components/Article";
import { Button, Icon } from "react-native-elements";
var config = require("./config");
import { connect } from "react-redux";
import { updateCoins, removeFromReimburse, addInRead } from "./actions";
import { checkReadStatus } from "./ArticleDisplay";

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

class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              marginRight: 25,
              textAlign: "center"
            }}
          >
            <CountContainer /> &#8377;
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileScreen");
            }}
          >
            <Icon
              name="account-circle"
              color="#fff"
              iconStyle={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    this.fetchNews();
  }

  componentWillReceiveProps() {
    this.handleRefresh();
  }
  fetchNews() {
    getNewsForID(
      this.props.reducer.toJS().token,
      this.props.reducer.toJS().userNewsMap.userID
    )
      .then(articles => {
        this.setState({ articles: articles, refreshing: false });
      })
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }

  renderItem = ({ item }) => (
    <Article
      article={item}
      onPress={() => {
        checkReadStatus(this.props, item);
      }}
    />
  );

  returnFlatListData(category) {
    if (category == "") {
      list = [];
      for (var i = 5; i < this.state.articles.length; i++) {
        var each = this.state.articles[i];
        list.push(each);
      }
      return list;
    }
    list = [];
    for (var i = 0; i < this.state.articles.length; i++) {
      var each = this.state.articles[i];
      if (each.category == category) list.push(each);
    }
    return list;
  }

  render() {
    console.log("Bookmark Screen");
    return (
      <ScrollView
        style={{ backgroundColor: "#fff", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          style={{ marginBottom: 15 }}
          data={this.state.articles}
          renderItem={this.renderItem}
          keyExtractor={item => item.news_id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Bookmark);
