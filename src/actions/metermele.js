import makeRequest from "../utils/Network";

export const update_meter_mele = (inc) => {
    return (dispatch) => {
        dispatch({
            type: "TEST_UPDATE_METER_MELE",
            payload: {
                increment: inc
            }
        })
    }
}

export const accept_bid = (bid) => {
  makeRequest({
    method: "POST",
    data: {
      id: bid.id,
      driver: "alskdfjksljdhf"
    },
    url: "acceptbid"
  }).then(res => {
    console.log('response is', res);
  }).catch(err => console.log("error is", err));
}

export const end_bid = (bid) => {
  makeRequest({
    method: "POST",
    data: {
      id: bid.id
    },
    url: "endtrip"
  }).then(res => {
    console.log('response is', res);
  }).catch(err => console.log("error is", err));
}
