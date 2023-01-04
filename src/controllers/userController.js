const cipher = require("../cipher/cipher");
const User = require("../db/schemas/user");
const { confirmEmail } = require("../nodemailer/nodemailer");
const { createToken } = require("../services/access");
const statusHttp = require("../statusHttp");

module.exports = {
    addUser: async (req, res) => {
        const userParams = req.body;
        const { link } = req.body;
        if (userParams.password === undefined || link === undefined) {
            res.status(statusHttp.badRequest.status).json({ errorValidation: true, message: "Campo deve ser preenchido" });
        }
        try {
            userParams.password = await cipher.cipher(userParams.password);
            let newUser = new User(userParams);
            const user = await newUser.save();
            const token = createToken({ id: user._id });
            console.log(user._id);
            confirmEmail(userParams.email, link + "?token=" + token)
                .then(() => {
                    res.status(statusHttp.ok.status).json();
                })
                .catch((err) => {
                    res.status(statusHttp.internalServerError.status).json();
                })
        } catch (error) {
            if (error.code === 11000) {
                res.status(statusHttp.badRequest.status).json({ errorEmail: true, message: "Email existente" });
            } else if (error._message === "Item validation failed") {
                res.status(statusHttp.badRequest.status).json({ errorValidation: true, message: "Campo deve ser preenchido" });
            } else {
                console.log(error);
                res.status(statusHttp.internalServerError.status).json();
            }
        }
    },

    putUser: async (req, res) => {
        const { id } = req.query;
        const userParams = req.body;
        try {
            if (await User.findOne({ _id: id })) {
                await User.updateOne({ _id: id }, [{ $set: userParams }]);
                res.status(statusHttp.ok.status).json();
            } else {
                res.status(statusHttp.notFound.status).json();
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.query;
        try {
            if (await User.findOne({ _id: id })) {
                await User.deleteOne({ _id: id });
                res.status(statusHttp.ok.status).json();
            } else {
                res.status(statusHttp.notFound.status).json();
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    getUser: async (req, res) => {
        const { id } = req.query;
        try {
            if (id === undefined) {
                const users = await User.find();
                res.json(users);
            } else {
                const user = await User.findOne({ _id: id });
                if (user) {
                    res.json(user);
                } else {
                    res.status(statusHttp.notFound.status).json();
                }
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },
}