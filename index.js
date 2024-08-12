const express = require("express");
const dbConnect =require("./config/db")
const userRoute =require("./routes/user.route")
const blogRoute =require("./routes/blog.route");
const commentRoute =require("./routes/comment.route")
const cors =require('cors');



const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended :true}))

app.get("/", (req,res)=>{
    res.send({messaage : "Started"})
})

app.use("/user",userRoute);
app.use("/blogpost",blogRoute)
app.use("/comments",commentRoute)


app.listen(9096,()=>{
    console.log("Connected to 9096");
    dbConnect()
    
})