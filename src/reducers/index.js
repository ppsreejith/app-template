import Immutable from "immutable";

const initialState = Immutable.fromJS({ 
	
	userObject: 
	{ 
		email: "",
		password: "", 
	    imgUrl: "",
		coins: 0,
	},
	userNewsMap: {
		userID: "",
		likedArticles: [],
		readArticles: [],
		reimbursedArticles: [],
		bookmarkedArticles: [],
	},
	token: "",
	categoryFilter: "",
 });

export default function reducer(state, action) {
	if (state == undefined) {
		return initialState;
	}
	switch(action.type)
	{
		case "SAVE_TOKEN":
			return state.update('token', () => Immutable.fromJS(action.payload));
		case "USER_LOGIN":
			return state.update('userObject', () => Immutable.fromJS(action.payload));
		case "USER_NEWS_MAP":
			return state.update('userNewsMap', () => Immutable.fromJS(action.payload));
		case "UPDATE_COINS":
			return state.updateIn(['userObject', 'coins'], (coins) => coins + action.payload);
		case "ON_ADD_READ":
			return state.updateIn(['userNewsMap', 'readArticles'], (readArticles) => readArticles.push(action.payload));
		case "ON_REMOVE_REIMBURSE": 
			return state.updateIn(['userNewsMap','reimbursedArticles'], (reimbursedArticles) => reimbursedArticles.splice(action.payload,1));
		case "ON_LIKE":
			var newState = state;
			newState = newState.updateIn(['userNewsMap', 'likedArticles'], (likedArticles) => likedArticles.push(action.payload));
			return newState;
		case "ON_UNLIKE":
			var newState = state;
			newState = newState.updateIn(['userNewsMap', 'likedArticles'], (likedArticles) => likedArticles.splice(action.payload, 1));
			return newState;
		case "ON_SAVE":
			return state.updateIn(['userNewsMap', 'bookmarkedArticles'], (bookmarkedArticles) => bookmarkedArticles.push(action.payload));
		case "ON_UNSAVE":
			return state.updateIn(['userNewsMap', 'bookmarkedArticles'], (bookmarkedArticles) => bookmarkedArticles.splice(action.payload, 1));		
			case "ON_ADD_REIMBURSE":
			return state.updateIn(['userNewsMap', 'reimbursedArticles'], (reimbursedArticles) => reimbursedArticles.push(action.payload));
		case "ON_REMOVE_READ":
			return state.updateIn(['userNewsMap', 'readArticles'], (readArticles) => readArticles.splice(action.payload, 1));
		case "CATEGORY_FILTER":
			return state.update('categoryFilter', () => Immutable.fromJS(action.payload));
		default:
			return state;
	}
}