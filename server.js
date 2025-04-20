const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к MongoDB Atlas
const mongoURI = 'mongodb+srv://admin:kurspass123@cluster0.ahkko0m.mongodb.net/zapiskikursaha?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('🚀 Сервер запущен на http://localhost:3000');
});
