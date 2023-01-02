const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const DisabledJWT = require("../db/schemas/disabledJWT");
const User = require("../db/schemas/user");
const statusHttp = require("../statusHttp");

function createToken(data) {
    try {
        const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '24h' });
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    createToken,
    
    login: async (req, res) => {
        try {
            const { login, password } = req.body;
            if (login === undefined || password === undefined) {
                return res.status(statusHttp.badRequest.status).json();
            }
            const user = await User.findOne({ email: login });
            if (user) {
                const hashPassword = user.password;
                const userID = user._id;
                const name = user.name;

                compare(password, hashPassword).then((result) => {
                    if (result) {
                        const token = createToken({ id: userID, name: name });
                        res.status(statusHttp.ok.status).json({ token: token });
                    } else {
                        res.status(statusHttp.notFound.status).json();
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(statusHttp.internalServerError.status).json();
                });
            } else {
                res.status(statusHttp.notFound.status).json();
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    logout: async (req, res) => {
        try {
            const { token, tokenDecoded } = req.headers;
            if (token === undefined || tokenDecoded === undefined) {
                return res.status(statusHttp.badRequest.status).json();
            }
            const disabledJWT = new DisabledJWT({ token: token });
            disabledJWT.save().then(
                (_) => {
                    res.status(statusHttp.ok.status).json();
                })
                .catch((_) => {
                    res.status(statusHttp.internalServerError.status).json();
                })
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    }
}