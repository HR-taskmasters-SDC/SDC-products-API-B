const { readProducts,
  readProduct,
  readStyles,
  readRelated,
  readCart,
  addToCart } = require('./models.js');

const controller = {

  getProducts: (req, res) => {
    const { page, count } = req.query;
    readProducts(page, count)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  
  getProduct: (req, res) => {
    const { product_id } = req.params;
    readProduct(product_id)
    .then((results) => {
      results.rows[0];
      res.send(results.rows[0]);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getStyles: (req, res) => {
    const { product_id } = req.params;
    let data = {};
    data.product_id = product_id;
    data.results = [];
    readStyles(product_id)
      .then((results_query) => {
        data.results = results_query.rows;
        res.send(data);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getRelated: (req, res) => {
    const { product_id } = req.params;
    readRelated(product_id)
      .then((results) => {
        res.send(results.rows[0].json_agg);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getCart: (req, res) => {
    const { user_session } = req.query;
    readCart(user_session)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  postCart: (req, res) => {
    const { user_session, sku_id } = req.body
    addToCart(user_session, sku_id)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = controller;