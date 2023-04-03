const express = require('express');
const router = express.Router();
const Thoughts = require('../models/thoughts')
const User = require('../models/user')
const mongoose = require('mongoose');

router.put('/:userName/:contentTitle', async (req, res) => {
   
    const userThought = await Thoughts.findOne({
        userName : req.params.userName,
        contentTitle: req.params.contentTitle
    });   
    
    const newReaction = {
        text: req.body.text,
        user: req.body.user
    };
    
    userThought.reactions.push(newReaction);
    await userThought.save()
    console.log(newReaction)
    res.send(newReaction)
});

module.exports = router;