//jshint esversion:6

var mongoose = require('mongoose');
const { Schema } = require("mongoose");
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blog';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true },(err)=>{
    if(err)console.log(lul);
    else console.log("hello motto");
});
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var  myschema= mongoose.Schema;

var blogSchema = new myschema({
  title:String,
  content:String
});
// Compile model from schema
var blog = mongoose.model('blog', blogSchema );




const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { truncate } = require("lodash");

const homeStartingContent = "Hi, This is the home page of my blog website. You can compose a blog by clicking on the compose buttton.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {

  blog.find((err,arr)=>{
    if(err)console.log(err);
    else{

      res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: arr
      })

    }
  })

})

app.get('/about', (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  })
})

app.get('/contact', (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  })
})


app.get('/compose', (req, res) => {
  res.render('compose')
})


app.post('/compose', function (req, res) {
  const post = {
    title: req.body.title,
    content:req.body.content

  }

  const b1=new blog(post)
  b1.save((err)=>{
    if(err)console.log(err);
    else console.log('Succesfully Added');
  });
  res.redirect("/")
})

app.get('/posts/:id', (req, res) => {
  let blogId =(req.params.id)

  blog.findById(blogId,(err,reqBlog)=>{
    if(err)console.log('lul');
    res.render("post", {
      title: reqBlog.title,
      content: reqBlog.content
    });

  })

})

app.post('/delete', function (req, res) {

  const reqId=req.body.givenId;

  blog.findOneAndRemove(reqId,(err)=>{
    if(err)console.log(err);
    else console.log('Succesfully Deleted');
  })

  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});