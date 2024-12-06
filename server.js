const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'productive', filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file.');
            }
        });
    } else {
        res.status(404).send('File not found.');
    }
});


app.use(express.json()); 
app.post('/save-logs', (req, res) => {
    const logData = req.body;
    const userId = logData.user_id || 'unknown_user';
    const filePath = path.join(__dirname, 'User_data', `${userId}.json`);

    fs.writeFile(filePath, JSON.stringify(logData, null, 2), (err) => {
        if (err) {
            console.error('Error saving logs:', err);
            return res.status(500).send('Failed to save logs.');
        }
        res.status(200).send('Logs saved successfully.');
    });
});

const PORT = 8000; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
