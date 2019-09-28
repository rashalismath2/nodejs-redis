const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();
mongoose.connect("mongodb+srv://ismath:4381545392@cluster0-vwh2t.mongodb.net/test?retryWrites=true&w=majority",
                        { useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useUnifiedTopology', true);

//Routes
const searchRoute=require("./Routes/search");


app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/search',searchRoute);

mongoose.connection.once("open",()=>{
    console.log("connection to mongo db has been made");
    app.listen("1010",()=>{
        console.log("server is running on port 1010");
    });
}).on("error",(e)=>{
    console.log("Connection to mongo db error "+e);
})