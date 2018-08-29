const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const app = express();
const Post = require('./models/Post');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// DB config 
require('./config/database')(config);


// Setting up the server 
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT} ...`)
})


// Routes 
app.post('/', (req,res) => {
     let { tag, post } = req.body.body;
     saveTheData(tag, post, res)
})

app.get('/post', (req,res) => {
    let tag = req.query.tag;
    getTheData(tag, res);

})



function getTheData(tag, res) {
    Post.find({tag : tag})
        .then(post => res.status(200).json(post))
        .catch(err => res.json({
            msg : 'Operation Failed',
            err : err,
        }));
}

function saveTheData(tag, post, res) {
    Post.create({
        tag : tag,
        post : post
    }).then(response => res.status(200).json({
        msg : 'Your post was successfuly saved !'
    })).catch(err => res.status(404).json({
        err : err,
        msg : 'Operation Failed'
    }))
}

