var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://himanshubari21:himanshu@cluster0.7fq1j.mongodb.net/?retryWrites=true&w=majority";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/getemail", (req, res) => {
        var fname = req.query.name;
        var email = req.query.email;
        var phone = req.query.phone;
        var address = req.query.Address;
        var subject = req.query.subject;
        var message = req.query.message;
        var location = req.query.location;

        res.send(`Your name is ${fname}<br>Your email id is ${email}<br>Your phone Number is ${phone}<br> Your Address is ${address}<br> Your Subject is ${subject}<br> Your message is ${message}`);

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("Customers");
            var myobj = { "name": fname, "email": email, "phone": phone, "address": address, "subject": subject, "message": message, "location": location };
            dbo.collection("Message").insertOne(myobj, (err, res) => {
              if (err) throw err;
              console.log("1 document inserted");
              // res.send("Details above has been submitted")
              db.close();
            });
          });

    });
    
app.listen(3000);

console.log("Something awesome to happen at http://localhost:3000");