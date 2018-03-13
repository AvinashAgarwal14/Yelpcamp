var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var Comment= require("./models/comment");

var data=[
	{
		name:"Cloud's Rest",
	 	image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
	 	description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	},
	{
		name:"Desert Mesa",
	 	image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
	 	description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	},
	{
		name:"Canyon Floor",
	 	image:"https://farm3.staticflickr.com/2513/5799092048_1b9915714c.jpg",
	 	description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	}
	];


function seedDB()
{
	//Remove all Campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		} else{
		console.log("removed campground");
		
		//Add a few Campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				} else{
					console.log("Added a Campground.");
					
					//Add few Comments
					Comment.create(
					{
						text:"This place is great,but I wish there was Internet.",
						author:"Homer"
					},function(err,comment){
						if(err){
							console.log(err);
						} else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment")
						}
					});
				}
			});
		});

		}
	});
}

module.exports=seedDB;