const mongoose = require("mongoose");
const opts = { timestamps: true, toJSON: { virtuals: true } };
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
    
    userName: {
      type: String,
      required: true,
      ref: "User",
    },
    reactions: [reactionSchema]
  },  opts
   
    
);
thoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
  

const Thoughts = mongoose.model("Thoughts", thoughtsSchema);
module.exports = Thoughts;
