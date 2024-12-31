const User = require("../models/authModel");
const Project = require("../models/projectModels");
const NodeCache = require('node-cache');
const { uploadOnCloudinary } = require("../utils/cloudinary");
const cache = new NodeCache({ stdTTL: 300 });

const addProject = async (req, res) => {
  const { title, description, techstack, githubRepo, liveLink, projectImage } = req.body;

  try {
    const username = req.user.username;
    const user = await User.findById(req.user.id).select('username');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    const cacheKey = `project_${username}`;
    cache.del(cacheKey);
    let projectLocalPath;

    if (
      req.files &&
      Array.isArray(req.files.projectImage) &&
      req.files.projectImage.length > 0
    ) {
      projectLocalPath = req.files.projectImage[0].path;
    }

    if (!projectLocalPath) {
      return res.status(400).json({
        success: false,
        message: 'Project image not found'
      });
    }

    const projectImageUploadOnCloudinary = await uploadOnCloudinary(projectLocalPath);

    if (!projectImageUploadOnCloudinary) {
      return res.status(400).json({
        success: false,
        message: 'Project image upload failed'
      });
    }
// console.log(`techstack: ${techstack}`);

    // Ensure techstack is always an array of strings
    let formattedTechstack;
    if (Array.isArray(techstack)) {
      // If it's already an array, use it as-is
      formattedTechstack = techstack;
    } else if (typeof techstack === "string") {
      // If it's a JSON string, parse it
      try {
        formattedTechstack = JSON.parse(techstack);
        // Ensure all elements are strings
        if (!Array.isArray(formattedTechstack)) {
          throw new Error("Parsed techstack is not an array");
        }
      } catch (err) {
        console.error("Error parsing techstack:", err);
        return res.status(400).json({
          success: false,
          message: "Invalid format for techstack"
        });
      }
    } else {
      // If none of the above, return an error
      return res.status(400).json({
        success: false,
        message: "Invalid format for techstack"
      });
    }

    const projectData = {
      title,
      description,
      techstack: formattedTechstack, // Use the formatted techstack
      githubRepo,
      liveLink,
      username: user.username,
      projectImage: projectImageUploadOnCloudinary || 'https://via.placeholder.com/300x300'
    };

    const project = new Project(projectData);
    const projectSavedData = await project.save();
    

    res.status(201).json({ message: 'Project created successfully', ProjectData: projectSavedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getProjects = async (req, res) => {
//   try {
//     const username = req.user.username;
//     // console.log(`Username: ${username}`);

//     if (!username) {
//       return res.status(400).json({
//         success: false,
//         message: 'Username parameter is missing'
//       });
//     }
//     const cacheKey = `project_${username}`;
//     const cachedData = cache.get(cacheKey);
//     if (cachedData) {
//       console.log('Serving from cache');
//       return res.status(200).json({
//         success: true,
//         data: cachedData
//       });
//     }
//     console.log('Serving from database');

//     const projects = await Project.find();
//     if (!projects || projects.length === 0) {
//       return res.status(404).json({ message: "Project record not found" });
//     }
//     const projectsObject = projects.map(project => project.toObject());

//     cache.set(cacheKey, projectsObject);

//     res.status(200).json({ success: true, data: projectsObject });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// get Projects for portfolio
const getProjects = async (req, res) => {
  try {
    const username = req.user?.username;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username parameter is missing",
      });
    }

    const cacheKey = `project_${username}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("Serving from cache");
      return res.status(200).json({
        success: true,
        data: cachedData,
      });
    }

    console.log("Serving from database");

    // Fetch user-specific projects
    const projects = await Project.find({ username });
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "Project record not found" });
    }

    const projectsObject = projects.map((project) => project.toObject());

    // Cache data with TTL
    cache.set(cacheKey, projectsObject, 300); // Cache for 300 seconds

    res.status(200).json({ success: true, data: projectsObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getProjectsForPortfolio = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username parameter is missing'
      });
    }

    const cacheKey = `project_${username}`;
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
    const projects = await Project.find({ username }).exec();
    console.log(`TTL Limited Expire thats why serving from database`);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "Projects record not found" });
    }

    // Map each experience document to an object
    const projectObjects = projects.map(pro => pro.toObject());

    // Cache the data
    cache.set(cacheKey, projectObjects);


    return res.status(200).json({ success: true, ProjectData: projectObjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Update a project
const updateProject = async (req, res) => {
  try {
    const { _id } = req.body;
    // console.log(`_id: ${JSON.stringify(req.body)}`);
    

    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const username = req.user.username;
    const cacheKey = `project_${username}`;
    cache.del(cacheKey);
    // Check if _id is provided in the request body
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Project ID (_id) is required"
      });
    }

    // Fetch the existing project using _id
    const existingProject = await Project.findOne({ _id });
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project record not found!"
      });
    }

    // Set up the update fields only if they're provided in the request body
    const updateFields = {};

    const fieldsToUpdate = ['title', 'description', 'techstack', 'githubRepo', 'liveLink'];
    fieldsToUpdate.forEach((field) => {
      const value = req.body[field];
      if (value !== undefined && value !== "undefined" && value !== "null") {
        updateFields[field] = value;
      }
    });
    // Handle image upload only if a new image is provided
    let projectLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.projectImage) &&
      req.files.projectImage.length > 0
    ) {
      projectLocalPath = req.files.projectImage[0].path;
      const projectImageUploadOnCloudinary = await uploadOnCloudinary(projectLocalPath);

      if (!projectImageUploadOnCloudinary) {
        return res.status(400).json({
          success: false,
          message: 'Project image upload failed'
        });
      }
      updateFields.projectImage = projectImageUploadOnCloudinary;
    }

    // Update the document only with the fields specified in `updateFields`
    // console.log(`updateFields: ${JSON.stringify(updateFields)}`);
    
    const updatedProject = await Project.findOneAndUpdate(
      { _id },
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
        select: '-__v'
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Failed to update project record"
      });
    }

    

    return res.status(200).json({
      success: true,
      message: "Project record updated successfully"
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message
    });
  }
};


// Delete a project
const deleteProject = async (req, res) => {

  try {
    const _id = req.body._id;
    const username = req.user.username;
    if (!_id) {
      return res.status(400).json({ message: 'Project ID (_id) is required' });
    }
    const deletedProject = await Project.findByIdAndDelete(_id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    const cacheKey = `project_${username}`;
    cache.del(cacheKey);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectsForPortfolio
};
