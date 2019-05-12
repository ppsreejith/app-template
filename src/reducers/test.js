import Immutable from 'immutable';
import { createReducer } from '../utils';

const initialState = Immutable.Map({
  name: 'Hello World',
  earnings: 600,
  minimumMeterMele: 0,
  bids: [],
  selectedBid: {}
});

const reducers = {
  TEST_RECEIVED: (state, { name }) => state.set('name', name),
  TEST_UPDATE_EARNINGS: (state, { amount }) => state.update('earnings', earning => earning + amount),
  TEST_UPDATE_METER_MELE: (state, { increment }) => state.update('minimumMeterMele', minimumMeterMele => Math.max(minimumMeterMele + increment, 0)),
  BIDS_RECEIVED: (state, { bids }) => state.set('bids', bids),
  BID_SELECT: (state, { bid }) => state.set('selectedBid', bid)

};

export default createReducer(initialState, reducers);
