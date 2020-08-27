const mongoose = require('mongoose');

const group = new mongoose.Schema({
    name : {
        type :String,
        required : true,
    },
    public: { 
        type: Boolean, 
        default: false 
    },
    admin_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
}, {
    timestamps: true
})

const groups = mongoose.model('groups',group);

module.exports = groups;