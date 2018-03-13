var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user.js");

// Show root page
router.get("/", function(req, res){
    res.render("landing");
});


// ============
// AUTH ROUTES
// ============

// Show register fom
router.get("/register",function(req,res){
    res.render("register");
});

// Handle sign up logic
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){  // Adding data to database(password encrypted) using passport-local-mongoose
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){      // Adding credentials that can login
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login",function(req,res){
    res.render("login");
});

// Handle login Logic
router.post("/login",passport.authenticate("local",{                // middleware-runs before callback,Checking if the Credentials match or not
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    }),function(req,res){
});

// logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

module.exports=router;