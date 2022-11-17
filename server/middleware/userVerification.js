const jwt = require('jsonwebtoken')

const userVerification = async (req, res, next) => {
    const { authorization } = req.headers;
    let token = authorization.split("+")[1];
    console.log(token, "token")
    try {
        await jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                return res.status(400).json({
                    message: "jwt"
                })
            }
            next();
        });
    } catch (error) {
        next(error)
    }
}

module.exports = userVerification