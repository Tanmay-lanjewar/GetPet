const mongoose = require("mongoose");

const ListingSchema = mongoose.Schema({
  pet_id: {
    type: String,
    require: true,
    unique:true
  },
  seller_id: {
    type: String,
    require: true,
  },
  pet_name: {
    type: String,
    require: true,
  },
  pet_type: {
    type: String,
    require: true,
  },
  breed : {
    type: String,
    require: true,
  },
  age:{
    type:Number,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  image: {
    type: String,
    default:"https://getwallpapers.com/wallpaper/full/6/1/5/959887-puppy-wallpaper-desktop-2048x1536-iphone.jpg",
    set: (v) =>
      v == ""
        ? "https://getwallpapers.com/wallpaper/full/6/1/5/959887-puppy-wallpaper-desktop-2048x1536-iphone.jpg"
        : v
  },
  price: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    require: true,
  }
  
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
