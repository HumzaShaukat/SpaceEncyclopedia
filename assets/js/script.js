var imageBox = document.querySelector("#nasaImages");
var searchBtn = document.querySelector("#subBtn");
var searchResults = document.querySelector("#resultsHeader");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var searchQuery = $("#searchBar").val();
    getNasaImages(searchQuery);
})


function getNasaImages(query) {
    var nasa_url = "https://images-api.nasa.gov/search?q=" + query + "&media_type=image"
    fetch(nasa_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
        var example = data.collection.items[0];
      }
    );

} 