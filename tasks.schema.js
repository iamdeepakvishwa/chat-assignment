const mongoose = require('mongoose');
const groups = require('./Groups.schema');
const { time } = require('console');
const users = require('./users.schema');
const { model } = require('./users.schema');


const schema = new mongoose.model({
    group_id : {
        type : Schema.Types.ObjectId,
        ref : groups,
    },
    timeAllotted : {
        type: time,
    },
    assignedTo : {
        type : Schema.Types.ObjectId,
        ref : users,
    },
    assignedBy : {
        type : Schema.Types.ObjectId,
        ref : users,
    },
    description : {
        type: text ,
        requires :true,
    },
})

const tasks = mongoose.model('tasks' ,schema);

module.exports = tasks;