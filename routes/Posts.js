const express = require("express");

const router = express.Router();
const multer = require('multer');
 
const Post = require("../models/Post");
const verify=require('../verifyToken')



//create a post
router.post('/write',async(req,res)=>{
  const newPost=new Post(req.body)
  try{
      const savedPost=await newPost.save()
      res.status(200).json(savedPost)

  }
  catch(err){
      res.status(500).json(err)
  }
})




//GET ALL POST DATA
router.get("/all",async(req,res)=>{
  try{
      const posts=await Post.find()
      res.status(200).json(posts)

  }
  catch(err){
      res.status(500).json(err)
  }
})

//GET POST DATA
router.get("/post/:id",async(req,res)=>{
  try{

      const id=req.params.id
      const post=await Post.findById(id)
      res.status(200).json(post)


  }
  catch(err){
      res.status(500).json(err)
  }
})

//UPDATE POST
router.put("/post/:id",async (req,res)=>{
  try{
      const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:{
        title: req.body.title,
        description: req.body.description,
        photo:req.body.photo,
      }
    },{new:true})
      res.status(200).json(updatedPost)
  }
  catch(err){
      res.status(500).json(err)
  }
})


//DELETE POST
router.delete("/post/:id",async (req,res)=>{
  try{
      await Post.findByIdAndDelete(req.params.id)
      res.status(200).json('Post has been deleted')
  }
  catch(err){
      res.status(500).json(err)
  }
})


module.exports = router;