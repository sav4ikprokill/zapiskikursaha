const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/notesdb')
  .then(() => console.log('✅ Успешное подключение к MongoDB'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('🚀 Сервер запущен на http://localhost:3000');
});
