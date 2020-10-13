"use strict";
window.onload = init;
const prefix = "yik4325-"; 
const breedKey = prefix + "breed"
const favKey = prefix + "fav"

const storedBreed = localStorage.getItem(breedKey);
const favBreed = localStorage.getItem(favKey);

makeList();

checkFavBreed();



function init(){
    document.querySelector("#search").onclick = getData;
    document.querySelector("#randomBtn").onclick = surprise;
    document.querySelector("#favBtn").onclick = storeFav;

}

function storeFav(){
    let term = document.querySelector("#breeds").value;
    let fav = fixBreed(term);
    localStorage.setItem(favKey,capitalize(fav));

    document.querySelector("#fav").innerHTML = `Your favoourite breed: ${capitalize(fav)}`;

}

function makeList(){
    const SERVICE_URL = "https://dog.ceo/api/breeds/list/all";
    let url = SERVICE_URL;
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoadedList;
    xhr.onerror = dataError;
    xhr.open("GET",url);
    xhr.send();
}

function dataLoadedList(e){
    let xhr = e.target;

    // 2 - xhr.responseText is the JSON file we just downloaded
    console.log(xhr.responseText);

    // 3 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);
    console.log(obj.message);
    
    // 4 - if there are no results, print a message and return
    // Here, we don't get an array back, but instead a single object literal with 2 properties
    if(!obj.message|| obj.message.length == 0){
    document.querySelector("#content").innerHTML = "<p><i>There was a problem!</i></p>";
    return; // Bail out
    }

    createListItems(obj.message);
}

//populate breeds list
function createListItems(data){
      let output = '';
      Object.keys(data).forEach(key => output+=`<option value="${key}">${fixBreed(key)}</option>`);
      document.getElementById('breeds').innerHTML = output;

      if (storedBreed){//change selected option if a previousley stored one is found
        const breedSelect = document.querySelector("#breeds");
        breedSelect.querySelector(`option[value='${storedBreed}']`).selected = true;
    }
    
}





//fix the name for some breeds
function fixBreed(breedName){
      if(breedName === 'germanshepherd'){
        return 'German Shepherd';
      }else if(breedName === 'mexicanhairless'){
        return 'Mexican Hairless';
      }else if(breedName === 'stbernard'){
        return 'St. Bernard';
      }else if(breedName === "african"){
        return 'African Wild Dog';
      }else if(breedName === 'bullterrier'){
            return 'Bull Terier';
      }
      return capitalize(breedName);
}

//capitalize first letter
function capitalize(breedName){
      return breedName.replace(/\-/g,' ')
    .split(" ")
    .map(word => word.charAt(0).toUpperCase()+word.slice(1))
    .join(" ");
}


function getData(){
    // 1 - main entry point to web service
    const SERVICE_URL = "https://dog.ceo/api/breed/";
    
    // No API Key required!
    let url = SERVICE_URL;
    // 2 - build up our URL string
    let term = document.querySelector("#breeds").value;

    // not necessary for this service endpoint
    localStorage.setItem(breedKey, term);

    term = term.trim();
    term = encodeURIComponent(term);

    let numResults = document.querySelector("#limit").value;
    // 3 - parse the user entered breed we wish to search
    url +=  term + '/images/random/'+ numResults;

    console.log(url);
    // 4 - update the UI
    document.querySelector("#debug").innerHTML = `<b>Querying web service with:</b> <a href="${url}" target="_blank">${url}</a>`;
    
    // 5 - create a new XHR object
    let xhr = new XMLHttpRequest();

    // 6 - set the onload handler
    xhr.onload = dataLoaded;

    // 7 - set the onerror handler
    xhr.onerror = dataError;

    // 8 - open connection and send the request
    xhr.open("GET",url);
    xhr.send();
}

function dataError(e){
    console.log("An error occurred");
}

function dataLoaded(e){
    // 1 - e.target is the xhr object
    let xhr = e.target;

    // 2 - xhr.responseText is the JSON file we just downloaded
    console.log(xhr.responseText);

    // 3 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);
   // console.log(obj);
   // console.log(obj.message);
   
    console.log(obj.message.length);
    // 4 - if there are no results, print a message and return
    // Here, we don't get an array back, but instead a single object literal with 2 properties
    if(!obj.message|| obj.message.length == 0){
        document.querySelector("#content").innerHTML = "<p><i>There was a problem!</i></p>";
        return; // Bail out
    }
    
    // 5 - if there is an array of results, loop through them
    let results = obj.message;
    console.log("results.length = "+results.length);

    let breedName = document.querySelector("#breeds").value;

    breedName = fixBreed(breedName);
    breedName = capitalize(breedName);
      let bigString = "<p><i> Here are "+ results.length + " results for</i></p>"+ breedName;

    for(let i=0;i < results.length; i++){
      let url = results[i];
      let line = `<div class='result'><img src = '${url}'/>`;
      bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;
    document.querySelector('#debug').innerHTML = "<b>Success!</b>";
}

function surprise(){
      // 1 - main entry point to web service
      const SERVICE_URL = "https://dog.ceo/api/breeds/image/random";
    
      // No API Key required!
      let url = SERVICE_URL;
  
      console.log(url);
      // 4 - update the UI
      document.querySelector("#debug").innerHTML = `<b>Querying web service with:</b> <a href="${url}" target="_blank">${url}</a>`;
      
      // 5 - create a new XHR object
      let xhr = new XMLHttpRequest();
  
      // 6 - set the onload handler
      xhr.onload = surpriseLoaded;
  
      // 7 - set the onerror handler
      xhr.onerror = dataError;
  
      // 8 - open connection and send the request
      xhr.open("GET",url);
      xhr.send();
}

function surpriseLoaded(e){
    // 1 - e.target is the xhr object
    let xhr = e.target;

    // 2 - xhr.responseText is the JSON file we just downloaded
    console.log(xhr.responseText);

    // 3 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);
   // console.log(obj);
   // console.log(obj.message);
    // 4 - if there are no results, print a message and return
    // Here, we don't get an array back, but instead a single object literal with 2 properties
   
    
    // 5 - if there is an array of results, loop through them
    let result = obj.message;
  
    let url = result;
    let line = `<p><i>Here's your surprise</i></p><div class='result' id='random' ><img src = '${url}'  alt='Random Dog Image'/></div>`;
   
    

    document.querySelector("#content").innerHTML = line;
    document.querySelector('#debug').innerHTML = "<b>Success!</b>";
}

function checkFavBreed(){
   
    if (favBreed){//change selected option if a previousley stored one is found
      
      
        document.querySelector("#fav").innerHTML = `Your favourite breed: ${favBreed}`;
    }

}

