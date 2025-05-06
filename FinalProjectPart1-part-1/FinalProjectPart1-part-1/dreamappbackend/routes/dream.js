const express = require('express');
const Dream = require('../models/dream');
const router = express.Router();

// GET all dreams
router.get('/', async (req, res) => {
  try {
    const dreams = await Dream.find();
    res.status(200).json(dreams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new dream
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newDream = new Dream({ title, description });
  try {
    const savedDream = await newDream.save();
    res.status(201).json(savedDream);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
