
const express = require('express');
const router = express.Router();
const db = require('../data/db');
router.use(require('express').json());


const commentRoutes = require('../comments/comments-routes.js');

router.get('/', (req, res) => {
    console.log(req.body)
    db.find()
    .then(posts =>{
        res.status(200).json(posts);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
  });

router.post('/', (req, res)=>{
    console.log(req.body)
    if(req.body.title && req.body.contents){
        db.insert(req.body)
        .then(post =>{
            res.status(201).json(post);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
    else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

  module.exports = router;