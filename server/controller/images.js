const Image = require("../model/Image");

const GetImages = async (req, res) => {
    const { userId } = req.params;

    try {
        const images = await Image.find({
            userId: userId
        });
        res.status(200).json({
            data: images,
            total: images.length
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error."
        })
    }
}

const UploadImage = async (req, res) => {
    const { url, userId, imageName } = req.body;

    try {
        const newImage = await Image.create({ imageName, userId, url })
        res.status(200).json({
            data: newImage,
            message: "Image uploaded successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error."
        })
    }
}

module.exports = {
    UploadImage,
    GetImages
}