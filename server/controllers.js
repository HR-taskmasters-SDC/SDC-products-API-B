const { readProducts,
  readProduct,
  readStyles,
  readRelated,
  readCart } = require('./models.js');

module.exports ={

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
        res.send(results.rows[0]);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getStyles: (req, res) => {
    const { product_id } = req.params;
    readStyles(product_id)
      .then((results) => {
        res.send(results);
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
        res.send(results.rows[0].array_agg);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getCart: (req, res) => {
    // const { sku_id } = req.params;
    readCart()
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  //postCart: () => {

  // }
}