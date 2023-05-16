const resultSchema = new mongoose.Schema({
    email:{
        type: String,
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
    // date: {
    //     type: date,
    //     required: true,
    // },
    // time: {
    //     type: String,
    //     required: true,
    // },
    // question: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Question',
    //     required: true,

    // },
    })
    const Result = mongoose.model('Result', resultSchema);