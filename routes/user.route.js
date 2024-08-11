const { Router } = require("express");

const { createUser, LoggIn } = require("../controllers/user.controller");
const userRouter =Router()
userRouter.post("/signup",createUser)
userRouter.post("/login",LoggIn)

module.exports=userRouter;