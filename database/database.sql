CREATE DATABASE products_db;
\c products_db

CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS related(
  id SERIAL PRIMARY KEY NOT NULL,
  current_product_id INT REFERENCES products(id),
  related_product_id INT NOT NULL
);
CREATE TABLE IF NOT EXISTS features(
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT REFERENCES products(id),
  feature VARCHAR NOT NULL,
  value VARCHAR
);
CREATE TABLE IF NOT EXISTS styles(
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT REFERENCES products(id),
  name VARCHAR NOT NULL,
  sale_price VARCHAR,
  original_price VARCHAR NOT NULL,
  default_style BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS photos(
  id SERIAL PRIMARY KEY NOT NULL,
  styles_id INT REFERENCES styles(id),
  url VARCHAR NOT NULL,
  thumbnail_url VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS skus(
  id SERIAL PRIMARY KEY NOT NULL,
  styles_id INT REFERENCES styles(id),
  size VARCHAR  NOT NULL,
  quantity INT NOT NULL
);
CREATE TABLE IF NOT EXISTS cart(
  id SERIAL PRIMARY KEY NOT NULL,
  user_session INT NOT NULL,
  product_id INT REFERENCES products(id),
  active BOOLEAN NOT NULL,
  count INT 
);

-- TRUNCATE TABLE products, related, features, styles, photos, skus, cart;
-- TRUNCATE TABLE cart;

-- COPY products FROM '/Users/benpintel/lax48/SDC-data/product.csv' DELIMITERS ',' CSV HEADER;
-- COPY related FROM '/Users/benpintel/lax48/SDC-data/related.csv' DELIMITERS ',' CSV HEADER;
-- COPY features FROM '/Users/benpintel/lax48/SDC-data/features.csv' DELIMITERS ',' CSV HEADER;
-- COPY styles FROM '/Users/benpintel/lax48/SDC-data/styles.csv' DELIMITERS ',' CSV HEADER;
-- COPY photos FROM '/Users/benpintel/lax48/SDC-data/photos.csv' DELIMITERS ',' CSV HEADER;
-- COPY skus FROM '/Users/benpintel/lax48/SDC-data/skus.csv' DELIMITERS ',' CSV HEADER;
COPY cart FROM '/Users/benpintel/lax48/SDC-data/cart.csv' DELIMITERS ',' CSV HEADER;

-- CREATE INDEX idx_features_productId ON features(product_id);
-- CREATE INDEX idx_related_currentID ON related(current_product_id);
-- CREATE INDEX idx_related_realtedID ON related(related_product_id);
-- CREATE INDEX idx_photos_styles ON photos(styles_id);
-- CREATE INDEX idx_skus_styles ON skus(styles_id);
-- CREATE INDEX idx_styles_productId ON styles(product_id);
CREATE INDEX idx_cart_productId ON cart(product_id);
CREATE INDEX idx_cart_userSession ON cart(user_session);


-- UPDATE features SET value = NULL WHERE value = 'null';
-- UPDATE styles SET sale_price = NULL WHERE sale_price = 'null';