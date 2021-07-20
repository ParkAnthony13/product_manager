const productController = require("../controllers/product.controller")

module.exports = app => {
    app.get("/api/test",productController.test)
    app.get("/api/products",productController.getAllProducts)
    app.post("/api/products",productController.createProduct)
    app.get("/api/products/:id",productController.getOneProduct)
    app.put("/api/products/:id",productController.updateProduct)
    app.delete('/api/products/:id',productController.deleteProduct)
}
