const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1d" })
}

const Singup = async (req, res) => {
    console.log(req.body)
    const { emailId, password, name } = req.body;

    try {
        const userExist = await User.find({ emailId: emailId });
        if (userExist.length === 0) {
            const newUser = await User.create({ emailId, password, name });
            const token = await createToken(newUser._id);
            const data = {
                message: "Singup Successfully",
                data: {
                    "emailId": newUser["emailId"],
                    "userId": newUser["_id"],
                    "token": token,
                }
            }
            return res.status(200).json(data);
        } else {
            res.status(403).json({
                message: "Email already exist."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const Login = async (req, res) => {
    const { emailId, password } = req.body;
    // req.headers
    try {
        const userExist = await User.findOne({ emailId: emailId });
        if (userExist) {
            const valid = await bcrypt.compare(password, userExist?.password)
            if (valid) {
                const token = await createToken(userExist._id);
                res.status(200).json({
                    message: "Login successfully!",
                    data: {
                        emailId: userExist.emailId,
                        userId: userExist._id,
                        token,
                    }
                })
            } else {
                res.status(422).json({
                    message: "Invaild password."
                })
            }
        } else {
            res.status(422).json({
                message: "Invaild email or password, please singup."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    Login,
    Singup
}