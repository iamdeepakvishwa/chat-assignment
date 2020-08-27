const {Router} = require('express');
const route = Router();
const mongoose = require('mongoose');

const Message = mongoose.model('Message',{ name : String, message : String})


route.get('/messages' ,(req,res)=>{
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
})

route.get('/messages/:userid',(req,res,next)=>{
    const id = req.params.userid;
    console.log(id);
    try{
        Message.find({name : id},(err,messages)=>{
            res.send(messages);
        })
    }catch (err){
        next(err);
    }
})

route.post('/messages',(req,res)=>{
    const message = new Message(req.body);
    message.save((err)=>{
        if(err)
            sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports = route;