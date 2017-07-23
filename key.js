//per insructions, what my js file will look like
console.log('this is loaded');

var twitterKeys = {
  consumer_key: 'PYiq9r7G57smirXm5xAVk7PI8',
  consumer_secret: 'l6JoRjzdNFzO0WrMKuqeDzHfi4U5ZxITTObgZUwOsd1oTAZZpN',
  access_token_key: '886364121654079488-4PpqoCWOKlO38mhCJX3GTgjndbthlUG',
  access_token_secret: 'agTnyrvdXXVitKsVSJ5Xv3v2hig6HszpgK5dCyj5leqk3'
}
 
var spotify = {
  id: "033be5195af24ce0870698c5173241e6",
  secret: "d94213b8b8474da08bffa34a4ac9f32e"
}

var keyArray = [twitterKeys, spotify];
module.exports = keyArray; 

// var request = require('request');
// request('http://www.omdbapi.com/?', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });