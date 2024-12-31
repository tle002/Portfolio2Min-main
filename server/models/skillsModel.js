const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  username: { 
      type: String, 
      required: true,
      ref: 'User'  
  },
  Languages: [{ type: String }],
  Tools: [{ type: String }],
  Databases: [{ type: String }],
  FrameworksAndLibraries: [{ type: String }],
}, { timestamps: true });

const skillsModel = mongoose.model('Skills', skillSchema);
module.exports = skillsModel;
