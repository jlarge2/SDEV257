const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  characters: {
    protagonist: String,
    antagonist: String,
    sideCharacters: String,
  },

  setting: {
    time: String,
    place: String,
    atmosphere: String,
  },

  plot: {
    beginning: String,
    middle: String,
    end: String,
  },

  climax: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dream = mongoose.model('Dream', dreamSchema);
module.exports = Dream;
