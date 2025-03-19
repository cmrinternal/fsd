//import express for creating API's endpoints
const express=require("express");
const path=require("path");
const fs=require("fs");
const users=require("./database.json");
var database;
var token="wrong key";
//read database.json file
fs.readFile("database.json",function(error,data){
    //check for errors
    if(error) throw error;
    
    //converting to json
    database=JSON.parse(data);
});
//import jwt foe API's end points authentication
const jwt=require("jsonwebtoken");
const app=express();
//a port for serving API's
const port=3600;
//allow json data
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});
//login route
app.post('/auth',(req,res)=>{
    const name=req.body.name;
    console.log(name);
    const password=req.body.password;
    console.log(password);
    let isPresent=false;
    let isPresentIndex=null;
    for(let i=0;i<database.length;i++){
        if(database[i].name===name && database[i].password===password){
            isPresent=true;
            isPresentIndex=i;
            break;
        }
    }
    //if isPresent is true then create a token and pass to response
    if(isPresent){
        //the JWT.sign method are used to create token
        const token=jwt.sign(database[isPresentIndex],"secret");
        //pass the data or token in response
        res.json({
            login:true,
            token:token,
            data:database[isPresentIndex],
        });
    }
    else{
        //if isPresent is false return error
        res.json({
            login:false,
            token:token,
            error:"Please check name and password",
        });
    }
});
//verify route
app.post("/verifyToken",(req,res)=>{
    const token=req.body.token;
    //if token is present 
    if(token){
        //verify the token using jmt.verify method
        const decode=jwt.verify(token,"secret");
        //return response with decode the data
        res.json({
            login:true,
            data:decode,
        });
    }
    else{
        //return the response with error
        res.json({
            login:false,
            data:error,
        });
    }
});
app.post('/login',(req,res)=>{
    res.redirect("/login") 
});
app.listen(port,()=>{
    console.log(`Server is running:http://localhost:${port}/`);
});