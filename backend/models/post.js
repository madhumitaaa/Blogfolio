const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({

    title:String,
    content:String,
    slug:{type:String,unique:true},
},
{
    timestamps:true

});
module.exports = mongoose.model('Post', postSchema);