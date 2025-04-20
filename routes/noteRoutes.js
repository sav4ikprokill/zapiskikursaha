const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Заметка не найдена' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/notes', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/notes/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
      },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Заметка удалена' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
