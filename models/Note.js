const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String]
}, { timestamps: true }); // ⏱ createdAt и updatedAt

module.exports = mongoose.model('Note', noteSchema);
