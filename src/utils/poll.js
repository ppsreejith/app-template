import Network from "../utils/Network";
import Store from "./Store";

function pollServer () {
  const startTime = Date.now();
  const pollAgain = () => {
    const endTime = Date.now();
    setTimeout(pollServer, Math.max(1000 - endTime + startTime, 0));
  };
  Network({
    url: "requests"
  }).then(data => {
    console.log("data is", data);
    Store.dispatch({
      type: "BIDS_RECEIVED",
      payload: {
        bids: data
      }
    });
    pollAgain();
  }).catch(err => {
    console.log("Error is", err);
    pollAgain();
  });
}

pollServer();
