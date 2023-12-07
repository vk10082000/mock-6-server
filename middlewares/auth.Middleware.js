const jwt = require("jsonwebtoken")
require('dotenv').config()

const auth=async(req,res,next)=>{
    const token  = req.headers.authorization?.split(" ")[1];

    try {
        if(token){
            jwt.verify(token,process.env.privateKey , function(err, decoded) {
                req.payload = decoded.userID;
                next()
              });
        }
        else{
            res.status(200).json({msg:"Token Expired"})
        }
     

    } catch (error) {
        res.status(500).json({msg:"Login Again"})
    }

}
module.exports={auth}