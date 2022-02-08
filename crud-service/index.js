import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import excelmongodb from "excel-mongodb";
import Routes from "./server/route.js";
import router from "./server/route.js";
// import { MongoClient } from "mongodb";
import csv from "csvtojson";
import multer from "multer";
import postUser from "./model/user.js";
import fs from 'fs';
// import excelToJson from "convert-excel-to-json";

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", Routes);
const URL = "mongodb://localhost/PiyushDB";
const PORT = process.env.PORT || "8080";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
// const express = require('express');
// import fileUpload from "express-fileupload";
import path from "path";
import { parseString } from "fast-csv";
import { profile } from "console";
const __dirname = path.resolve();

// const app = express();

// default options
// app.use(fileUpload());

// app.post('/upload', function(req, res) {
//   let sampleFile;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   sampleFile = req.files.sampleFile;
//   uploadPath = __dirname + '/public/uploads/' + sampleFile.name;

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(uploadPath, function(err) {
//     if (err)
//       return res.status(500).send(err);

//     res.send('File uploaded!');

//   });
// });


// app.get("/users", async (req, res) => {
//   const PAGE_SIZE = 4;
//   const page = parseInt(req.query.page || "0");
//   const total = await postUser.countDocuments({});
//   const users = await postUser.find({})
//     .limit(PAGE_SIZE)
//     .skip(PAGE_SIZE * page);
//   res.json({
//     totalPages: Math.ceil(total / PAGE_SIZE),
//     users,
//   });
// });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var uploads = multer({ storage: storage });
app.use(express.static(path.resolve(__dirname, "public")));

var temp;
app.post('/upload',uploads.single('sampleFile'),(req,res)=>{
  //convert csvfile to jsonArray
 csv()
 .fromFile(req.file.path)
 .then((jsonObj)=>{
     console.log(jsonObj);
     for(var x=0;x<jsonObj;x++){
      temp = parseInt(jsonObj[x].id)
      jsonObj[x].id = temp;
      temp = parseString(jsonObj[x].name)
      jsonObj[x].name = temp;
      temp = parseString(jsonObj[x].username)
      jsonObj[x].username = temp;
      temp = parseString(jsonObj[x].email)
      jsonObj[x].email = temp;
      temp = parseInt(jsonObj[x].Number)
      jsonObj[x].Number = temp;
  }
      postUser.insertMany(jsonObj,(err,data)=>{
             if(err){
                 console.log(err);
             }else{
                 res.redirect('/');
             }
      });
    });
 });















//  app.post("/uploadphoto",uploads.single('photo'),(req,res)=>{
//   var img = fs.readFileSync(req.file.path);
//   var encode_img = img.toString('base64');
//   var final_img = {
//       contentType:req.file.mimetype,
//       image:new Buffer(encode_img,'base64')
//   };
//   imageModel.create(final_img,function(err,result){
//       if(err){
//           console.log(err);
//       }else{
//           console.log(result.img.Buffer);
//           console.log("Saved To database");
//           res.contentType(final_img.contentType);
//           res.send(final_img.image);
//       }
//   })
// })

// app.post('/uploadphoto', uploads.single('sampleFile'), (req, res, next) => {
  
//   var obj = {
//       // name: req.body.name,
//       // desc: req.body.desc,
//       img: {
//           data: fs.readFileSync(path.join(__dirname + '/public/uploads/' + req.file.sampleFile)),
//           contentType: 'image/png'
//       }
//   }
//   postUser.create(obj, (err, item) => {
//       if (err) {
//           console.log(err);
//       }
//       else {
//           // item.save();
//           res.redirect('/');
//       }
//   });
// });
