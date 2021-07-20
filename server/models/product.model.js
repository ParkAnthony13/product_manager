const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required:[true,"PRODUCT TITLE REQUIRED"],
        min: [3, "TITLE MUST BE AT LEAST 3 CHARACTERS"]
    },
    price: {
        type: Number,
        required:[true,"PRICE REQUIRED"],
        min: [0.01, "PRICE MUST BE EQUAL TO OR GREATER THAN $0"]
    },
    description: {
        type: String,
        required: [true,"DESCRIPTION IS REQUIRED"]
    }
}, {timestamps : true})

const Product = mongoose.model("ProductSchema", ProductSchema)
module.exports = Product