//////////////////////////////////////////
// Add all Javascript code to this file.    
/////////////////////////////////////////

const headers = document.querySelectorAll('h3');
const guardianKey = key
fetch(`https://content.guardianapis.com/search?q=debates&api-key=${guardianKey}`) 
.then(response => {
    console.log(response);
    return response.json();
})
.then(data => {
    console.log(data)
    console.log(data.response.results[2].webTitle);
    const newsResult = data.response.results;
    for(let i = 0; i < headers.length; i++) {
        let header = headers[i];
        let article = newsResult[i];
        let title = article.webTitle;
        header.textContent = title; 
    }
  })
