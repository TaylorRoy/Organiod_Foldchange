const express = require('express');
const path = require('path');
// const excelToJson = require('convert-excel-to-json');
xlsxtojson = require("xlsx-to-json");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(function(req, res,next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-ALlow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Request");
  next();
})

app.use(express.static(__dirname + '/public'));
app.use('public/uploads', express.static(__dirname + '/public/uploads'))
// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("assets"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
// app.get("/", function(req, res) {
//   res.send("Hello World!!!");
// })

// app.post("/api/xlsxtojson", function(req, res){
//   res.send("in xlsx to json")
//   xlsxtojson({
//     input: "./test.xlsx", 
//     output: "./output.json",
//   }, function(err, result) {
//     if(err) {
//       console.log("not working")
//       res.json(err);
//     }else {
//       console.log("working")
//       res.json(result);
//     }
//   });
// })

  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// var express = require('express')
// var app = express()
// var xlsxtojson = require("xlsx-to-json");
// // var xlstojson = require("xls-to-json");


// app.use(function (req, res, next) { //allow cross origin requests
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//   res.header("Access-Control-Max-Age", "3600");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//   next();
// });

// // configuration
// app.use(express.static(__dirname + '/public'));
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// app.get('/', function (req, res) {
//   res.send('Hello World template')
// })

// app.post('/post', function (req, res) {
//   xlsxtojson({
//     input: "./test.xlsx",  // input xls 
//     output: "./jsontest.json", // output json 
//     lowerCaseHeaders: true
//   }, function (err, result) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result)
//       console.log(result)
//     }
//   });
// });
// app.listen(3000);