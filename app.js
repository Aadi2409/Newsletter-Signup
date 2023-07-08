const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fname = req.body.Name;
  const lname = req.body.Surname;
  const Email = req.body.email;

  var data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/234a7f0937";

  const options = {
    method: "POST",
    auth: "aditya:454097a3a07d0644cc2c5c3a6b2619ca-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    // });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is up at port 3000");
});

// ApiKey
// 454097a3a07d0644cc2c5c3a6b2619ca-us21
//Audience ID
// 234a7f0937
