import React from "react";
import {
  View,
  FlatList,
  TouchableNativeFeedback,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getNews } from "./News";
import Article from "./components/Article";
import { Button, Icon } from "react-native-elements";
var config = require("./config");
import { connect } from "react-redux";
import Toast, { DURATION } from "react-native-easy-toast";
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true, categoryFilter: "" };
    // this.checkReadStatus = this.checkReadStatus.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentWillReceiveProps() {
    this.handleRefresh();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
        onPress={() => {
              navigation.navigate("CategoryScreen");
            }}>
        <Icon
          name="filter"
          type="font-awesome"
          color="white"
          size={20}
          iconStyle={{ marginLeft: 20 }}
        />
        </TouchableOpacity>
      ),
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

  fetchNews() {
    getNews(this.props.reducer.toJS().token)
      .then(articles => {
        !this.isCancelled && this.setState({ articles: articles, refreshing: false });
      })
      .catch(() => this.setState({ refreshing: false }));
  }

  componentWillUnmount() {
    this.isCancelled = true;
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
    const reducer = this.props.reducer.toJS();
    console.log("Home Screen");
    var categories = [
      { category: "Breaking News"},
      { category: "Business" },
      { category: "Policy" },
      { category: "Technology" }
    ];
    dataFlatList = [];
    categoryFilter = this.props.reducer.toJS().categoryFilter;
    if(categoryFilter == "")
          {
    return (
      <ScrollView
        style={{ backgroundColor: "#fff", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {
          categories.map(element => {
          dataFlatList = this.returnFlatListData(element.category);
          if (dataFlatList.length) 
          {
            return (
              <View key={element.category}>
                <Text style={styles.headTitle}>{element.category}</Text>
                <FlatList
                  style={{ marginBottom: 15 }}
                  data={dataFlatList}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.news_id}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              </View>
            );
          } 
          else if(element.category == "Breaking News") return(
            <View key={element.category}>
            <Text style={styles.headTitle}>{element.category}</Text>
            <FlatList
                  style={{ marginBottom: 15 }}
                  data={dataFlatList}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.news_id}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />            
            </View>
          )
          else return null;
        })}
      </ScrollView>
    );
      }
      else {
        dataFlatList = this.returnFlatListData(categoryFilter);
        if (dataFlatList.length) 
          {
            return (
              <View key={categoryFilter}>
                <Text style={styles.headTitle}>{categoryFilter}</Text>
                <FlatList
                  style={{ marginBottom: 15 }}
                  data={dataFlatList}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.news_id}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              </View>
            );
          } 
          else
            return null;
      }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);

const styles = {
  headTitle: {
    color: "#0007",
    fontWeight: "800",
    fontSize: 20,
    fontFamily: "notoserif",
    margin: 5,
    paddingLeft: 20
  }
};
