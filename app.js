
const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
var favicon = require('serve-favicon');
var _= require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin-kunal:ktdt2001@cluster0.yxnvp.mongodb.net/blogDB",{useNewUrlParser:true});

const postSchema= new mongoose.Schema({
	title:String,
	content:String
});

const Post=mongoose.model("Post",postSchema);



const homeStartingContent= "Hello! there I am Kunal Thite , I have Created This Blogging Website.Its free and Anonymous. Anybody can come here write a blog on whatever topic they like for and post on this website and people all around the world can see your blog and gain knowledge about that topic. If you like to mention your name and your social handles you can mention it on  Content of blog itself.";
const aboutContent= "This Website is Very Simple To use. You Have To just Come to my website and the Read the Blogs as many times you want just for free and no login required. If you also wish to write a blog you can write just by clicking on button Create a new blog. You can Read all the blogs on the home page itself You just have scroll the page and read the blog accoring to topic you like. On the home page The content of blog is truncated to 100 words so to read the full blog you have click on Read more and you can easily Read the full blog." ;


const app= express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.get("/", function(req, res) {
	Post.find({},function(err,posts){
if(!err){
	res.render("home", {homeContent: homeStartingContent, posts: posts});
}
});
});

app.get("/about", function(req, res) {
	res.render("about", {about: aboutContent});
});

app.get("/contact", function(req, res) {
	res.render("contact", {contact: contactContent});
});

app.get("/compose", function(req, res) {
	res.render("compose", {writtenContent: ""});
});

app.post("/", function(req, res){
	const post=new Post({
		title: req.body.titleContent,
		content: req.body.bodyContent
	});
	post.save(function(err){
if(!err){
	res.redirect("/");
}
});
});

app.get("/posts/:postId", function(req, res) {

	const requestPostId=req.params.postId;

	Post.findOne({_id:requestPostId},function(err,post){
		if(!err){
		res.render("post",{
			title:post.title,
			content:post.content
		});
	}
	});

});

let port=process.env.PORT;
if(port==null || port==""){
	port=3000;
}
app.listen(port, function() {
	console.log("Server Started Successfully");
});
