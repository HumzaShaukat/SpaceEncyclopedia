

document.onload = getNasaImages(JSON.parse(localStorage.getItem('query')));
document.onload = getWikiSearch(JSON.parse(localStorage.getItem('query')));


function getNasaImages(query) {
    var nasa_url = "https://images-api.nasa.gov/search?q=" + query + "&media_type=image"
    fetch(nasa_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
        for (var i = 0; i < data.collection.items.length; i++){
            var image = $("<img src = '"+data.collection.items[i].links[0].href + "'>")
            $("#nasaImages").append(image);
        }
      }
    );

} 

function getWikiSearch(query) {
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=" + query + "&formatversion=2&explaintext=1&exsectionformat=plain&exintro";
  fetch(wikiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var wikiText = data.query.pages[0].extract;
    var wikiEx = $("<p>").text(wikiText);
    $("#wikiSearch").append(wikiEx);
  })

  $("#searchResults").text("Search Results for " + query)

}
