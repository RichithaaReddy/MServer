const { models, model, Schema } = require("mongoose");
const ResultSchema = new Schema({
    email:{
        type: String,
        required: false,
    },
    typeOfExam: {
        type: [String],
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    
    })
    const Result = models.resultdetails || model("resultdetails",ResultSchema)   
    module.exports = Result
    // const Result = mongoose.model('Result', ResultSchema);