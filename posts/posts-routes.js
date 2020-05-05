
const express = require('express');
const router = express.Router();
const db = require('../data/db');

const commentRoutes = require('../comments/comments-routes.js');

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        db.insert(req.body)
            .then(id => {
                res.status(201).json({
                    id: id.id,
                    ...req.body
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.find()
        .then(posts => {
           // const post = posts.find(element => element.id = id)
            if (posts.find(element => element.id == id)) {
                db.findById(id)
                    .then(post => {
                        res.status(200).json(post[0])
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The post information could not be retrieved." })
                    })
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });

        })

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
            db.remove(id)
                .then(response => {
                    res.status(200).json({ posts_deleted: response})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "The post could not be removed" })
                })
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
})

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
           if(req.body.title && req.body.contents){
            db.update(id, req.body)
            .then(response =>{
                if(response == 1){
                    res.status(200).json({id: id, title: req.body.title, contents: req.body.contents})
                }
                else{
                    res.status(500).json({ error: "The post information could not be modified." })
                }

            })
           }
           else{
               res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
           }
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
})






})

module.exports = router;