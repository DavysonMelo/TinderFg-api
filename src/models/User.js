const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    interest:{ 
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    }, 
    age: Number,
    photos: String,
    bio: String,
},{
    timestamps: true,
});

module.exports = model('User', UserSchema);