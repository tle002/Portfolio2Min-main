const User = require("../models/authModel");
const Education = require("../models/educationModel");
const mongoose = require("mongoose");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });
// Create a new Education record
const addEducation = async (req, res) => {
    try {
        const { collegeName, branchName, passoutYear } = req.body;

        if (!collegeName || !branchName || !passoutYear) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Fetch username from the User model
        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const educationData = {
            collegeName,
            branchName,
            passoutYear,
            username: user.username,
            userId: userId
        }

        const existingEduaction = await Education.findOne({ userId: userId });
        if (existingEduaction) {
            return res.status(400).json({ message: "Education record already exists. Please update it instead." });
        }
        const education = new Education(educationData);
        const savedEducation = await education.save();
        return res.status(201).json({ message: "Education record created", educationData: savedEducation });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Education
const getEducation = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const cacheKey = `edu_${userId}`;
        // console.log(`Cache key: ${cacheKey}`);
        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        // console.log(`Cached data: ${cachedData}`);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }
         // If not cached, fetch from the database
         const education = await Education.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
         console.log(`TTL Limited Expire thats why serving from database`);
         

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        const eduObject = education.toObject();

        cache.set(cacheKey, eduObject);
        return res.status(200).json({ educationData:education });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// get Education for portfolio
const getEducationForPortfolio = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username parameter is missing'
            });
        }

        const cacheKey = `edu_${username}`;
        // console.log(`Cache key: ${cacheKey}`);
        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        // If not cached, fetch from the database
        const education = await Education.findOne({ username }).exec();
        console.log(`TTL Limited Expire thats why serving from database`);

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        const eduObject = education.toObject();

        cache.set(cacheKey, eduObject);

        
        return res.status(200).json({ educationData:eduObject});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
// Update an Education record
const updateEducation = async (req, res) => {
    try {
        const { collegeName, branchName, passoutYear } = req.body;
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        const username = req.user.username;
        // console.log(`Username: ${username}`);
        

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username parameter is missing'
            });
        }
        const userId = new mongoose.Types.ObjectId(req.user.id);
        // console.log(`User ID: ${userId}`);
        cache.del(`edu_${userId}`);
        cache.del(`edu_${username}`);
        const education = await Education.findOneAndUpdate(
            { userId: userId }, 
            { collegeName, branchName, passoutYear },
            { new: true, runValidators: true }
        ).exec();
        
        
        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }
        
        return res.status(200).json({ message: "Education record updated", educationUpdated:education });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete an Education record
const deleteEducation = async (req, res) => {
    try {
         
         if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        const username = req.user.username;
        
        

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username parameter is missing'
            });
        }
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const deletedEducation = await Education.findOneAndDelete({ userId: userId }).exec();
        cache.del(`edu_${userId}`);
        cache.del(`edu_${username}`);
        if (!deletedEducation) {
            return res.status(404).json({ message: "Education record not found" });
        }

        return res.status(200).json({ message: "Education record deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addEducation, getEducation, getEducationForPortfolio,updateEducation, deleteEducation };
