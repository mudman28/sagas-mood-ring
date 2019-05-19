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

router.post('/', (req, res) => {
    const queryText = `
      INSERT INTO "image_tags"  ("images_id", "tags_id")
      VALUES ($1), ($2);
    `
    pool.query(queryText, req.body)
    .then((result) => {
      console.log('Response from POST image_tags route:', result);
      res.sendStatus(201);
    }).catch((error) => {
      console.log('Error in POST image_tags route:', error);
      res.sendStatus(500);
    })
  });

module.exports = router;
