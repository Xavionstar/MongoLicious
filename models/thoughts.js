const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({    
    text: { type: String, required: true, minLength: 1, maxLength: 280},
    user: { type: String, ref: 'User', required: true  }
  });
const thoughtsSchema = new mongoose.Schema(
  {
    contentTitle: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      get: function (date) {
        return date ? date.toDateString() : "";
      },
    },
    updatedAt: {
      type: Date,
      get: function (date) {
        return date ? date.toDateString() : "";
      },
    },
    userName: {
      type: String,
      required: true,
      ref: "User",
    },
    reactions: [reactionSchema]
  },

);

  

const Thoughts = mongoose.model("Thoughts", thoughtsSchema);
module.exports = Thoughts;
