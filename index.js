// Import Required Modules
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

// Initialize Express App
var app = express();

// Use Middleware for Body Parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Exercise 1: Basic Hello World Route
app.get("/", function (req, res) {
  res.send("Hello, it is my first Express application");
});

// Exercise 2: About Route
app.get("/about", function (req, res) {
  res.send("This is a basic Express application");
});

// Exercise 2: Dynamic Parameters Route
app.get("/users/:userId/books/:bookId", function (req, res) {
  res.send(req.params);
});

// Exercise 3: Read JSON File and Display All Students
app.get("/GetStudents", function (req, res) {
  fs.readFile(__dirname + "/" + "Student.json", "utf8", function (err, data) {
    if (err) {
      res.status(500).send("Error reading the file");
    } else {
      res.json({
        status: true,
        Status_Code: 200,
        studentdata: JSON.parse(data),
      });
    }
  });
});

// Exercise 3: Fetch Specific Student by ID
app.get("/GetStudentid/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "Student.json", "utf8", function (err, data) {
    if (err) {
      res.status(500).send("Error reading the file");
    } else {
      var students = JSON.parse(data);
      var student = students["Student" + req.params.id];
      if (student) {
        res.json(student);
      } else {
        res.json({
          status: false,
          message: "Student not found",
        });
      }
    }
  });
});

// Exercise 4: Serve HTML Form
app.get("/studentinfo", function (req, res) {
  res.sendFile("StudentInfo.html", { root: __dirname });
});

// Exercise 4: Handle POST Form Submission
app.post("/submit-data", function (req, res) {
  var name = req.body.firstName + " " + req.body.lastName;
  var age = req.body.myAge + " Gender: " + req.body.gender;
  var qualifications = req.body.Qual;

  res.send({
    status: true,
    message: "Form Details",
    data: {
      name: name,
      age: age,
      qualifications: qualifications,
    },
  });
});

// Start the Server
app.listen(5000, function () {
  console.log("Server is running on port 5000");
});
