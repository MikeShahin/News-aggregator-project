//Global variable declarations
const articles = document.querySelectorAll('.article h3');
const images = document.querySelectorAll('.featuredImage img');
const link = document.querySelectorAll('.articleContent a');
const type = document.querySelectorAll('.article h6');
const sourceSelect1 = document.querySelector('#one');
const sourceSelect2 = document.querySelector('#two');
const sourceSelect3 = document.querySelector('#three');
const currentSource = document.querySelector('#currentSource');

const guardianKey = key1;
const newsApiOrgKey = key2;
const eRKey = key3;

const searchIcon = document.querySelector('#search a');
const searchBox = document.querySelector('#search input');
let search; 

let gPage = 1;
let nPage = 1;
let nUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${newsApiOrgKey}`;
let gUrl = `https://content.guardianapis.com/search?show-fields=trailText%2Cthumbnail&page-size=50&api-key=${guardianKey}`;
let eRUrl = `http://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22lang%22%3A%22eng%22%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${eRKey}`

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
            const url = article.url//"#";
            const title = article.title;
            const categ = article.source.name;
            let id = [i];
        
            articleTemp(id, image, url, title, categ);
            
        }
    nPopUp(data);
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
            const image = article.fields.thumbnail;
            const url = article.webUrl;
            const title = article.webTitle;
            const categ = article.sectionName;
            let id = [i];
        
        articleTemp(id, image, url, title, categ);
        }
    gPopUp(data);
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
            if (article.image === null) {
                image = "images/article_placeholder_1.jpg"
            } else {
                image = article.image;
            };
            const url = article.url;
            const title = article.title;
            const categ = article.source.title;
            let id = [i];
        
        articleTemp(id, image, url, title, categ);
        }
    eRPopUp(data);
    })
}
//Article Template:
let articleTemp = function(id, imgSource, artURL, artName, artCategory) {
    let $container = $('#main');
    let $articleMain = $('<article></article>').addClass('article').attr("id", id);
    let $featImg = $("<section></section>").addClass('featuredImage');
    let $img = $('<img></img>').attr('src', imgSource );
    let $artCont = $("<section></section>").addClass('articleContent');
    let $artLink = $("<a></a>").attr("href", "#")
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
    return $artCont;
};
//popup
const nPopUp = function(data)  {
    $('.articleContent').click((e) => {
        const i = e.currentTarget.parentNode.attributes.id.value;
        console.log(i);
        const title = data.articles[i].title;
        const content = data.articles[i].content
        const url = data.articles[i].url;
        $('#popUp .container h1').text(title);
        $('#popUp .container p').text(content);
        $('#popUp .container a').attr("href", url);
        $('#popUp').removeClass('loader hidden');
        e.preventDefault();
    });
    $('.closePopUp').click((e) => {
      $('#popUp').addClass('loader hidden');
      e.preventDefault();
    });
  };

  const gPopUp = function(data)  {
    $('.articleContent').click((e) => {
        const i = e.currentTarget.parentNode.attributes.id.value;
        const gTitle = data.response.results[i].webTitle;
        const gContent = data.response.results[i].fields.trailText;
        const gUrl = data.response.results[i].webUrl;
        $('#popUp .container h1').text(gTitle);
        $('#popUp .container p').text(gContent);
        $('#popUp .container a').attr("href", gUrl);
        $('#popUp').removeClass('loader hidden');
        e.preventDefault();
    });
    $('.closePopUp').click((e) => {
      $('#popUp').addClass('loader hidden');
      e.preventDefault();
    });
  };
  const eRPopUp = function(data)  {
    $('.articleContent').click((e) => {
        const i = e.currentTarget.parentNode.attributes.id.value;
        const title = data.articles.results[i].title;
        const content = data.articles.results[i].body
        const url = data.articles.results[i].url;
        $('#popUp .container h1').text(title);
        $('#popUp .container p').text(content);
        $('#popUp .container a').attr("href", url);
        $('#popUp').removeClass('loader hidden');
        e.preventDefault();
    });
    $('.closePopUp').click((e) => {
      $('#popUp').addClass('loader hidden');
      e.preventDefault();
    });
  }; 
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
$('#search a').click((event) => {
    $('#search').toggleClass("active");
    event.preventDefault();
    
    document.addEventListener('keypress', (e) => {
        search = searchBox.value;
        if (e.key === 'Enter') {
            switch(currentSource.textContent) {
                case "News Api.org":
                    nUrl = `https://newsapi.org/v2/everything?q=${search}&pageSize=50&apiKey=${newsApiOrgKey}`;
                    $('.article').remove();
                    $('#search').removeClass("active");
                    newsAPI();
                    search = null;
                    //document.forms[search].reset()
                    nUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${newsApiOrgKey}`;

                case "The Guardian":
                    gUrl = `https://content.guardianapis.com/search?show-fields=standfirst%2Cmain%2Cthumbnail&page-size=50&q=${search}&api-key=${guardianKey}`;
                    $('.article').remove();
                    $('#search').removeClass("active");
                    guardian();
                    search = '';
                    gUrl = `https://content.guardianapis.com/search?show-fields=standfirst%2Cmain%2Cthumbnail&page-size=50&api-key=${guardianKey}`;
                
                case "Event Registry":
                    eRUrl = `https://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22keyword%22%3A%22${search}%22%2C%22keywordLoc%22%3A%22body%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${eRKey}`;
                    $('.article').remove();
                    $('#search').removeClass("active");
                    eventRegistery();
                    search = '';
                    eRUrl = `http://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22lang%22%3A%22eng%22%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${eRKey}`;
                }
            }
        })
    });             
    //scroll
    // window.onscroll = function () {
    //     if (window.scrollY > (document.body.offsetHeight - window.outerHeight)) {
    //         switch(currentSource.textContent) {
    //             case "News Api.org":
    //                 nPage++
    //                 nUrl = `https://newsapi.org/v2/top-headlines?country=us&page=${nPage}&pageSize=50&apiKey=${newsApiOrgKey}`;
    //                 eventRegistery();

    //             case "The Guardian":
    //                 gPage++;
    //                 gUrl = `https://content.guardianapis.com/search?show-fields=standfirst%2Cmain%2Cthumbnail&page=${gPage}&page-size=50&api-key=${guardianKey}`;
    //                 guardian();
                
    //             case "Event Registry":
    //                 // eRPage++
    //                 // eRUrl = ;
    //                 // eventRegistery();
    //             }                       
    //     }
    // }