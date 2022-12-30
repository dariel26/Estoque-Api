const Item = require("../db/schemas/item");
const statusHttp = require("../statusHttp");

module.exports = {
    addItem: async (req, res) => {
        const itemParams = req.body;
        let newItem = new Item(itemParams);
        try {
            await newItem.save();
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            if (error.code === 11000) {
                res.status(statusHttp.badRequest.status).json({ errorCode: true, message: "Código existente" });
            } else if (error._message === "Item validation failed") {
                res.status(statusHttp.badRequest.status).json({ errorValidation: true, message: "Campo deve ser preenchido" });
            } else {
                console.log(error);
                res.status(statusHttp.internalServerError.status).json();
            }
        }
    },

    putItem: async (req, res) => {
        const { id } = req.query;
        const itemsParams = req.body;
        try {
            await Item.updateOne({ _id: id }, [{ $set: itemsParams }]);
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    deleteItem: async (req, res) => {
        const { id } = req.query;
        try {
            await Item.deleteOne({ _id: id });
            res.status(statusHttp.ok.status).json();
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },

    getItem: async (req, res) => {
        const { id } = req.query;
        try {
            if (id === undefined) {
                const items = await Item.find();
                res.json(items);
            } else {
                const item = await Item.findOne({ _id: id });
                res.json(item);
            }
        } catch (error) {
            console.log(error);
            res.status(statusHttp.internalServerError.status).json();
        }
    },
}