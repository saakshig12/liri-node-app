require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require('moment');
var axios = require('axios')
var spotify = new Spotify(keys.spotify);

var command1 = process.argv[2]
var command2 = process.argv.slice(3).join(' ')

var movies = function (movieName) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response);
            if (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        });
}

