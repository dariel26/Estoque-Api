require('dotenv').config();
const jwt = require('jsonwebtoken');
const DisabledJWT = require('../db/schemas/disabledJWT');
const statusHttp = require('../statusHttp');

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            let { token } = req.headers;
            if (token === undefined) {
                token = req.query.token;
            }
            if (token === undefined) {
                token = req.body.token;
            }
            if (token === undefined) {
                return res.status(statusHttp.badRequest.status).json();
            }
            var result = await new Promise((resolve) => {
                jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        resolve(undefined);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            if (result === undefined) {
                return res.status(statusHttp.unauthorized.status).json();
            } else {
                if (await DisabledJWT.findOne({ token: token })) {
                    return res.status(statusHttp.unauthorized.status).json();
                } else {
                    req.headers.tokenDecoded = result;
                    req.headers.token = token;
                    return next();
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(statusHttp.unauthorized.status).json();
        }
    },
}