const pool = require('../database/index.js')

module.exports ={
    readProducts: (page = 1, count = 5) => {
        const values = [page * count - count, count]
        const queryStr = `SELECT * FROM products 
                            OFFSET $1 LIMIT $2`;

        return pool.query(queryStr, values);
    },

    readProduct: (id) => {
        const queryStr = '';
    },
    
    readStyles: (id) => {
        const queryStr = '';
    },

    readRelated: (id) => {
        const queryStr = `SELECT ARRAY_AGG(related_product_id) 
                                FROM related 
                                    WHERE current_product_id = $1`;
        return pool.query(queryStr, [id]);
    },

    readCart: () => {
        const queryStr = `SELECT product_id 
                                FROM cart 
                                    WHERE active = true`;
        return pool.query(queryStr);
    },

    //addToCart: () => {

    //},
}