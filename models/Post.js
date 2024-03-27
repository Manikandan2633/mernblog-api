const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title :{
    type: String,
    required:true,
  },
  description:{
    type: String,
    required : true,
  },
  photo:{
    type: String,
    required:true,
  },
  username:{
    type: String,
    required:true,
  },
  userId : {
    type: String,
    required : true,
  }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema);