const express = require("express");

const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




//Register route
router.post('/register',async(req,res)=>{
  try{
    const {name,email,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({name,email,password:hashedPassword});
    const saveUser = await newUser.save();
    res.status(200).json(saveUser)
  }catch(err){
    res.status(500).json({err:"Registration failed !"})
  }
})




//Login route
router.post('/login',async (req,res)=>{
  try{
    // console.log(req.body.email);
    // console.log(req.body.password);
    const user = await User.findOne({email:req.body.email})
    if(!user){
      return res.status(404).json("user not found");
    }
    const match = bcrypt.compareSync(req.body.password,user.password);
    if(!match){
      return res.status(401).json("Wrong credentials");
    }
    const token = jwt.sign({id:user._id,name:user.name,email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2d"});
    const {password,...info} = user._doc;
    // return res.status(200).json(user)
    res.cookie('token',token).status(200).json(info)
  }catch(err){
    res.status(500).json({err:"Login failed"})
  }

})




//Logout

router.get('/logout',async (req,res)=>{
  try{
    res.clearCookie('token',{sameSite:"none",secure:true}).status(200).send("User logout successfully")
  }catch(err){
    res.status(500).json({err:"Logout failed"});
  }
})

//Avoid automatic logout when refresh
router.get("/refetch",(req,res)=>{
  const token = req.cookies.token
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{},async (err,data)=>{
    if(err){
      return res.status(400).json(err)
    }
    res.status(200).json(data)
  })
})

module.exports = router