modalBtn = document.querySelector("#modalBtn");
document.onload = getNasaImages(JSON.parse(localStorage.getItem('query')));
document.onload = getWikiSearch(JSON.parse(localStorage.getItem('query')));
var searchHistory = [];

function getNasaImages(query) {
    var nasa_url = "https://images-api.nasa.gov/search?q=" + query + "&media_type=image"
    fetch(nasa_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#nasaImages").html("");
      for (var i = 0; i < data.collection.items.length; i++){
        var image = $("<img src = '"+data.collection.items[i].links[0].href + "'>")
        $("#nasaImages").append(image);
      }
    });

} 

function getWikiSearch(query) { //queries metawiki api to return portion of wikipedia article
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=" + query + "&formatversion=2&explaintext=1&exsectionformat=plain&exintro";
  fetch(wikiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#wikiSearch").html("");
    var wikiText = data.query.pages[0].extract;
    var wikiEx = $("<p>").text(wikiText);
    $("#wikiSearch").append(wikiEx);
  });

  $("#searchResults").text("Search Results for " + query)

}

function saveSearchHistory(search) { //queries NASA images for related images to query
  if (searchHistory.length < 5) {
    searchHistory.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    printSearchHistory(searchHistory);
  } else { //if the search history array is filled, the first element is shifted and new search is pushed
    searchHistory.shift();
    searchHistory.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    printSearchHistory(searchHistory);
  }
}

function printSearchHistory(history) { //prints out 5 recent searches and appends them as buttons
  $("#searchHistory").html("");
  for (var i = 0; i < history.length; i++) {
    var searchBtn = $("<button class = 'historyBtn'>")
    searchBtn.text(history[i]);
    $("#searchHistory").append(searchBtn);
  }
}

function init_SearchHistory() { //when the modal is opened, it will print the search history if there is saved searches
  if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
  }
  printSearchHistory(searchHistory);
}

$("#searchBtn").click(function(event){ //when the search button is click in the modal, a new query is passed through the apis
  event.preventDefault();
  if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
  }
  var search = $("#searchInput").val().trim();
  if (search == "") {
    return;
  }
  localStorage.setItem("query",JSON.stringify(search));
  saveSearchHistory(search);
  getWikiSearch(search);
  getNasaImages(search);
})

$("#searchHistory").click(function(event) { //if search history button is clicked, will redirect you to target search
  var historyEntry = event.target;
  if (historyEntry.matches("button") == true) {
    var recentSearch = historyEntry.textContent;
    getNasaImages(recentSearch);
    getWikiSearch(recentSearch);
  }
})

$("#homeBtn").click(function() {
  location.href = "./index.html";
})