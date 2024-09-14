const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listening = require('./models/listing')


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

app.get("/",(req,res)=>{
   const new_listning = new Listening({
        pet_id: '4134445',
  seller_id: '67890',
  pet_name: 'Buddy',
  pet_type: 'Dog',
  breed: 'Golden Retriever',
  age: 2,
  description: 'Friendly and playful dog, great with kids.',
  location: 'New York, USA'
    })

    new_listning.save()
    .then((res)=>{
        console.log("saved "+res)
    })
    .catch((e)=>{
        console.log("error:"+e)
    })
})

app.listen("8080",()=>{
    console.log("Server is Listening to port 8080")
})