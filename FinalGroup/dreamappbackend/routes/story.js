const express = require('express');
const Story = require('../models/story');
const router = express.Router();

// GET all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().populate('dreamId');
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new story
router.post('/', async (req, res) => {
  const { dreamId, content } = req.body;

  try {
    const newStory = new Story({ dreamId, content });
    const saved = await newStory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a story
router.delete('/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
