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
     let { tag, post, color } = req.body.body;
     saveTheData(tag, post, color, res);
})

app.get('/post', (req,res) => {
    let tag = req.query.tag;
    getTheData(tag, res);

})

app.get('/delete', (req,res) => {
    let itemId = req.query.itemId;

    deleteItem(itemId, res);
})


function deleteItem(itemId, res) {
    Post.findByIdAndRemove(itemId, (err, item) => {
        if (err) return res.status(500).json({
            msg : 'Operation Failed',
            err : err
        });
        const response = {
            msg: "Item successfully deleted",
            id: item._id
        };
        return res.status(200).send(response);
    });
}


function getTheData(tag, res) {
    Post.find({tag : tag})
        .then(post => res.status(200).json(post))
        .catch(err => res.json({
            msg : 'Operation Failed',
            err : err,
        }));
}

function saveTheData(tag, post, color, res) {
    Post.create({
        tag : tag,
        post : post,
        color : color
    }).then(response => res.status(200).json({
        msg : 'Your post was successfuly saved !'
    })).catch(err => res.status(404).json({
        err : err,
        msg : 'Operation Failed'
    }))
}

