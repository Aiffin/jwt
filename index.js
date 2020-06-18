const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.get('/api',(req,res)=>{
    res.json({
        message:'welome api'
    })
});

app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
        res.sendStatus(403);
        }else{
            res.json({
                message:'post created',
                authData
            });
        }
    })
    
});

app.post('/api/login',(req,res)=>{
    const user ={
        id:1,
        username :'aif',
        email:'aif2dbbdv2'
    }
    jwt.sign(user,'secretkey',(err,token)=>{
        res.json({
            token
        })
    });
})
//FORMAT OF TOKEN
//AUTHORIZARTION:bearer <access_token>
//verify token
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader=req.headers['authorization'];
    //check if bearer is undefine
    if(typeof bearerHeader!='undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        next();

    } else {
        //forbiden
        res.sendStatus(403);
    }
}
app.listen(PORT,()=>console.log(`https server start at ${PORT}`));

