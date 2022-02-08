import express from "express";
import fs from 'fs';
import {
  getUsers,
  addUser,
  getUserById,
  editUser,
  deleteUser,
} from "../controller/user-controller.js";
import path from "path";
import multer from "multer";
import User from "../model/user.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (re, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// const app = express();
 const __dirname = path.resolve();
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./public/uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });

// var uploads = multer({ storage: storage });
// app.use(express.static(path.resolve(__dirname, "public")));

router.get("/", getUsers);
router.post("/add", upload.single("articleImage"), async (req, res) => {
  // retreive the info of user from frontend
  const response = new User({
    articleImage: req.file.originalname,
  //   articleImage: {
  //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //     contentType: 'image/png'
 // },
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  }).save();

  res.status(200).send(response);
});
router.get("/:id", getUserById);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
