const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    imageName: {
        type: String,
        require: true
    }
})

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;