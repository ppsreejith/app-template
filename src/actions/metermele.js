import makeRequest from '../utils/Network';
import { acceptBid } from '../utils/Routing';

export const update_meter_mele = inc => (dispatch) => {
  dispatch({
    type: 'TEST_UPDATE_METER_MELE',
    payload: {
      increment: inc
    }
  });
};

export const accept_bid = (bid) => {
  console.log('Accepting bid', bid);
  return acceptBid({
    bid_id: bid.id,
    driver_id: 1
  });
};

export const end_bid = (bid) => {
  makeRequest({
    method: 'POST',
    data: {
      id: bid.id
    },
    url: 'endtrip'
  }).then((res) => {
    console.log('response is', res);
  }).catch(err => console.log('error is', err));
};
