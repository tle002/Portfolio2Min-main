const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  username: { type: String, required: true,ref: 'User'},
  projectImage: { type: String, default: 'https://via.placeholder.com/300x300' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  techstack: [{ type: String, required: true }],
  githubRepo: { type: String, default: '#' },
  liveLink: { type: String , default: '#' }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;