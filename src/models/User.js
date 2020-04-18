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
        required: true,
        select: false
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
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    matches: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
},{
    timestamps: true,
});

module.exports = model('User', UserSchema);