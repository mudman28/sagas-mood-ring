const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.post('/addtag', (req, res) => {
    const queryText = `
      INSERT INTO "image_tags"  ("images_id", "tags_id")
      VALUES ($1), ($2);
    `
    pool.query(queryText, req.body.image_id, req.body.tags_id)
    .then((result) => {
      console.log('Response from POST image_tags route:', result);
      res.sendStatus(201);
    }).catch((error) => {
      console.log('Error in POST image_tags route:', error);
      res.sendStatus(500);
    })
  });


module.exports = router;