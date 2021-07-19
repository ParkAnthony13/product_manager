const Product = require('../models/product.model')

module.exports.test = (req, res) => {
    res.json({
        message : "TEST MESSAGE FOR PRODUCT MANAGER"
    })
}

module.exports.getAllProducts = (req, res) => {
    Product.find()
        .then(allProducts => res.json({products: allProducts}))
        .catch(err => res.json({err}))
}

module.exports.createProduct = (req,res) => {
    Product.create(req.body)
        .then(newProduct => res.json({product: newProduct}))
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
            console.log({err})
        })
}