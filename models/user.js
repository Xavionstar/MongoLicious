const mongoose = require('mongoose');
const Thoughts = require('./thoughts')

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
             unique: true,
             required: true,
            //  trimmed: Boolean
        },
        

        email : String,
        thoughts : {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Thoughts"
        },
        friends :{
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User",
        }
    });
   

const User = mongoose.model('User', userSchema);

module.exports = User;