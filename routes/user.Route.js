const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.Model");
require('dotenv').config()
const userRouter = express.Router();

// Register route

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
        res.status(200).json({msg:"User Already existed"})
    }else{
        bcrypt.hash(password, 2, async (err, hash) => {
          if (err) {
            res.status(500).json({ msg: err.message });
          } else {
            const newUser = new UserModel({ ...req.body, password: hash,avatar:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" });
            await newUser.save();
            res.status(200).json({ msg: `A new user id registered successful `,newUser });
          }
        });
      }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Login route

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Enter valid Password and email" });
        } else {
          var token = jwt.sign({ purpose: "evaluation" }, process.env.privateKey, {
            expiresIn: 60 * 60,
          });

          res.status(200).json({ msg: "user Login successfull", token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = { userRouter };
