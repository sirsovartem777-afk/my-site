const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Раздаём статику (сам index.html)
app.use(express.static(__dirname));

// API: список файлов из папки tracks
app.get('/api/tracks', (req, res) => {
    const tracksDir = path.join(__dirname, 'tracks');
    if (!fs.existsSync(tracksDir)) {
        fs.mkdirSync(tracksDir);
        return res.json([]);
    }
    const files = fs.readdirSync(tracksDir).filter(f => /\.(mp3|wav|ogg|m4a|flac)$/i.test(f));
    res.json(files);
});

// Раздаём файлы из папки tracks
app.use('/tracks', express.static(path.join(__dirname, 'tracks')));

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    console.log(`📁 Папка с треками: ${path.join(__dirname, 'tracks')}`);
});