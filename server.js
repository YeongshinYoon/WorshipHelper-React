const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env"});
const Schemas = require("./models/Schemas");

const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get List of Users (for Debugging)
app.get("/api/users", (req, res) => {
  res.send([
    {
      "username": "test1",
      "password": "test1"
    },
    {
      "username": "test2",
      "password": "test2"
    },
    {
      "username": "test3",
      "password": "test3"
    }
  ])
})

app.post("/api/loginProc", async (req, res) => {
  const username = req.body.Username
  const password = req.body.Password
  console.log("Username: ", username)
  console.log("Password: ", password)

  const users = Schemas.Users
  const user = await users.findOne({username: username, password: password}).exec()
  console.log(user)
})

app.post("/api/signupProc", async (req, res) => {
  const user = {
    email: req.body.Email,
    username: req.body.Username,
    password: req.body.Password,
    name: req.body.Name,
    birthday: req.body.Birthday,
    gender: req.body.Gender
  }
  console.log(user)
  const newUser = new Schemas.Users(user)

  try {
    await newUser.save( async (err, newUserResult) => {
      console.log("New user created!")
      res.end("New user created!")
    })
  } catch (err) {
    console.log(err)
    res.end("User not added!")
  }
})

app.get("/api/addBoardContent", async (req, res) => {
  const user = await (Schemas.Users).findOne({username: "test1"}).exec()
  const newBoardContent = new Schemas.BoardContents({ num: 1, title: "test1", writer: user.username, date: "2021-12-17 18:02", view: 0 })
  const newPosting = new Schemas.Postings({ boardContent: newBoardContent._id, content: "test1" })
  
  try {
    await newBoardContent.save( async (err, result) => {
      console.log("New board content added!")
      res.end("New board content added!")
    })
    await newPosting.save( async (err, result) => {
      console.log("New posting added!")
      res.end("New posting added!")
    })
  } catch (err) {
    console.log(err)
    res.end("Posting not added!")
  }
})

app.get("/api/getBoardContents", async (req, res) => {
  const boardContent = Schemas.BoardContents
  const boardContents = await boardContent.find().exec()

  res.send(boardContents)
})

app.listen(port, err => {
  if (err) {
    return console.log(err);
  } else {
    console.log(`listening on port ${port}`);
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to DB succesfully.");
      }
    });
  }
});