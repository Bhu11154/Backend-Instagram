const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    friends:{
        type:Array,
        default:[]
    }
  }
);

module.exports = mongoose.model('User', UserSchema)