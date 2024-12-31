const User = require("../models/authModel");
const Experience = require("../models/experienceModel");
const mongoose = require("mongoose");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });
// Add new experience
const addExperience = async (req, res) => {
  try {
    const { companyAndRole, duration, responsibilities } = req.body;
    const username = req.user.username;
    // Validate that all required fields are present
    if (!companyAndRole || !duration || !responsibilities) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    cache.del(`exp_${username}`);
    // Fetch username from the User model
    const user = await User.findById(req.user.id).select('username');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    // Create the experience data with userId
    const experienceData = {
      companyAndRole,
      duration,
      responsibilities,
      username: user.username
    };
    // Save the experience
    const experience = new Experience(experienceData);
    const savedExperience = await experience.save();
    
    res.status(201).json({ message: "Experience added successfully", experienceData: savedExperience });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get experiences

const getExperiences = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const username = req.user.username;
    // console.log(`Username: ${username}`);

    const cacheKey = `exp_${username}`;
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
    const experiences = await Experience.find({ username: username });
    console.log(`TTL Limited Expire thats why serving from database`);

    if (!experiences || experiences.length === 0) {
      return res.status(404).json({ message: "Experience record not found" });
    }

    // Map each experience document to an object
    const expObjects = experiences.map(exp => exp.toObject());

    // Cache the data
    cache.set(cacheKey, expObjects);
    return res.status(200).json({ experienceData: expObjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get Experience for portfolio
const getExperienceForPortfolio = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username parameter is missing'
      });
    }

    const cacheKey = `exp_${username}`;
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
    const experiences = await Experience.find({ username }).exec();
    if (!experiences || experiences.length === 0) {
      return res.status(404).json({ message: "Experience record not found" });
    }

    // Map each experience document to an object
    const expObjects = experiences.map(exp => exp.toObject());

    // Cache the data
    cache.set(cacheKey, expObjects);


    return res.status(200).json({ experienceData: expObjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Update experience by ID
const updateExperience = async (req, res) => {
  try {
    const { _id } = req.body;

    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const username = req.user.username;
    // Clear cache for this username
    cache.del(`exp_${username}`);
    // Check if _id is provided in the request body
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Experience ID (_id) is required"
      });
    }

    // First, get the existing document
    const existingExperience = await Experience.findOne({
      _id
    });

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found!"
      });
    }

    // Create update object starting with existing values
    const updateFields = {
      companyAndRole: existingExperience.companyAndRole,
      duration: existingExperience.duration,
      responsibilities: existingExperience.responsibilities
    };

    // Only update the fields that are provided in the request


    if (req.body.companyAndRole !== "") {

      updateFields.companyAndRole = req.body.companyAndRole;

    }
    if (req.body.duration !== "") {


      updateFields.duration = req.body.duration;

    }
    if (req.body.responsibilities !== "") {

      updateFields.responsibilities = req.body.responsibilities;

    }


    // Update the document with merged values
    const updatedExperience = await Experience.findOneAndUpdate(
      {
        _id
      },
      { $set: updateFields },
      {
        new: true,
        runValidators: false,
        select: '-__v'
      }
    );

    if (!updatedExperience) {
      return res.status(404).json({
        success: false,
        message: "Failed to update experience"
      });
    }

    

    return res.status(200).json({
      success: true,
      message: "Experience record updated successfully",
      data: updatedExperience
    });

  } catch (error) {
    console.error('Error updating experience:', error);
    return res.status(500).json({
      success: false,
      message: "Error updating experience",
      error: error.message
    });
  }
};
// Delete experience by ID
const deleteExperience = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "Experience ID (_id) is required" });
    }
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
    const deletedExperience = await Experience.findByIdAndDelete({ _id }).exec();
    cache.del(`exp_${username}`);
    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience record not found" });
    }

    return res.status(200).json({ message: "Experience record deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExperience,
  getExperiences,
  getExperienceForPortfolio,
  updateExperience,
  deleteExperience,
};