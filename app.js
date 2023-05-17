// Newsletter sign up with mailchimp API

//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const https = require("node:https");
const port = 3000;
const app = express();

//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || port, function(req, res){
  console.log('Server is connected to port ' + port + ' ...');
});

//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html" );
});

//Using bod-parser
app.use(bodyParser.urlencoded({extended: true}));

//The public folder which holds the CSS and external files
app.use(express.static('public'));

//Uploading the data to the server
app.post('/', function(req, res){
  var firstname = req.body.firstName;
  const firstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);
  var lastname = req.body.lastName;
  const lastName = lastname.charAt(0).toUpperCase() + lastname.slice(1);
  const email = req.body.email;
  subscribed = "subscribed";
    var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  //Setting up MailChimp
  const urlLink = "https://us8.api.mailchimp.com/3.0/lists/c837660108"
  const options = {
    method: "POST",
    auth: "Duela:3df5b20a3f26a5073412fb05bbf48de7-us8"
  }
  //Uploading the data to the server
  const request = https.request(urlLink, options, function(response){
    console.log('Status code: ' + response.statusCode);
   if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");
   }
   else{
     res.sendFile(__dirname + "/failure.html");
   }

    response.on('data', function(data){
      console.log(JSON.parse(jsonData));
    });
  });
 request.write(jsonData);
 request.end();
});

// failure page re-route to sign up page
app.post("/failure", function(req, res) {
  res.redirect("/");
});
// success page re-route to sign up page
app.post("/success", function(req, res){
  res.redirect("/");
})
// Mail chhimp Api Key 3df5b20a3f26a5073412fb05bbf48de7-us8
// Unique ID c837660108
// API endpoint 'https://${us8}.api.mailchimp.com/3.0/lists/'

// Heroku server app link https://aqueous-coast-73656.herokuapp.com
