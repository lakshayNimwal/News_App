// const api_key = "pub_2824953393b00960db1b599d4ec155ae93884";
// const url = "https://newsdata.io/api/1/"
// "https://newsapi.org/v2/everything?q=india&apiKey=4d7bf88ef61b4b48b6ed663a82fbbc74"

const api_key = "4d7bf88ef61b4b48b6ed663a82fbbc74";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("india"));

const reload = ()=>{
      window.location.reload()
}


async function fetchNews(query){
     const res = await fetch(`${url}${query}&apiKey=${api_key}`);
     const data = await res.json();
     bindData(data.articles);
}

function bindData(articles){
      const cardsContainer = document.getElementById("cards-container");
      const newCardTemplate = document.getElementById("template-news-card")

      cardsContainer.innerHTML = '';

      articles.forEach((article) => {
            if(article.urlToImage == null) return;
            const cardClone = newCardTemplate.content.cloneNode(true)
           fillData(cardClone, article);
            cardsContainer.appendChild(cardClone)
      });
}

function fillData(cardClone, article){
      const newsImg = cardClone.querySelector("#news-img")
      const newsTitle = cardClone.querySelector("#news-title")
      const newsSource = cardClone.querySelector("#news-source")
      const newsDesc = cardClone.querySelector("#news-desc")

      newsImg.src = article.urlToImage;
      newsTitle.innerHTML = article.title;
      newsDesc.innerHTML = article.description;

     const date  = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/Jakarta"
      });

      newsSource.innerHTML = `${article.source.name} : ${date}`;
      console.log(cardClone);

      cardClone.firstElementChild.addEventListener('click', ()=>{
            window.open(article.url, "_blank")
      }
      )
}

let curSelectedNav = null;

function onNavItemClick(query){
      fetchNews(query);
      const navItem = document.getElementById(query);
      curSelectedNav?.classList.remove('active');
      curSelectedNav = navItem;
      curSelectedNav.classList.add('active');
}

const seachButton = document.getElementById("search-btn")
const searchText = document.getElementById("search-text")

seachButton.addEventListener('click', ()=>{
      const query = searchText.value;
      if(!query) return;
        curSelectedNav.classList.remove('active')
      fetchNews(query)
})
