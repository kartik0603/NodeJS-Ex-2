const express = require("express");
const dbConnect =require("./config/db")
const userRouter =require("./routes/user.route")
const cors =require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}))

app.get("/", (req,res)=>{
    res.send({messaage : "Started"})
})

app.use("/user",userRouter);


app.listen(9096,()=>{
    console.log("Connected to 9096");
    dbConnect()
    
})