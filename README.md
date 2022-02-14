# SDC-products-API


## A scaled and tested RESTful API built to handle high traffic.





### Tech Used

NGINX | PostgreSQL | Express | Node.js | k6 | Loader.io | AWS EC2 

### Overview
  
Designed a postgreSQL and Express powered backend to produce a RESTful API with 10 million records.

### Optimitation Methods

Tested queries locally with k6 to identify bottlenecks. Then decreased local latency average from 4000ms to 50ms response time by utilizing custom database indexing and asynchronous server functionality.

Utilized NGINX least-connections load balancing and gzip compression across four EC2 server instances to scale up to 3000 rps for all endpoints, while maintaining an average latency of 80ms with 0% error rate.
