const mongoose =require("mongoose");

const dbConnect=async()=>{
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("MongoDB Connected");
    

}

module.exports=dbConnect;