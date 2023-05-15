const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const TestDetails = require('../model/Company_test')
require("../db/conn");
const User = require("../model/UserSchema");
router.get("/", (req, res) => {
  res.send("server router");
});
//async await
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  console.log(req.body)
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "enter all fields." });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords do not match" });
    } else {
      const user = new User({ name, email, password, cpassword });

      await user.save();
      res.status(201).json({ message: "user registered sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
})
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "enter all fields" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // token = await userLogin.generateAuthToken();
      // console.log(token)
      // res.cookie("jwtoken",token,{
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly : true
      // })
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "login successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get('/test',async(req,res)=>{
  return res.json("Hey");
})




router.post("/testpatternsadd", async (req,res) =>{
     const company = new TestDetails(req.body);
     await company.save();
     return res.json({status:"Company Pattern Added"});
})

module.exports = router;