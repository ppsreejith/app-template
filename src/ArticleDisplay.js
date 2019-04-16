import React from "react";
import { updateCoins, removeFromReimburse, addInRead } from "./actions";
var config = require("./config");
import { connect } from "react-redux";
// import Toast, {DURATION} from 'react-native-easy-toast'
import Toast from "react-native-root-toast";

async function updateUserCoins(props, article, price) {
  const reducer = props.reducer.toJS();
  var coinsLeft = reducer.userObject.coins + price;
  let toast = Toast.show("Coins left: " + coinsLeft, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
  fetch(config.server_url + "api/user/" + reducer.userObject._id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${reducer.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      coins: reducer.userObject.coins + price
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      props.dispatch(updateCoins(Number(price)));
      moveToStoryScreen(props, article);
    })
    .catch(error => {
      console.error(error);
    });
}

export function checkReadStatus(props, item) {
  const reducer = props.reducer.toJS();
  var index = reducer.userNewsMap.reimbursedArticles.indexOf(item.news_id);
  if (index > -1) props.dispatch(removeFromReimburse(index));
  if (
    reducer.userNewsMap.readArticles.find(function(element) {
      return element == item.news_id;
    }) != undefined
  ) {
    moveToStoryScreen(props, item);
  } else {
    fetch(config.server_url + "api/read", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${reducer.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: reducer.userObject._id,
        news_id: item.news_id
      })
    })
      .then(response => {
        props.dispatch(addInRead(item.news_id));
      })
      .catch(error => {
        console.log(error);
      });
    updateUserCoins(props, item, -1 * item.price);
  }
}

moveToStoryScreen = (props, item) => {
  props.navigation.navigate("StoryScreen", {
    news_id: item.news_id,
    title: item.title,
    content: item.content,
    publishedAt: item.publishedAt,
    source: item.source.name,
    urlToImage: item.urlToImage,
    price: item.price,
    liked: item.liked,
    likeCount: item.likeCount,
    readTime: item.readTime,
    bookmarked: item.bookmarked
  });
};
