const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');
const Thoughts = require("../models/thoughts");

//this route will get all users
router.get("/", async (req, res) => {
  const user = await User.find({});

  res.send(user);
});

//this route will get a single user by putting there name as a parameter in the url. 
//I decided to use usernames because it was easier to test and keep track of users by name than the long id string
// i used usernames in most of my routes where i could but the id is still present
router.get("/:userName", async (req, res) => {
  const singleUser = await User.findOne({}).where({
    userName: req.params.userName,
  });
 await singleUser.populate('thoughts')
 await singleUser.populate('friends')
  res.send(singleUser);
});

//this route will allow you to create a new user
router.post("/", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
  });
  await newUser.save();
  console.log(newUser);
  res.send(newUser);
});

//this route will allow you to update a user by putting their name as a parameter in the url
router.put("/:userName", async (req, res) => {
  const updateUser = await User.findOne({
    userName: req.params.userName,
  });
  updateUser.userName = req.body.userName;
  const updateUserInThoughts = await Thoughts.find({}).where({userName: req.params.userName})
  updateUserInThoughts.forEach(async function (thought) {
    thought.userName = req.body.userName
    await thought.save()});
  await updateUser.save();
  
  res.send(updateUser);
});

//this route will allow you to delete a user by putting their name as a parameter in the url
router.delete("/:userName", async (req, res) => {
  await User.deleteOne({
    userName: req.params.userName,
  });
  //this is the Bonus part of the assignment. It will delete all thoughts from the user when the user is deleted
   await Thoughts.deleteMany({}).where({userName: req.params.userName});
      
  res.send(`${req.params.userName} was deleted!`);
});

//this route will allow you to add a friend to a user by putting the users name as a parameter in the url and the friends name in the body
router.put("/:userName/friends", async (req, res) => {
  const befriendUser = await User.findOne({
    userName: req.params.userName,
  });
  const user = await User.findOne({userName: req.body.userName, email: req.body.email})
  const objectId = mongoose.Types.ObjectId(user._id)  
  befriendUser.friends.push(objectId) 
  await befriendUser.save();
  await befriendUser.populate("friends");
  res.send(befriendUser);
});

//this route will allow you to remove a friend from a user by putting the users name as a parameter in the url and the friends name in the body
router.put("/:userName/breakup", async (req, res) => {
  const removeFriend = await User.findOne({
    userName: req.params.userName,
  });
  let indexOfRemoveFriend = -1;
  const friendList = removeFriend.friends; 
  friendList.forEach(function (friend, index) {
      if (friend.userName === req.body.userName) {
          indexOfRemoveFriend = index;
      }
  });
  removeFriend.friends.splice(indexOfRemoveFriend, 1)
await removeFriend.save();

  res.send(`${req.body.userName} and ${req.params.userName} are no longer friends! T_T`);
});

module.exports = router;
