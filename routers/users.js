// const express = require("express");
// const router = express.Router();
// const User = require("../models/users.js");

// // Getting all
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // Creating one
// router.post("/", async (req, res) => {
//   const user = new User({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     age: req.body.age,
//     gender: req.body.gender,
//     mobile_number: req.body.mobile_number,
//     profile_photo: req.body.profile_photo,
//   });
//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ messaage: err.message });
//   }
// });

// // Delete all users
// router.delete("/", async (req, res) => {
//   try {
//     await User.deleteMany();
//     res.status(200).json({ message: "All users deleted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // Deleting all
// // router.delete("/", async (req, res) => {
// //   try {
// //     const users = await User.find();
// //     for (let user of users) {
// //       await user.remove();
// //     }
// //     res.send({ message: "deleted all users" });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // });

