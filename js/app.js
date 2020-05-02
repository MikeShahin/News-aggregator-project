//Global variable declarations
const articles = document.querySelectorAll('.article h3');
const images = document.querySelectorAll('.featuredImage img');
const link = document.querySelectorAll('.articleContent a');
const type = document.querySelectorAll('.article h6');

const guardianKey = key1;
const newsApiOrgKey = key2;
const eRKey = key3;

const searchIcon = document.querySelector('#search a');
const searchBox = document.querySelector('#search input');
let search; 

let sourceSelect1 = document.querySelector('#one');
let sourceSelect2 = document.querySelector('#two');
let sourceSelect3 = document.querySelector('#three');

let currentSource = document.querySelector('#currentSource');

let nUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiOrgKey}`;
let gUrl = `https://content.guardianapis.com/search?page-size=50&api-key=${guardianKey}`;
let eRUrl = `http://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22lang%22%3A%22eng%22%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=100&articleBodyLen=-1&apiKey=${eRKey}`
let imageArray = ['images/article_placeholder_1.jpg', 'images/article_placeholder_2.jpg']; 

//Function for article template:
let articleTemp = function(imgSource, artURL, artName, artCategory) {
    let $container = $('#main');
    let $articleMain = $('<article></article>').addClass('article');
    let $featImg = $("<section></section>").addClass('featuredImage');
    let $img = $('<img></img>').attr('src', imgSource );
    let $artCont = $("<section></section>").addClass('articleContent');
    let $artLink = $("<a></a>").attr("href", artURL)
    let $artHeadline = $('<h3></h3>').text(artName);
    let $artCat = $('<h6></h6>').text(artCategory);
    let $impressions = $('<section></section>').addClass('impressions');
    let $clearfix = $('<div></div>').addClass('clearfix');
    $($featImg).append($img);
    $($articleMain).append($featImg);
    $($artLink).append($artHeadline);
    $($artCont).append($artLink);
    $($artCont).append($artCat);
    $($articleMain).append($artCont);
    $($articleMain).append($impressions);
    $($articleMain).append($clearfix);
    $($container).append($articleMain);
}

//Fetch functions:
//newsApi
let newsAPI = function() {
    fetch(nUrl) 
    .then(response => {
        //console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log(data)
        const newsResult = data.articles;
        // console.log(newsResult);
        for(let i = 0; i < newsResult.length; i++) {
            let article = newsResult[i];
            
            // const image = imageArray.random;
            const image = article.urlToImage;
            const articleLink = article.url//"#";
            const title = article.title;
            const categ = article.source.name;
        
        articleTemp(image, articleLink, title, categ);
        }
    });
}
newsAPI();
//Guardian
let guardian = function() {
    fetch(gUrl) 
    .then(response => {
        return response.json();
    })
    .then(data => {
        const newsResult = data.response.results;
        for(let i = 0; i < newsResult.length; i++) {
            let article = newsResult[i];
            // const image = imageArray.random;
            const image = "images/article_placeholder_1.jpg";
            const articleLink = article.webUrl;
            const title = article.webTitle;
            const categ = article.sectionName;
        
        articleTemp(image, articleLink, title, categ);
        }
    })
}
//Event Registry
let eventRegistery = function() {
    fetch(eRUrl) 
    .then(response => {
        return response.json();
    })
    .then(data => {
        const newsResult = data.articles.results;
        for(let i = 0; i < newsResult.length; i++) {
            let article = newsResult[i];
            let image;
            if (article.image === "null") {
                image = "images/article_placeholder_2.jpg";
            } else {
                image = article.image;
            };
            const articleLink = article.url;
            const title = article.title;
            const categ = article.source.title;
        
        articleTemp(image, articleLink, title, categ);
        }
    })
}

//sources tab:
sourceSelect1.addEventListener('click', (e) => {
    $('.article').remove();
    currentSource.textContent = "News Api.org";
    newsAPI();
});
sourceSelect2.addEventListener('click', (e) => {
    $('.article').remove();
    currentSource.textContent = "The Guardian";
    guardian();
});
sourceSelect3.addEventListener('click', (e) => {
    $('.article').remove();
    currentSource.textContent = "Event Registry";
    eventRegistery();   
});

//Search:
    searchIcon.addEventListener('click', (event) => {
        $('#search').toggleClass("active");
        event.preventDefault();
        
        document.addEventListener('keypress', (e) => {
            search = searchBox.value;
            if (e.key === 'Enter') {
                if (currentSource.textContent == "News Api.org") {
                    nUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${newsApiOrgKey}`
                $('.article').remove();
                $('#search').removeClass("active");
                newsAPI();
                search = ""
                nUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiOrgKey}`;
                } else if (currentSource.textContent == "The Guardian") {
                    gUrl = `https://content.guardianapis.com/search?page-size=25&q=${search}&api-key=${guardianKey}`
                $('.article').remove();
                $('#search').removeClass("active");
                guardian();
                search = ""
                gUrl = `https://content.guardianapis.com/search?page-size=50&api-key=${guardianKey}`;
                } else if (currentSource.textContent == "Event Registry") {
                    eRUrl = `https://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22keyword%22%3A%22${search}%22%2C%22keywordLoc%22%3A%22body%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${eRKey}`
                $('.article').remove();
                $('#search').removeClass("active");
                eventRegistery();
                search = ""
                eRUrl = `http://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22lang%22%3A%22eng%22%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${eRKey}`

                }
            }
            });             
    });

//Get Popup working:
const articleBox = document.querySelector(".articleContent");
//   console.log(articleBox);
  //check if articleContent class is on page
// if (articleBox !== null) {
//     console.log(articleBox);
//     console.log('ok');
//     articleBox.addEventListener('click', (e) => {
//     console.log("working")
//     e.preventDefault();
//     });
// }
// let popUp = function() {
    // setTimeout(articleBox.addEventListener('click', (event) => {
    //     //   $('#popup').toggleClass("loader hidden");
    //       console.log("hello")
    //       event.preventDefault();
    // }), 1000);
// }
// if (document.querySelector(".artcleContent") !== null) {
//     const articleBox = document.querySelector(".articleContent");
//     console.log("derp");
// }
// popUp();

  //If its on page, grab articleContent by query selector

  //then do logic
//   articleBox.addEventListener('click', (event) => {
//     //   $('#popup').toggleClass("loader hidden");
//       console.log("hello")
//       event.preventDefault();
//   });  