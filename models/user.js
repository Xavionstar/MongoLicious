const mongoose = require('mongoose');
const Thoughts = require('./thoughts')
const opts = { toJSON: { virtuals: true } };
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
             unique: true,
             required: true,
            //  trimmed: Boolean
        },
        

        email : {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },

        thoughts : {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Thoughts"
        },
        friends :{
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User",
        }
       
    }, 
    opts
    );
    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
      });

const User = mongoose.model('User', userSchema);

module.exports = User;