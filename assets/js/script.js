var searchBtn = document.querySelector("#subBtn");
var searchHistory = [];
document.onload = init_SearchHistory();

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var searchQuery = $("#searchBar").val();
    createSearch(searchQuery);
})

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
    $("#previousSearch").html("");
    for (var i = 0; i < history.length; i++) {
      var searchBtn = $("<button class = 'button is-link searchHistoryBtn'>")
      searchBtn.text(history[i]);
      $("#previousSearch").append(searchBtn);
    }
  }
  
  function init_SearchHistory() { //when the modal is opened, it will print the search history if there is saved searches
    if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
      searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
    }
    printSearchHistory(searchHistory);
  }

  function createSearch(searchQuery) { //initializes first search
    saveSearchHistory(searchQuery);
    localStorage.setItem("query",JSON.stringify(searchQuery));
    location.href = "./results.html";
  }
  
  $("#previousSearch").click(function(event) { //if search history button is clicked, will redirect you to target search
    var historyEntry = event.target;
    if (historyEntry.matches("button") == true) {
      var recentSearch = historyEntry.textContent;
    }
    createSearch(recentSearch);
  })

