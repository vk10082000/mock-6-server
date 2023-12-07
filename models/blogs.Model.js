const mongoose=require("mongoose");

const blogsSchema = mongoose.Schema({
    username:String,
    title:String,
    category:String,
    data:String,
    likes:String,
    comments:{type:[{}]}
},
{
    versionKey:false
})

const BlogsModel = mongoose.model("blog",blogsSchema)
module.exports={BlogsModel}