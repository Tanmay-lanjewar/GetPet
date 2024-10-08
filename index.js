const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listening = require('./models/listing')
const path = require("path")
const { v4: uuidv4 } = require('uuid');


const mongourl = "mongodb://127.0.0.1:27017/GetPet"
 function connectdb(){
    mongoose.connect(mongourl)
    .then((res)=>{
        console.log("database connect succesfully");
    })
    .catch((e)=>{
        console.log("database not connected")
    })
}
connectdb()

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
res.send("working")
})

app.get("/all_listing",(req,res)=>{
    const all_listing = Listening.find()
    .then((result)=>{
        res.render("listing/index",{result})
    })
    .catch((e)=>{
        console.log("all_listing error:"+e)
    })
})

//request add new route:
app.get("/listing/new",(req,res)=>{
   res.render("listing/new.ejs")
})

//Create Route:
app.post('/all_listing',async (req,res)=>{

    let {pet_name,pet_type,breed,age,description,image,price,location} = req.body;
    let pet_id =uuidv4();
    let seller_id =  uuidv4();
  let data = {seller_id,pet_id,pet_name,pet_type,breed,age,description,image,price,location}
  let new_listing = new Listening(data);
  new_listing.save();
  res.redirect("all_listing")
})

app.get("/all_listing/:id",(req,res)=>{
    let {id} = req.params;
    Listening.find({"pet_id":id})
    .then((result)=>{
        console.log(result)
       res.render("listing/Show.ejs",{data:result[0]})
    })
    .catch((e)=>{
        console.log("error at show route")
    })
})
app.listen("8080",()=>{
    console.log("Server is Listening to port 8080")
})