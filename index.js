
const API_KEY = "bfb2dc3c8e5543aea801eb67a6d4f4b6";
const search_url = "https://newsapi.org/V2/everything?q=";
const url = "https://newsapi.org/V2/top-headlines?country=in&category=";

window.addEventListener('load',()=> fetchNews(""));

async function fetchNews(query)
{
    const searchBar = document.querySelector('#search-bar');
    searchBar.value = '';
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles)
{
    
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    if(articles.length == 0)
    {
        cardContainer.innerHTML = '<h1>No results</h1>';
        return;
    }

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}


function fillData(cardClone, article)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    // const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    // newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US");

    newsSource.innerHTML = `Source : ${article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => 
    {
        window.open(article.url, "_blank");
    });
}


let selectedNav = null;
function onNavClick(q,id)
{
    fetchNews(q);
    const navItem = document.getElementById(id);
    selectedNav?.classList.remove('active');
    document.getElementById('trending')?.classList.remove('active');
    selectedNav = navItem;
    selectedNav.classList.add('active');

}

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#search-bar');

async function searchNews(query)
{
    const res = await fetch(`${search_url}${query}&sortBy=time&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

searchBtn.addEventListener('click', () => {
    const query = searchBar.value;
    if(value ='')
    return;
    searchNews(query);
    selectedNav?.classList.remove('active');
    selectedNav = null;
})
