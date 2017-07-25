//Code to call all Keys and requires. 
var key = require("./key.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

 
//Code to take in a command from Liri node
if (process.argv[2] === "my-tweets") {
	myTweets();
}
else if(process.argv[2] === "spotify-this-song") {
	spotifyThisSong();
}
else if(process.argv[2] === "movie-this") {
	movieThis();
}
else if(process.argv[2] ==="do-what-it-says") {
	doSomething();
}

//First Twitter function to call 20 Tweets
function myTweets() {
//Twitter start
	var client = new Twitter({
  		consumer_key: key[0].consumer_key,
  		consumer_secret: key[0].consumer_secret,
  		access_token_key: key[0].access_token_key,
  		access_token_secret: key[0].access_token_secret
 	});

	var params = {screen_name: "juliebraun07113", count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (error) {
    		console.log(error);
  		} 
  		else {
  			var outputStr = "===================\n" + "User Tweets:\n" + "===================\n\n";

        for (var i = 0; i < tweets.length; i++) {
            outputStr += "Created on: " + tweets[i].created_at + "\n" + "Tweet content: " + tweets[i].text + "\n" + "================================\n";
            console.log(outputStr);
            }
        }
	});
}
// //Spotify start 

function spotifyThisSong() {
	var song = process.argv[3];

	var client = new Spotify({
  		id: key[1].id,
  		secret: key[1].secret
	});

	
	client.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    		var song = "The Sign"; 
  			}
  		else {
  			console.log(data.tracks.items[0].artists);
  		
  		for(i = 0; i<data.tracks.items.length; i++) {
  			console.log(data.tracks.items[0].album.artists.name);
  			console.log(data.tracks.items[0].name);
  			console.log(data.tracks.items[0].preview_url);
  			console.log(data.tracks.items[0].album.name);
  		}
		}
	});
}

//OMDB function
function movieThis() {
	var movie = process.argv[3];
// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
 		if(process.argv[3] === undefined) {  	 
  			 mrNobody();
		}
 		else if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    		console.log("Movie title: " + JSON.parse(body).Title);
    		console.log("Year relased: " + JSON.parse(body).Year);
    		console.log("IMDB rating: " + JSON.parse(body).imdbRating);
    		console.log("Country produced in: " + JSON.parse(body).Country);
    		console.log("Language produced in: " + JSON.parse(body).Language);
    		console.log("Plot: " + JSON.parse(body).Plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
  		}
	});
}

function mrNobody () {
	request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("Movie title: " + JSON.parse(body).Title);
     		console.log("Year relased: " + JSON.parse(body).Year);
     		console.log("IMDB rating: " + JSON.parse(body).imdbRating);
     		console.log("Country produced in: " + JSON.parse(body).Country);
     		console.log("Language produced in: " + JSON.parse(body).Language);
     		console.log("Plot: " + JSON.parse(body).Plot);
     		console.log("Actors: " + JSON.parse(body).Actors);
 		}
	});
}
function doSomething() {
fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  // console.log(data);
  var dataArr = data.split(",");
  // We will then re-display the content as an array for later use.
  console.log(dataArr);
  dataArr[0] = process.argv[2];
  dataArr[1] = process.argv[3];
  spotifyThisSong(dataArr);
});
}