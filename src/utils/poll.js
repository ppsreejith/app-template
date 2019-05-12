import { getActiveBids } from './Routing';
import { calculateFare, getTravelDistance, getTravelDuration } from './';
import _ from 'lodash';
import Store from './Store';

function pollServer() {
  const startTime = Date.now();
  const pollAgain = () => {
    const endTime = Date.now();
    setTimeout(pollServer, Math.max(1000 - (endTime - startTime), 0));
  };
  getActiveBids({
    fromLat: 1,
    fromLng: 2
  }).then((data) => {
    const bids = _.chain(data)
      .map(({
        from_lat,
        from_lng,
        from_address,
        to_lat,
        to_lng,
        to_address,
        metermele,
        created_at,
        otp
      }) => ({
        otp,
        user: {
          name: 'Placeholder'
        },
        pickup: {
          lat: from_lat,
          lng: from_lng,
          description: from_address
        },
        drop: {
          lat: to_lat,
          lng: to_lng,
          description: to_address
        },
        metermele: {
          fare: calculateFare({
            metermele,
            created_at
          })
        },
        travel: {
          distance: {
            text: `${getTravelDistance({
              from_lat,
              from_lng,
              to_lat,
              to_lng
            }).toFixed(0)} km`,
            value: getTravelDistance({
              from_lat,
              from_lng,
              to_lat,
              to_lng
            })
          },
          duration: {
            text: `${getTravelDuration({
              from_lat,
              from_lng,
              to_lat,
              to_lng
            }).toFixed(0)} minutes`
          }
        }
      }))
      .value();
    Store.dispatch({
      type: 'BIDS_RECEIVED',
      payload: {
        bids
      }
    });
    pollAgain();
  }).catch((err) => {
    console.log('Error is', err);
    pollAgain();
  });
}

pollServer();
