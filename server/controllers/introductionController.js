const mongoose = require("mongoose");
const introductionModel = require("../models/introductionModel");
const NodeCache = require('node-cache');
const User = require("../models/authModel");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes


exports.createIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, about, location } = req.body;
        
        const socialLinks = JSON.parse(req.body.socialLinks);

        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Check if user exists
        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Handle image upload
        const imageLocalPath = req.files?.image[0]?.path;
        
        if (!imageLocalPath) {
            return res.status(400).json({
                success: false,
                message: 'Profile image not found'
            });
        }

        const ImageUploadOnCloudinary = await uploadOnCloudinary(imageLocalPath);
        if (!ImageUploadOnCloudinary) {
            return res.status(400).json({
                success: false,
                message: 'Profile image upload failed'
            });
        }


        // Create introduction data
        const introductionData = {
            userId,
            username: user.username,
            fullName,
            status,
            title,
            socialLinks,
            image: ImageUploadOnCloudinary,
            about,
            location
        };

        // Check if introduction already exists for this user
        const existingIntroduction = await introductionModel.findOne({ userId }).exec();
        if (existingIntroduction) {
            return res.status(400).json({
                success: false,
                message: 'Introduction already exists. Please update it instead.'
            });
        }

        // Save new introduction
        const introduction = new introductionModel(introductionData);
        const savedIntroduction = await introduction.save();

        return res.status(201).json({
            success: true,
            message: 'Introduction created successfully',
            data: savedIntroduction
        });
    } catch (error) {
        console.error('Error in createIntroduction:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            });
        }

        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate entry error'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating introduction',
            error: error.message
        });
    }
};

// Get introduction
exports.getIntroduction = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const cacheKey = `intro_${userId}`;
        // console.log(`Cache key: ${cacheKey}`);


        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        console.log(`Cached data: ${cachedData}`);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        // If not cached, fetch from the database
        const introduction = await introductionModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
        console.log(`TTL Limited Expire thats why serving from database`);

        // console.log(`Introduction: ${introduction}`);

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }
        // Convert Mongoose document to plain JavaScript object before caching
        const introObject = introduction.toObject();

        // Store the plain object introduction in cache
        cache.set(cacheKey, introObject);

        return res.status(200).json({
            success: true,
            data: introduction
        });
    } catch (error) {
        console.error('Error in getIntroduction:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching introduction',
            error: error.message
        });
    }
};
exports.getIntroductionForPortfolio = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username parameter is missing'
            });
        }

        const cacheKey = `intro_${username}`;
        console.log(`Cache key: ${cacheKey}`);

        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        console.log(`Cached data: ${cachedData}`);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        // If not cached, fetch from the database
        const introduction = await introductionModel.findOne({ username }).exec();
        console.log('Serving from database');

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        // Convert Mongoose document to plain JavaScript object before caching
        const introObject = introduction.toObject();

        // Store the plain object introduction in cache with a TTL
        cache.set(cacheKey, introObject);

        return res.status(200).json({
            success: true,
            data: introObject
        });
    } catch (error) {
        console.error('Error in getIntroductionForPortfolio:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching introduction',
            error: error.message
        });
    }
};

// Update introduction
exports.updateIntroduction = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Find user
        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        // Clear cache
        cache.del(`intro_${userId}`);
        cache.del(`intro_${user.username}`);
        // Find existing introduction first
        const existingIntroduction = await introductionModel.findOne({ userId }).exec();
        if (!existingIntroduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found. Please create one first.',
            });
        }

        // Handle image upload
        let updatedImage = null;
        if (req.files?.image) {
            const imageLocalPath = req.files.image[0]?.path;
            if (!imageLocalPath) {
                return res.status(400).json({
                    success: false,
                    message: 'Profile image not found',
                });
            }

            const imageUploadOnCloudinary = await uploadOnCloudinary(imageLocalPath);
            if (!imageUploadOnCloudinary) {
                return res.status(400).json({
                    success: false,
                    message: 'Profile image upload failed',
                });
            }

            updatedImage = imageUploadOnCloudinary;
        }

        // Start with existing values
        let updateData = {
            fullName: existingIntroduction.fullName,
            status: existingIntroduction.status,
            title: existingIntroduction.title,
            about: existingIntroduction.about,
            location: existingIntroduction.location,
            socialLinks: existingIntroduction.socialLinks,
            image: existingIntroduction.image
        };

        // Update only provided fields
        const bodyKeys = Object.keys(req.body);

        if (bodyKeys.includes('fullName')) updateData.fullName = req.body.fullName;
        if (bodyKeys.includes('status')) updateData.status = req.body.status;
        if (req.body.title !== "undefined") updateData.title = req.body.title;
        if (req.body.about !== "undefined") updateData.about = req.body.about;
        if (req.body.location !== "undefined") updateData.location = req.body.location;
        
        // Handle social links update
        if (bodyKeys.includes('socialLinks')) {
            try {
                const newSocialLinks = JSON.parse(req.body.socialLinks);
                updateData.socialLinks = {
                    ...existingIntroduction.socialLinks,
                    ...newSocialLinks
                };
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid social links format',
                });
            }
        }

        if (updatedImage) {
            updateData.image = updatedImage;
        }

        // Add updatedAt
        updateData.updatedAt = new Date();

        // Validate status enum if provided
        if (bodyKeys.includes('status') && !['#openToWork', 'Hire Me!', 'Open to Opportunity'].includes(updateData.status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value, Please provided correct status value.',
                validValues: ['#openToWork', 'Hire Me!', 'Open to Opportunity']
            });
        }

        // Update document with merged data
        const updatedIntroduction = await introductionModel.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { 
                new: true,
                runValidators: true
            }
        ).exec();

        

        return res.status(200).json({
            success: true,
            message: 'Introduction updated successfully',
            data: updatedIntroduction,
        });

    } catch (error) {
        console.error('Error in updateIntroduction:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error updating introduction',
            error: error.message,
        });
    }
};
// Delete introduction
exports.deleteIntroduction = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const cacheKey = `intro_${userId}`;
        const username = req.user.username;
        // Find and delete the introduction
        const deletedIntroduction = await introductionModel.findOneAndDelete({ userId: new mongoose.Types.ObjectId(userId) });

        if (!deletedIntroduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        // Remove the introduction from the cache if it exists
        cache.del(cacheKey);
        cache.del(`intro_${username}`);

        return res.status(200).json({
            success: true,
            message: 'Introduction deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteIntroduction:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting introduction',
            error: error.message
        });
    }
};


