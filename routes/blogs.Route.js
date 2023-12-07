const express = require("express");
const { BlogsModel } = require("../models/blogs.Model");
const { auth } = require("../middlewares/auth.Middleware");

const blogsRouter = express.Router();
blogsRouter.use(auth)
//getting blogs route
blogsRouter.get("/blogs",async(req,res)=>{
    const query = req.query
    try {
        const blogs = await BlogsModel.find(query)
        res.status(200).json({msg:"Blogs",blogs})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

})
// post blogs
blogsRouter.post("/blogs",async(req,res)=>{
    try {
        const date = new Date()
        console.log("vk", date.toJSON())
        const blog = new BlogsModel({...req.body,date})
        await blog.save();
        res.status(200).json({msg:"Blog Posted Successful", blog})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

// Edit blogs
blogsRouter.patch("/blogs/:id",async(req,res)=>{
    const {id} =req.params;

    try {
        const blog = await BlogsModel.findOneAndUpdate({_id:id},{...req.body})
        res.status(200).json({msg:`Blog with Id ${id} is Updated Successful`})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

})
// Delete blogs
blogsRouter.delete("/blogs/:id",async(req,res)=>{
    const {id} =req.params;
    try {
        const blog = await BlogsModel.findOneAndDelete({_id:id})
        res.status(200).json({msg:`Blog with Id ${id} is Deleted Successful`})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//edit like
blogsRouter.patch("/blogs/:id/like",(req,res)=>{
    
})
// edit comments
blogsRouter.patch("/blogs/:id/comment",(req,res)=>{
    
})

module.exports={blogsRouter}