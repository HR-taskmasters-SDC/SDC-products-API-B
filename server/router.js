const router = require('express').Router();
const {
    getProducts,
    getProduct,
    getStyles,
    getRelated,
    getCart,
} = require('./controllers.js')

router.get('/products', getProducts)
router.get('/products/:product_id', getProduct)
router.get('/products/:product_id/styles', getStyles )
router.get('/products/:product_id/related', getRelated)
router.get('/cart', getCart)

module.exports = router;