
const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
var _= require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin-kunal:ktdt2001@cluster0.yxnvp.mongodb.net/blogDB",{useNewUrlParser:true});

const postSchema= new mongoose.Schema({
	title:String,
	content:String
});

const Post=mongoose.model("Post",postSchema);



const homeStartingContent= "Hello! there I am Kunal Thite , I had come up with my latest blog and i hope all you will enjoy it and understand about the context and also you can free feel to give me suggestions so that my blog can become much better. At present i am new as a blog writer so my blog may ebe not that much interesting or good looking etc. things that are contained in any other professional blog writer.My blog will be basically on interest of my things, but also suggestion on other topic as well will be welcome.";
const aboutContent= "This Blog will cover topics like gaming, criket, sports, studying, coding, Enginnering, memes, youtubers, pubg, about India, Media, Politics, about IIT-JEE and much more. blog will cover all the details and information about the topic and i tried to not to go besides the topic while talking about one topic. Data and claims are extracted from internet. Link is provided for further details for a particular topic.";
const contactContent= "You can follow me on instagarm and of facebook and twitter as well if you wish its upto you. At present i have no youtube channel. I have also snapchat account but i use it rarely. link of id's had been given below and also my Email-id and whatsapp mo. too, feel free to contact me if you have any suggestions, issues or comlain through my social media accounts.";

const app= express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

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


app.listen(3000, function() {
	console.log("Server running on port:3000");
});
