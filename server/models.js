const pool = require('../database/index.js')

module.exports ={
    readProducts: (page = 1, count = 5) => {
        const queryString = 'SELECT * FROM products WHERE ';
    },

    readProduct: (id) => {
        const queryString = '';
    },
    
    readStyles: (id) => {
        const queryString = '';
    },

    readRelated: (id) => {
        const queryString = `SELECT ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = $1`;
        return pool.query(queryString, [id])
    },

    readCart: () => {
        const queryString = '';
    },
    
    //addToCart: () => {

    //},
}