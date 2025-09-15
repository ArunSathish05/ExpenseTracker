const express =require('express')
const routes=express.Router()
const {NewUser,Login,buypremium}=require('../controller/UserControl')
const verifyToken = require("../middleware/verifyToken");
const { authmiddeleware } = require("../middleware/authmiddleware");



routes.post('/create',NewUser)
routes.post("/login", Login);
routes.get("/verify", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});
routes.post("/premium", authmiddeleware, buypremium);
module.exports= routes