const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    }
  },
  {timestamps:true}
);

module.exports = mongoose.model('Post', PostSchema)
