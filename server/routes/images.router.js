const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    // return all categories
    const queryText =   
    `SELECT "images".id, "title", "path", "name" FROM "images"
    JOIN "image_tags" ON "images".id = "image_tags".images_id
    JOIN "tags" ON "tags".id = "image_tags".tags_id;`;
    pool.query(queryText)
        .then( (result) => {
            console.log('Response from GET images route:', result);
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});



module.exports = router;
