//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey there! I'm Shubham Shinde, a Computer Engineer with an unyielding passion for writing. This blog is my creative haven, where technology and the written word collide. As we embark on this captivating journey, expect captivating insights on tech advancements, coding marvels, and the magic of AI. But it doesn't stop there – I'll also share my musings, storytelling prowess, and tips for fellow aspiring writers. Together, we'll explore the endless possibilities of technology and unleash the power of creativity.Let's connect, learn, and grow in this thrilling fusion of tech and writing!";

const aboutContent = "Hey, I'm Shubham Shinde – a Computer Engineer with a flair for both technology and the written word. With expertise in Web Development and Flutter, I delve into the ever-evolving world of coding and design. But my journey doesn't end there. Passionate about writing, I find solace in penning down tales, sharing knowledge, and exploring creative realms. This blog is my canvas, where I blend my tech skills and love for storytelling. Join me as we dive into captivating tech discussions, code snippets, and thought-provoking narratives. Let's embark on this thrilling adventure, where innovation and creativity harmoniously coexist!";

const contactContent = "Thank you for visiting my blog and showing interest in getting in touch! Whether you have a question, suggestion, collaboration proposal, or simply want to say hello, I'd love to hear from you. Feel free to drop me an email at shubhamshindec1 @gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-shubham:Shubham123@cluster0.tlw48o2.mongodb.net/BlogDB");

//creating schema of document
const blogSchema = new mongoose.Schema({
  title:String,
  body: String
})

//model 
const Blog = mongoose.model("Post",blogSchema);



app.get("/", function(req, res){

  Blog.find({})
    .then(function(items){
      res.render("home", {
        startingContent: homeStartingContent,
        allBlogs:items
      });
    })
    .catch(function(err){
      console.log(err);
    })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){

  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Blog({
    title: req.body.postTitle,
    body: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle =req.params.postName;
  console.log(requestedTitle)
  Blog.findOne({_id:requestedTitle})
    .then(function(founditem){
      res.render("post",{title:founditem.title,content:founditem.body})
    })
    .catch(function(err){
      console.log("err");
    })
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port 3000");
});
