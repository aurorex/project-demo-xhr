const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');

let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  // configuamos la petición colocando el http y la ruta del recurso
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e8aa2d61cef143c8a551e9a6075d9b18`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
// fución que nos avisa de un error 
function handleError() {
  console.log('se ha presentado un error');
}

function addNews() {
  // parseamos el JSON
  const data = JSON.parse(this.responseText);
  // const response = data.response;
  console.log(data);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;
  // console.log(response);
  let li = document.createElement('li');
  $(li).css({'border':'1px solid skyblue'})
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}


