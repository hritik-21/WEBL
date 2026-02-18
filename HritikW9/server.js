const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001; // Using a different port to avoid conflict with SrutiW9 if running

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// GET Static Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET Dynamic Form
app.get('/register', (req, res) => {
    res.render('register');
});

// POST Submission
app.post('/confirm', (req, res) => {
    const { project, type, notes } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmed | HritikW9</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="card">
                <h1>Application Submitted!</h1>
                <div class="success-box">
                    <div class="success-title">Reference: ${Math.floor(Math.random() * 1000000)}</div>
                    <p style="color: #10b981; margin-bottom: 0;">Project <strong>${project}</strong> has been queued for <strong>${type}</strong> integration.</p>
                </div>
                <p>Notes: ${notes || 'No additional requirements provided.'}</p>
                <a href="/" class="btn btn-primary">Back to Home</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 HritikW9 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Dashboard: http://localhost:${PORT}/`);
    console.log(`🔗 Enrollment: http://localhost:${PORT}/register`);
});
