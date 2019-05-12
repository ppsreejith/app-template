export const createReducer = (initialState, reducers) => (state = initialState, action = {}) => ((action.type in reducers) ? reducers[action.type](state, action.payload) : state);

export const getTravelDistance = ({
  from_lat,
  from_lng,
  to_lat,
  to_lng
}) => 5;

export const getTravelDuration = ({
  from_lat,
  from_lng,
  to_lat,
  to_lng
}) => 5;

export const calculateFare = ({
  created_at,
  metermele
}) => {
  const msSinceStart = (new Date()) - (new Date(created_at));
  const msIn1Minute = 500 * 60 * 1000.0;
  const currentMetermele = metermele * (msSinceStart / msIn1Minute);
  return Math.min(metermele, currentMetermele);
};
