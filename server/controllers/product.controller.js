const Product = require('../models/product.model')

module.exports.test = (req, res) => {
    res.json({
        message : "TEST MESSAGE FOR PRODUCT MANAGER"
    })
}

module.exports.getAllProducts = (req, res) => {
    Product.find()
        .then(allProducts => res.json({allProducts}))
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

module.exports.getOneProduct = (req, res) => {
    Product.findOne({_id:req.params.id})
        .then(oneProduct => res.json({product:oneProduct}))
        .catch(err => res.json({err}))
}

module.exports.updateProduct = (req,res) => {
    Product.findOneAndUpdate({_id:req.params.id},req.body, {new:true,runValidators:true})
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteProduct = (req,res) => {
    Product.deleteOne({_id:req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => response.json(err))
}