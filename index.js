const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.Route");
const { blogsRouter } = require("./routes/blogs.Route");

const app=express();

app.use(express.json());
app.use(cors());
app.use("/api",userRouter)
app.use("/api",blogsRouter)
app.get("",(req,res)=>{
    res.send("BACKEND IS RUNNING->>>")
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("DB is connected")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log(error);
    }
   
})