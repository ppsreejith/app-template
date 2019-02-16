import { createStackNavigator } from 'react-navigation';
import _ from "./utils/poll";
import Home from './screens/Home';
import About from './screens/About';
import AcceptedRide from './screens/AcceptedRide';
import ArrivedAtPickup from './screens/ArrivedAtPickup';
import RideInProgress from './screens/RideInProgress';

export default createStackNavigator(
  {
    Home,
    About,
    AcceptedRide,
    ArrivedAtPickup,
    RideInProgress
  },
  {
    initialRouteName: 'Home'
  }
);
