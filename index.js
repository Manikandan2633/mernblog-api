const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const authRouter = require("./routes/Auth");
const postRouter = require("./routes/Posts");
const commentRouter = require("./routes/Comments");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB conneted");
  } catch (err) {
    console.log(err);
  }
};

app.get('/',(req,res)=>{
  res.status(200).send("The Blog website is running");
})

const WhiteListOrigin = ['https://freedium-mern-blog.onrender.com'];

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:WhiteListOrigin,
  credentials: true,
  methods:[
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ]
}));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comment", commentRouter);
app.use("/images",express.static(path.join(__dirname,"images")))





//image upload
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,"images")
  },filename:(req,file,cb)=>{
      const filename = file.originalname; // Use the original filename
    cb(null, file.originalname);
  }
})
//image upload
const upload=multer({storage:storage})
// const upload=multer({dest:'images/'})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  // const filePath = req.file.path;
  res.status(200).json("Success");
  // res.status(200).json("Image has been uploaded!")
})


app.listen(PORT, () => {
  connectDB();
  console.log(`Port is running on ${PORT}`);
});
