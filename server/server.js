const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const newTagRouter = require('./routes/newTag.router')
//Route includes
const tagsRouter = require('./routes/tags.router');
const imagesRouter = require('./routes/images.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/tags', tagsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/images/addtag', newTagRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});