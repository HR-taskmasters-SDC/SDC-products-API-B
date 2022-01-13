const router = require('express').Router();
const {
    getProducts,
    getProduct,
    getStyles,
    getRelated,
    getCart,
} = require('./controllers.js')

router.get('/', getProducts)
router.get('/:product_id', getProduct)
router.get('/:product_id/styles', getStyles )
router.get('/:product_id/related', getRelated)
router.get('/cart', getCart)

module.exports = router;