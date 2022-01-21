const pool = require('../database/index.js')

module.exports ={
    readProducts: (page = 1, count = 5) => {
        const values = [page * count - count, count]
        const queryStr = `SELECT * FROM products OFFSET $1 LIMIT $2`;
        return pool.query(queryStr, values);
    },

    readProduct: (id) => {
        const queryStr = `SELECT *, 
            (SELECT json_agg(json_build_object('feature', feature, 'value', value)) AS features
                FROM features WHERE product_id = $1)  
                    FROM products WHERE id = $1`;
        return pool.query(queryStr, [id])
    },
    
    readStyles: (id) => {
        const queryStr = `SELECT styles.id AS style_id, styles.name, styles.original_price, 
            	            styles.sale_price, styles.default_style AS "default?",
            
            	                (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url))
             	                    AS photos FROM photos WHERE photos.styles_id = styles.id),

            	                    (SELECT json_object_agg( id, json_build_object('size', size, 'quantity', quantity)) 
                	                    AS skus FROM skus WHERE skus.styles_id = styles.id)
                        FROM styles WHERE product_id = $1`;
        return pool.query(queryStr, [id]);
    },

    readRelated: (id) => {
        const queryStr = `SELECT json_agg(related_product_id) 
                                FROM related WHERE current_product_id = $1`;
        return pool.query(queryStr, [id]);
    },

    readCart: (user_session) => {
        const queryStr = `SELECT product_id AS sku_id, count
                                FROM cart WHERE user_session = $1 AND active = true`;
        return pool.query(queryStr, [user_session]);
    },


    addToCart: (user_session, sku_id) => {
        const queryStr = `INSERT INTO cart (user_session, product_id, active, count) 
                                VALUES ($1, $2, true, 1) ON CONFLICT DO NOTHING`;
        return pool.query(queryStr, [user_session, sku_id]);
    },
}