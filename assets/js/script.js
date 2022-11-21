var imageBox = document.querySelector("#nasaImages");
var searchBtn = document.querySelector("#subBtn");
var searchResults = document.querySelector("#resultsHeader");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var searchQuery = $("#searchBar").val();
    localStorage.setItem("query",JSON.stringify(searchQuery));
    location.href = "./results.html";
})


