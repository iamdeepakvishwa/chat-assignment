const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    mobileNumber : {
        type: Number,
        required :true,
        unique :true,
    },
    username : { 
        type: String ,
    }

},{
    timestamps :true,
})


const users = mongoose.model('users' ,schema);

module.exports = users ;