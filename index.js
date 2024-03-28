const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat=require("./models/chat");
const init=require("./init");
const methodovverride=require("method-override");

// Set up view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodovverride("_method"));


app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

const port = 3000;

app.get("/", (req, res) => {
    res.send("Working");
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
    res.redirect("/chats")
})

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newchat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    })

    newchat.save().then((res)=>{
        console.log("working");
    })
    res.redirect("/chats");
})

app.get("/chats/:id/edit" ,async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat})
})


app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true})
   
    console.log(updatedchat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedchat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
