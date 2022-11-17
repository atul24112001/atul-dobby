const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User
