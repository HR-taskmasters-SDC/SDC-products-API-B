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
        
        //select all from styles but rename default_style to 'default?;
            //make an photos array consisting of photo objects with thumbnail_url and url
            //make a skus object consisting of objects with sku id, then a nested object with keys value and size
        

            // const queryStr = `SELECT id, product_id, name, original_price, sale_price, default_style "default?",
        //                     ((SELECT json_agg(json_build_obj("thumbnail_url": thumbnail_url, "url': url)) photos
        //                         FROM photos WHERE styles_id = $1),
        //                     (SELECT json_object_agg("id", json_build_obj("quantity": quantity, "size": size)) skus
        //                         FROM skus where styles_id = 1$)) results
        //                             FROM styles WHERE product_id = $1`;
        

        // const queryStr = `SELECT id, product_id, name, original_price, sale_price, default_style AS "default?"
	    //     FROM styles WHERE product_id = $1`;
        

        // const queryStr = `SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) photos
        //         FROM photos WHERE styles_id = $1`;
        

        // const queryStr = `SELECT json_object_agg( id, json_build_object('quantity', quantity, 'size', size))
        //          AS skus FROM skus WHERE styles_id = $1;`;
        

        // const queryStr = `SELECT json_agg(row_to_json(test)) FROM (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos, FROM photos WHERE styles_id = $1)test`;
    

        //     const queryStr = `SELECT json_agg(row_to_json(test)) FROM (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos,
    //     (SELECT json_object_agg(id, json_build_object('size', size, 'quantity', quantity)) 
    //     AS skus FROM skus WHERE styles_id = $1)
    //  FROM photos WHERE styles_id = $1)test;`;
      
    const queryStr = `SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?",
        (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url))
            AS photos FROM photos WHERE photos.styles_id = styles.id),
	    (SELECT json_object_agg( id, json_build_object('size', size, 'quantity', quantity)) 
            AS skus  FROM skus WHERE skus.styles_id = styles.id) 
                FROM styles WHERE product_id = $1`;


        return pool.query(queryStr, [id]);
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