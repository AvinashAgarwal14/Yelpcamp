var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
var middleware=require("../middleware");

// ================   
// COMMENTS ROUTES
// ================

// Show form for new comment
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    //Find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{campground:campground});
        }
    })
});

// Handle Comment logic
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            //create a new comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    req.flash("success","Comment added");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            })
        }
    });
});

// COMMENT EDIT FORM
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
});

// COMMENT UPDATE LOGIC
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log(err);
        } else{
            req.flash("success","Comment updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// COMMENT DELETE LOGIC
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports=router;