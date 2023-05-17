const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const TestDetails = require('../model/Company_test')
const Resultdetails = require('../model/ResultSchema')
require("../db/conn");
const cloudinary  = require('cloudinary');
const User = require("../model/UserSchema");
const Result = require('../model/ResultSchema')


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
      return res.status(422).json({ "status": "enter all fields" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ "status": "Invalid credentials" });
      } else {
        let payload = {
          user:{
             id:userLogin.id
          }
        }
        const token = jwt.sign(payload,"NOTTOBESHARED",{expiresIn:9999999999999},(err,token)=>{
               if(err)
               {
                res.send(err);
               }
               else
               {
                   res.json({"status":token});
               }
        })
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
  return res.json({status:"Company Pattern Added"});
})

router.post("/getcloudinary",async(req,res)=>{
  const url_image = req.body.url_image;
    cloudinary.config({
        cloud_name: "djmhakv9l",
        api_key: "682166194484921",
        api_secret: "qJ4GlFC30Wet9cvOGoGf5xLatvY"
      });
    
      cloudinary.uploader.upload(url_image, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }})
})

router.get("/testpatternsdisplay",async (req,res)=>{
  const status =  await TestDetails.find();
  return res.json(status); 
})


router.get("/testpatternsdisplay/:id",async(req,res)=>{
    const company = req.params.id;
    const status = await TestDetails.find({companyname:company});
    return res.json(status);
})


router.post("/scorecard", async (req, res)=>{
  const marks = new Resultdetails(req.body);
  await marks.save();
  return res.json({status:"Results Added"});

})

router.get("/getusers",async(req,res)=>{
  const result = await User.find();
  return res.json(result);
})

router.get("/testpatterns",async(req,res)=>{
  const restt = await TestDetails.find();
  return res.json(restt);
})


router.post('/storetestmarks',async(req,res)=>{
     const token = req.body.token;
     const examtype = req.body.examtype;
     const score = req.body.score;
     const load = jwt.verify(token,"NOTTOBESHARED");
     const orgid = load.user.id;
     console.log(load);
     const user = await User.findOne({_id:orgid});
     const body = {
      email:user.email,
      score:score,
      date: new Date(),
      userid:user._id,
      examtype:examtype
     }
     const result = new Result(body);
     result.save();
     return res.json({"status":"posted"});
})



module.exports = router;