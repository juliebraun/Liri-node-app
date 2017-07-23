//Code to call all Keys and requires. 
var key = require("./key.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
 
//Code to take in a command from Liri node
if (process.argv[2] === "my-tweets") {
	myTweets();
}
else if(process.argv[2] === "spotify-this-song") {
	spotifyThisSong();
}
else if(process.argv[2] === "movie-this") {
	console.log("run movie function");
}
else if(process.argv[2] ==="do-what-it-says") {
	console.log("run command function");
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
// var request = require('request');
// request('http://www.omdbapi.com/?', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });

