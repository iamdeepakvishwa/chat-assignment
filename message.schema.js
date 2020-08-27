const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        text: { type: String, required: true },
        from_user_id: { type: Schema.Types.ObjectId, ref: 'users' },
        to_user_id : { type: Schema.Types.ObjectId, ref: 'users' },
    }, {
    timestamps: true
})

const message = mongoose.model('message', schema);

module.exports = message;