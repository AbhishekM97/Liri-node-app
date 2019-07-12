/*Create functions that are triggered based off the first arguement passed after reference to javascript file.
concert-this function
spotify-this function
movie-this function
do-what-it-says function
each of these trigger functions will have their respective request functions within them.
*/




require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var searchWord;
inquirer.prompt([
    {
        type: "list",
        name: "Search",
        message:"select one of the commands.\n\nconcert-this: allows you to search for concerts by your artist/band name.\nspotify-this-song: allows you to search for a song on spotify by entering a song.\nmovie-this: allows you to search for a movie by it's name.\ndo-what-it-says: gets commands from a text file and uses one of the previous commands.",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
    {
        type: "input",
        name: "keyword",
        message:"\n\nconcert-this... type band or artist name.\nspotify-this-song... type song name.\nmovie-this... type name of movie.\ndo-what-it-says...just press enter."
    }
]).then(function(user){
    //console.log(user.Search);   
    searchWord = user.keyword;
    if(user.keyword === ""){
     searchWord = "The Sign"   
    }
    if(user.Search === "concert-this"){
        concertSearch();
    }
    else if(user.Search === "spotify-this-song"){
        spotifySearch();
    }
    else if(user.Search === "movie-this"){
        movieSearch();
    }
    else if(user.Search === "do-what-it-says"){
        txtCommand();
    }
    //console.log(searchWord);
});

//Concert search function. trigger = 'concert-this'
function concertSearch(){
    axios
    .get("https://rest.bandsintown.com/artists/" + searchWord + "/events?app_id=codingbootcamp")
    .then(function(response){
        var location;
    for(i=0; i<response.data.length;i++){
        console.log("\n\n"+response.data[i].venue.name);
        location = response.data[i].venue.country +", "+response.data[i].venue.region +", "+response.data[i].venue.city;
        console.log(location);
        var time = response.data[i].datetime;
        console.log(moment(time).format("MM/DD/YYYY"));

    }
    })
    .catch(function(error){
        if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request){
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

//search spotify api for song. trigger = 'spotify-this-song'
function spotifySearch(){
    spotify
    .search({type: "track", query: searchWord, limit: 1})
    .then(function(response){
        console.log("\n");
        for(i=0;i<response.tracks.items[0].artists.length;i++){
            console.log("Artist: "+response.tracks.items[0].artists[i].name);
        }
        console.log("Song Name: "+response.tracks.items[0].name);
        console.log("Spotify Link: "+response.tracks.items[0].external_urls.spotify);
        console.log("Album Name: "+response.tracks.items[0].album.name);
    })
    .catch(function(err){
        console.log(err);
    });
}

//movie search function. trigger = 'movie-this'
function movieSearch(){
    axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t="+searchWord)
    .then(function(response){
        console.log("\nTitle: " + response.data.Title);
        console.log("Release Date: "+response.data.Released);
        console.log("IMDB Rating: "+response.data.Ratings[0].Value);
        console.log("Rotten Tomato Rating: "+response.data.Ratings[1].Value);
        console.log("Production Country: "+response.data.Country);
        console.log("Plot: "+response.data.Plot);
        console.log("Cast: "+response.data.Actors);
        //console.log(response.data);
    })
    .catch(function(error){
        if(error.response){
            console.log(error.response.data);
            console.log(error.resposne.status);
            console.log(error.response.headers);
        } else if (error.request){
            console.log(error.request);
        } else{
            console.log("Error", error.message);
        }
    });
}

function txtCommand(){
fs.readFile("random.txt","utf8",function(error,data){
    if (error){
        return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    searchWord = dataArr[1];
    if(dataArr[0]==="concert-this"){
        concertSearch();
    }
    else if(dataArr[0]==="spotify-this-song"){
        spotifySearch();
    }
    else if(dataArr[0]==="movie-this"){
        movieSearch();
    }
})
}