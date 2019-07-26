require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require('moment');
var axios = require('axios')
var spotify = new Spotify(keys.spotify);

var command = process.argv[2]; 
var value = process.argv[3]; 



var concertThis = function (artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            if (response.data[0]) {
                console.log("Venue of the name: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.area);
                console.log("Date of event (MM/DD/YYYY): " + moment(response.data[0].datetime).format('MM DD YYYY'));
            }
        });
}
var spotifyThisSong = function (song) {
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log("Song name: " + response.tracks.items[i].name);
                console.log("Artists: " + response.tracks.items[i].artists[0].name);
                console.log("Album name: " + response.tracks.items[i].album.name);
                console.log("Preview URL: " + response.tracks.items[i].preview_url);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

var movieThis = function (movieName) {
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
var doWhatItSay = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("data: " + data);
            var command = data.split(",");
            //var random = Math.floor(Math.random(command, value));
            //random();
        }
    })
}


switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifyThisSong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doWhatItSay(value);
        break;
};




