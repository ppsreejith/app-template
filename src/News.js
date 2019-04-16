var config = require('./config');

export async function getNews(token) {
  await fetch(config.server_url + "api/news" , {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(news => {
    return news.json();
  })
  .then(news => {
    result =  news.data;
    for(article in result)
    {
      article.liked = false;
    }
  });
  return result;
}

export async function getNewsForID(token, userID) {
    await fetch(config.server_url + "api/viewBookmarks/" + userID , {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(news => {
      return news.json();
    })
    .then(news => {
      result = news.data;
    });
  return result;
}