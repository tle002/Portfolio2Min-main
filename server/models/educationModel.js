const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    username: { 
        type: String, 
        required: true,
        ref: 'User'  
    },
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    passoutYear: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
