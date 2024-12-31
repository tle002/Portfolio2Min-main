const mongoose = require("mongoose");
const User = require("../models/authModel");
const skillsModel = require("../models/skillsModel");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });

const addSkill = async (req, res) => {

  try {
    const {Languages, Tools, Databases, FrameworksAndLibraries} = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    const username = req.user.username;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    cache.del(`skill_${userId}`);
    cache.del(`skill_${username}`);
    const user = await User.findById(userId).select('username');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const skillsData = {
      Languages,
      Tools,
      Databases,
      FrameworksAndLibraries,
      username: user.username,
      userId: userId
    };

    const existingSkill = await skillsModel.findOne({ userId: userId });
    // console.log(`existingSkill: ${existingSkill}`);
    
    if (existingSkill) {
      return res.status(400).json({ message: "Skills already exists. Please update it instead." });
    }

    const skills = new skillsModel(skillsData);
    const savedSkills = await skills.save();
    res.status(201).json({ message: 'Skill added successfully', skillsData: savedSkills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skills
const getSkills = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const userId = req.user.id;
    const cacheKey = `skill_${userId}`;
    // console.log(`Cache key: ${cacheKey}`);
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Serving from cache');
      return res.status(200).json({
        success: true,
        data: cachedData
      });
    }

    console.log(`Serving from database`)
    const skills = await skillsModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
    if (!skills) {
      return res.status(404).json({ message: "Skills record not found" });
  }

  const skillsObject = skills.toObject();

  cache.set(cacheKey, skillsObject);
  return res.status(200).json({ skillsData:skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skills for portfolio
const getSkillsForPortfolio = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
        return res.status(400).json({
            success: false,
            message: 'Username parameter is missing'
        });
    }

    const cacheKey = `skill_${username}`;
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
    const skill = await skillsModel.findOne({ username }).exec();
    console.log(`TTL Limited Expire thats why serving from database`);

    if (!skill) {
        return res.status(404).json({ message: "Skills record not found" });
    }

    const skillObject = skill.toObject();

    cache.set(cacheKey, skillObject);

    
    return res.status(200).json({ skillData:skillObject});
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}
// Update a skill in a specific category
const updateSkill = async (req, res) => {
  try {
    const {Languages, Tools, Databases, FrameworksAndLibraries} = req.body;
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
    cache.del(`skill_${userId}`);
    cache.del(`skill_${username}`);
    const skill = await skillsModel.findOneAndUpdate(
        { userId: userId }, 
        {Languages, Tools, Databases, FrameworksAndLibraries},
        { new: true, runValidators: true }
    ).exec();
    
    
    if (!skill) {
        return res.status(404).json({ message: "Skills record not found" });
    }
    
    return res.status(200).json({ message: "Skills record updated", skillsUpdated:skill });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
};

const deleteSkill = async (req, res) => {
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
   const deletedSkill = await skillsModel.findOneAndDelete({ userId: userId }).exec();
   cache.del(`skill_${userId}`);
   cache.del(`skill_${username}`);
   if (!deletedSkill) {
       return res.status(404).json({ message: "Skills record not found" });
   }

   return res.status(200).json({ message: "Skills record deleted" });
} catch (error) {
   return res.status(500).json({ message: error.message });
}
};

module.exports = { addSkill, getSkills, getSkillsForPortfolio,updateSkill, deleteSkill };