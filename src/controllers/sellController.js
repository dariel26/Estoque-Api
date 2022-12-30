const Sell = require("../db/schemas/sell");
const statusHttp = require("../statusHttp");

module.exports = {
    addSell: async (req, res) => {
        const sellParams = req.body;
        let newSell = new Sell(sellParams);
        try {
            await newSell.save();
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    putSell: async (req, res) => {
        const { id } = req.query;
        const sellParams = req.body;
        try {
            await Sell.updateOne({ _id: id }, [{ $set: sellParams }]);
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    deleteSell: async (req, res) => {
        const { id } = req.query;
        try {
            await Sell.deleteOne({ _id: id });
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    getSell: async (req, res) => {
        const { id } = req.query;
        try {
            if (id === undefined) {
                const users = await Sell.find();
                res.json(users);
            } else {
                const user = await Sell.findOne({ _id: id });
                res.json(user);
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },
}