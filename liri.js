/*Create functions that are triggered based off the first arguement passed after reference to javascript file.
concert-this function
spotify-this function
movie-this function
do-what-it-says function
each of these trigger functions will have their respective request functions within them.
*/



var searchWord;
require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "checkbox",
        name: "Search",
        message:"select one of the commands.\n\nconcert-this: allows you to search for concerts by your artist/band name.\nspotify-this-song: allows you to search for a song on spotify by entering a song.\nmovie-this: allows you to search for a movie by it's name.\ndo-what-it-says: gets commands from a text file and uses one of the previous commands.",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
    {
        type: "input",
        name: "keyword",
        message:"concert-this... type band or artist name. spotify-this-song... song name. movie-this... type name of movie. do-what-it-says...just press enter."
    }
]).then(function(user){
    searchWord = user.keyword;
    if(user.Search === "concert-this"){
        concertSearch();
    }
    else if(user.Search === "spotify-this-song"){
        spotifySearch();
    }
    else if(user.Search=== "move-this"){
        movieSearch();
    }
    else if(user.Search === "do-what-it-says"){
        txtCommand();
    }
    console.log(searchWord);
});

//Concert search function. trigger = 'concert-this'
function concertSearch(){

}

//search spotify api for song. trigger = 'spotify-this-song'
function spotifySearch(){

}

//movie search function. trigger = 'movie-this'
function movieSearch(){

}

function txtCommand(){

}