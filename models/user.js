const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    imgname: {
        type: String,
        required: true
    }
})

mongoose.model("Multer", userSchema)