const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const routes = require('./routes/routes');

const middleware = require('./auth/middleware')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
//app.use(middleware.checkTokenSetUser);

app.use('/',routes);


io.on('connection',(socket)=>{
    socket.on('send message',(sent_msg,callback)=>{
        io.emit('message',sent_msg);
        callback();
    })
    console.log('Another person connected');
})

const port = process.env.PORT || 5101;
app.listen(port ,()=>{
    console.log(`Server running at http://localhost:${port}`);
})