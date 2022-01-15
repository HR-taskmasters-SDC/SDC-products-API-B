const router = require('express').Router();
const controller = require('./controller.js');

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getProduct);
router.get('/products/:product_id/styles', controller.getStyles);
router.get('/products/:product_id/related', controller.getRelated);
router.route('/cart')
 .get(controller.getCart)
 .post(controller.postCart);

module.exports = router;