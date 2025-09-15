const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
require("dotenv").config();

const authmiddeleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });

    const decoded = jwt.verify(token, process.env.secretOrPrivateKey);
    const user = await userModel.findById(decoded.Id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};



// const middelewarecheck =(req,res,next)=>{
//     try {
//         const check =req.arun.middlewareCheck
//         if(check){
//             console.log("2md check:",check);

//             next()
//         }
//     } catch (error) {
//         res.json({success:false,message:error.message})
//     }
// }
module.exports = { authmiddeleware };
