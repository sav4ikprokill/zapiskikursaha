const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// 📥 Получить все заметки
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении заметок' });
    }
});

// ➕ Добавить новую заметку
router.post('/', async (req, res) => {
    const { title, content, tags } = req.body;

    const note = new Note({
        title,
        content,
        tags
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: 'Ошибка при добавлении заметки' });
    }
});

// 🔍 Поиск по тегу
router.get('/search', async (req, res) => {
    const { tag } = req.query;

    try {
        const filteredNotes = await Note.find({ tags: tag });
        res.json(filteredNotes);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при поиске заметок' });
    }
});

module.exports = router;
