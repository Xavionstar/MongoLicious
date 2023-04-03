const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
  const user = await User.find({});

  res.send(user);
});

router.get("/:userName", async (req, res) => {
  const singleUser = await User.findOne({}).where({
    userName: req.params.userName,
  });
 await singleUser.populate('thoughts')
 await singleUser.populate('friends')
  res.send(singleUser);
});

router.post("/", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
  });
  await newUser.save();
  console.log(newUser);
  res.send(newUser);
});

router.put("/:userName", async (req, res) => {
  const updateUser = await User.findOne({
    userName: req.params.userName,
  });
  updateUser.userName = req.body.userName;
  await updateUser.save();
  res.send(updateUser);
});

router.delete("/:userName", async (req, res) => {
  await User.deleteOne({
    userName: req.params.userName,
  });
  res.send(`${req.params.userName} was deleted!`);
});

router.put("/:userName/friends", async (req, res) => {
  const befriendUser = await User.findOne({
    userName: req.params.userName,
  });
  const user = await User.findOne({userName: req.body.userName})
  const objectId = mongoose.Types.ObjectId(user._id)
  
  befriendUser.friends.push(objectId) 
  await befriendUser.save();
  await befriendUser.populate("friends");
  res.send(befriendUser);
});

router.put("/:userName/breakup", async (req, res) => {
  const removeFriend = await User.findOne({
    userName: req.params.userName,
  });
  let indexOfRemoveFriend = -1;
  const friends = removeFriend.friends; 
  friends.forEach(function (friend, index) {
      if (friend.userName === req.body.userName) {
          indexOfRemoveFriend = index;
      }
  });
  removeFriend.friends.splice(indexOfRemoveFriend, 1)
await removeFriend.save();

  res.send(`${req.body.userName} and ${req.params.userName} are no longer friends! T_T`);
});

module.exports = router;
