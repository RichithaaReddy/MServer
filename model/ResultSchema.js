const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userid:{
        type:String,
        required:true
    },
    examtype:{
        type:String,
        required:true
    }
    })
    const Result = mongoose.model('Result', resultSchema);

module.exports = Result;