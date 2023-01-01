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
            if (error.code === 11000) {
                res.status(statusHttp.badRequest.status).json({ errorCode: true, message: "Id existente" });
            } else if (error._message === "Sell validation failed") {
                res.status(statusHttp.badRequest.status).json({ errorCode: true, message: "Campo deve ser preenchido" });
            } else {
                console.log(error);
                res.status(statusHttp.internalServerError.status).json();
            }
        }
    },

    putSell: async (req, res) => {
        const { id } = req.query;
        const sellParams = req.body;
        try {
            if (await Sell.findOne({ _id: id })) {
                await Sell.updateOne({ _id: id }, [{ $set: sellParams }]);
                res.status(statusHttp.ok.status).json();
            } else {
                res.status(statusHttp.notFound.status).json();
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    deleteSell: async (req, res) => {
        const { id } = req.query;
        try {
            if (await Sell.findOne({ _id: id })) {
                await Sell.deleteOne({ _id: id });
                res.status(statusHttp.ok.status).json();
            } else {
                res.status(statusHttp.notFound.status).json();
            }

        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    getSell: async (req, res) => {
        const { id } = req.query;
        try {
            if (id === undefined) {
                const sells = await Sell.find();
                res.json(sells);
            } else {
                const sell = await Sell.findOne({ _id: id });
                if (sell) {
                    res.json(sell);
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