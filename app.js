var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    passport        =   require("passport"),
    LocalStrategy   =   require("passport-local"),
    mongoose        =   require("mongoose"),
    flash           =   require("connect-flash"),
    Campground      =   require("./models/campground.js"),
    methodOverride  =   require("method-override"),
    Comment         =   require("./models/comment"),
    User            =   require("./models/user.js"),
    seedDB          =   require("./seeds.js");

// Requiring Routes
var commentRoutes      =   require("./routes/comments.js"),
    campgroundRoutes   =   require("./routes/campgrounds.js"),
    indexRoutes         =   require("./routes/index.js");

mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// ================
// PASSPORT CONFIG
// ================

app.use(require("express-session")({
    secret:"Can be Anything",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){                            // Anything inside res.locals is available inside all the templates
    res.locals.currentUser=req.user;                       // req.user returns data about current loggedin user
    res.locals.error=req.flash("error");                   // To display flash messages()
    res.locals.success=req.flash("success");
    next();                                                // move on to next code,as the code is middleware
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started at Port 3000");
});