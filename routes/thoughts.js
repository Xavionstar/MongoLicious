const express = require('express');
const router = express.Router();
const Thoughts = require('../models/thoughts')
const mongoose = require('mongoose');
const User = require("../models/user");
//  let date = new Date();

router.post('/:userName', async (req, res) => {
   
    const newThoughts = new Thoughts({
        contentTitle: req.body.contentTitle,
        content : req.body.content,
        createdAt: Date.now(),        
        userName: req.params.userName        
    })
    await newThoughts.save()
    console.log(newThoughts)

    const user = await User.findOne({userName: req.params.userName});
    if (user) {
        user.thoughts.push(mongoose.Types.ObjectId(newThoughts._id));
        await user.save();
    } else {
        console.log("user not found");
    }
   

    res.send(newThoughts)
})

router.get('/:userName', async (req, res) =>  {
    const userThoughts = await Thoughts.find({}).where({
        userName: req.params.userName
    })
    res.send(userThoughts);
  });

  router.put('/:userName/:contentTitle', async (req, res) =>  {
    const updateUserThoughts = await Thoughts.findOne({
        userName : req.params.userName,
        contentTitle: req.params.contentTitle
    });
    updateUserThoughts.updatedAt = Date.now();
    updateUserThoughts.content = req.body.content;
    await updateUserThoughts.save()
    console.log(updateUserThoughts.updatedAt)
    res.send(updateUserThoughts);
  });

  router.delete('/:userName/:contentTitle', async (req, res) =>  {   
    await Thoughts.deleteOne({contentTitle: req.params.contentTitle})
    .where({userName: req.params.userName,})
       res.send(`${req.params.contentTitle} was deleted!`);
    });

  


module.exports = router;