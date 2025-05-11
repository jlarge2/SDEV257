const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  dreamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dream', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', storySchema);
