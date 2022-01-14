const pool = require('../database/index.js')

module.exports ={
    readProducts: (page = 1, count = 5) => {
        const values = [page * count - count, count]
        const queryStr = `SELECT * FROM products OFFSET $1 LIMIT $2`;
        return pool.query(queryStr, values);
    },

    readProduct: (id) => {
        //read both a single product and build an array 
        //with its features as objects
        const queryStr = `SELECT *, 
            (SELECT json_agg(json_build_object('feature', feature, 'value', value)) 
                FROM features WHERE product_id = $1)  
                    FROM products WHERE id = $1`;
        return pool.query(queryStr, [id])
    },
    
    readStyles: (id) => {
        const queryStr = '';
    },

    readRelated: (id) => {
        const queryStr = `SELECT array_agg(related_product_id) 
                                FROM related WHERE current_product_id = $1`;
        return pool.query(queryStr, [id]);
    },

    readCart: () => {
        const queryStr = `SELECT product_id 
                                FROM cart WHERE active = true`;
        return pool.query(queryStr);
    },

    //addToCart: () => {

    //},
}