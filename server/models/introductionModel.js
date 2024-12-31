const mongoose = require('mongoose');
const introductionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    username: { 
        type: String, 
        required: true,
        ref: 'User'  
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [3, 'Full name must be at least 3 characters long'],
    },
    status: {
        type: String,
        enum: ['#openToWork', 'Hire Me!', 'Open to Opportunity'],
        required: [true, 'Status is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minlength: [3, 'Location must be at least 3 characters long']
    },
    socialLinks: {
        gmail: {
            type: String,
            required: [true, 'Gmail is required'],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: 'Please enter a valid Gmail address'
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: 'Phone number must be 10 digits'
            }
        },
        github: String,
        linkedin: String,
        twitter: String
    },
    image: {
        type: String,
        required: true
    },
    about:{
        type: String,
        required: [true, 'About is required'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Introduction', introductionSchema);
