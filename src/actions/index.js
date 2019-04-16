export function storeSessionToken( token )
{
    return{
        type: 'SAVE_TOKEN',
        payload: token
    }
}

export function storeUserLogin( userData )
{
    return{
      type: 'USER_LOGIN',
      payload: userData
    };
}

export function storeUserNewsMap( mapInfo ){
    return{
        type: 'USER_NEWS_MAP',
        payload: mapInfo
    };
}

export function updateCoins( amount ){
    return{
        type: 'UPDATE_COINS',
        payload: amount
    };
}

export function addInRead( newsID ){
    return{
        type: 'ON_ADD_READ',
        payload: newsID
    };
}

export function removeFromReimburse( newsID ){
    return{
        type: 'ON_REMOVE_REIMBURSE',
        payload: newsID
    }
}

export function addToLike( newsID){
    return{
        type: 'ON_LIKE',
        payload: newsID
    }
}

export function removeFromLike( newsID){
    return{
        type: 'ON_UNLIKE',
        payload: newsID
    }
}

export function addToBookmark( newsID){
    return{
        type: 'ON_SAVE',
        payload: newsID
    }
}

export function removeFromBookmark( newsID){
    return{
        type: 'ON_UNSAVE',
        payload: newsID
    }
}

export function removeFromRead(newsID) {
    return{
        type: 'ON_REMOVE_READ',
        payload: newsID
    }
}

export function addToReimburse(newsID){
    return{
        type: 'ON_ADD_REIMBURSE',
        payload: newsID
    };
}

export function setCategoryFilter(topic){
    return{
        type: 'CATEGORY_FILTER',
        payload: topic
    };
}