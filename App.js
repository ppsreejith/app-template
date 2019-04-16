import { createStackNavigator, createAppContainer } from "react-navigation";
import Story from "./src/components/Story";
import Home from "./src/Home";
import Login from "./src/Login";
import Profile from "./src/Profile";
import Bookmark from "./src/Bookmark";
import UserOnboard from "./src/UserOnboard";
import CategoryFilter from "./src/CategoryFilter";
import { store } from './src/store';
import { Provider } from "react-redux";
import React from "react";
import { fromLeft, fromRight } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === "HomeScreen" &&
    nextScene.route.routeName === "CategoryScreen"
  ) {
    return fromLeft();
  } else if (
    (prevScene &&
      (prevScene.route.routeName === "CategoryScreen" &&
        nextScene.route.routeName === "HomeScreen")) ||
    nextScene.route.routeName === "ProfileScreen" ||
    nextScene.route.routeName === "StoryScreen"
  ) {
    return fromRight();
  }
  return fromLeft();
};

const MainNavigator = createStackNavigator(
  {
    LoginScreen: { screen: Login },
    UserOnboardScreen: { screen: UserOnboard },
    HomeScreen: { screen: Home },
    CategoryScreen: { screen: CategoryFilter },
    StoryScreen: { screen: Story },
    ProfileScreen: { screen: Profile },
    BookmarkScreen: { screen: Bookmark }
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      title: "Prachaar",
      headerStyle: { backgroundColor: "#db0b30" },
      headerMode: "screen",
      headerTitleStyle: { color: "#fff", textAlign: "center" },
      headerTintColor: "#fff",
      headerRightContainerStyle: { padding: 15 }
    },
    transitionConfig: nav => handleCustomTransition(nav)
  }
);

let Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
