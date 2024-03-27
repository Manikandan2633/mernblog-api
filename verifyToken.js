const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json("not allowed");
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET ,async(err,data)=>{
    if(err){
      return res.status(401).json("token is not valid")
    }
    req.userId = data.id;
    next();
  })
}

module.exports = verifyToken;