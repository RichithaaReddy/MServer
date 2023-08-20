const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(
  cors(
    {
      origin:'*',
      // methods:["POST","GET"],
      // credentials: true
    }
    

))
dotenv.config({ path: "./config.env" });
require('./db/conn')
//const User = require('./model/UserSchema')
app.use(require('./router/auth'))
const PORT = process.env.PORT;

// const middleware = (req, res, next) => {
//   console.log("run");
//   next();
// };

// app.get("/login", middleware, (req, res) => {
//   res.send("hello world from login ");
// });
// app.get("/", (req, res) => {
//   res.send("home page");
// });


app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
