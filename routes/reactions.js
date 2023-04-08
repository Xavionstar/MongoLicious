const express = require("express");
const router = express.Router();
const Thoughts = require("../models/thoughts");
const User = require("../models/user");

//this route will allow you to add a reaction to a thought by putting the username and the content title as a parameter in the url
//and the new reaction text and user in the body
// I did these as put routes because i was updating a subdocument array and not actually adding to or deleting from its own model
router.put("/:userName/:contentTitle", async (req, res) => {
  const userThought = await Thoughts.findOne({
    userName: req.params.userName,
    contentTitle: req.params.contentTitle,
  });

  const newReaction = {
    text: req.body.text,
    user: req.body.user,
  };

  userThought.reactions.push(newReaction);
  await userThought.save();
  console.log(newReaction);
  res.send(userThought);
});

//I did use the ID here to delete because giving comments titles felt silly
router.put("/:userName/:contentTitle/remove", async (req, res) => {
  const removeReaction = await Thoughts.findOne({
    userName: req.params.userName,
    contentTitle: req.params.contentTitle,
  });
 
  let indexOfRemoveReaction = -1;
  const reactionList = removeReaction.reactions;
  reactionList.forEach(function (reaction, index) {
    if (reaction._id === req.body._id) {
      indexOfRemoveReaction = index;
    }
  });

  removeReaction.reactions.splice(indexOfRemoveReaction, 1);
  await removeReaction.save();
  res.send(`The reaction to ${req.params.userName}'s ${req.params.contentTitle} thought was deleted!`);
});

module.exports = router;
