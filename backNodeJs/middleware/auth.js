const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const tokenBrut = req.headers.authorization
        const token = tokenBrut.split(" ")[1]
        jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
            if (err) {
                return res
                .status(401)
                .json({
                    status:401,
                    message:"Vous n'êtes pas connecté"
                })
            }
            req.payload = payload;
            next()
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

module.exports = auth;