const express = require("express");
const router = express.Router();
const Thoughts = require("../models/thoughts");
const mongoose = require("mongoose");
const User = require("../models/user");

//this route will allow you to create a new thought and assign it to a user by putting the users name as a parameter in the url
//I again decided to so this by username because it made testing less confusing
router.post("/:userName", async (req, res) => {
  const newThoughts = new Thoughts({
    contentTitle: req.body.contentTitle,
    content: req.body.content,
    userName: req.params.userName,
  });
  await newThoughts.save();
  console.log(newThoughts);
  // I had to add functionality to get the object ID based on the username
  const user = await User.findOne({ userName: req.params.userName });
  if (user) {
    //this gathers up the new thought saved to the thought model and pushes it to the correct user thought array
    user.thoughts.push(mongoose.Types.ObjectId(newThoughts._id));
    await user.save();
  } else {
    console.log("user not found");
  }

  res.send(newThoughts);
});

//this route will allow you to get all thoughts from a user by putting the users name as a parameter in the url
router.get("/:userName", async (req, res) => {
  const userThoughts = await Thoughts.find({}).where({
    userName: req.params.userName,
  });
  res.send(userThoughts);
});

//this route will allow you to get all thoughts from all users
router.get("/", async (req, res) => {
  const allThoughts = await Thoughts.find({});
  res.send(allThoughts);
});

//this route will allow you to update a thought by putting the users name and the thought title as a parameter in the url and the new content in the body
// thought titles was not a required parameter but i added it to the model to make it easier to keep track of thoughts
// it was easier to test by adding a title to the thought than to use the id
router.put("/:userName/:contentTitle", async (req, res) => {
  const updateUserThoughts = await Thoughts.findOne({
    userName: req.params.userName,
    contentTitle: req.params.contentTitle,
  });

  updateUserThoughts.content = req.body.content;
  await updateUserThoughts.save();

  res.send(updateUserThoughts);
});

//this route will allow you to delete a thought by putting the users name and the thought title as a parameter in the url
// This route will also remove the thought from the user model using the splice method and the index of the thought in the array
router.delete("/:userName/:contentTitle", async (req, res) => {
  await Thoughts.deleteOne({ contentTitle: req.params.contentTitle }).where({
    userName: req.params.userName,
  });
  const removeThoughtFromUser = await User.findOne({
    userName: req.params.userName,
  });
  let indexOfRemoveThoughtFromUser = -1;
  const removeThought = removeThoughtFromUser.thoughts;
  removeThought.forEach(function (thought, index) {
    if (thought.contentTitle === req.params.contentTitle) {
      indexOfRemoveThoughtFromUser = index;
    }
  });
  removeThoughtFromUser.thoughts.splice(indexOfRemoveThoughtFromUser, 1);
  await removeThoughtFromUser.save();
  res.send(`${req.params.contentTitle} was deleted!`);
});

module.exports = router;
