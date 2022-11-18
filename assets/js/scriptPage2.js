

document.onload = getNasaImages(JSON.parse(localStorage.getItem('query')));



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