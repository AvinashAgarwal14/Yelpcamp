var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleware=require("../middleware");                 // Name index.js is used because it is automatically accquired

// ==================
// CAMPGROUNDS ROUTES
// ==================

// INDEX - Show all Campground
router.get("/campgrounds", function(req, res){
    // get all campground from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
         res.render("campgrounds/index",{campgrounds:allCampgrounds});
     }
    });
});

// NEW - Display form to add new Campgound
router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res){
    res.render("campgrounds/new"); 
});

// CREATE - Add new Campgound to DB
router.post("/campgrounds",middleware.isLoggedIn,function(req, res){
    // get data from form and add to campgrounds DB
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image,description:desc,author:author};
    // Create a new campground and save it to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
        //redirect back to campgrounds page
        res.redirect("/campgrounds");
    }
    });
});

// SHOW- show more info about one campground
router.get("/campgrounds/:id",function(req,res){
    //Find the campground with that ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //Render show template with that ID
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTES
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
        }else{
            // Redirect to show page
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports=router;