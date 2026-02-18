const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse POST request data
app.use(express.urlencoded({ extended: true }));

// GET route for the home page (static)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET route for the form (dynamic)
app.get('/form', (req, res) => {
    res.render('form');
});

// POST route to handle form submission
app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Success | SrutiW9</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Thank you, ${name}! ✨</h1>
                <div class="success-card">
                    <p>We received your message:</p>
                    <p style="font-style: italic; font-weight: 500;">"${message}"</p>
                </div>
                <div style="margin-top: 2rem;">
                    <a href="/" class="btn">Back Home</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✨ Server is running on http://localhost:${PORT}`);
    console.log(`🌸 Static page: http://localhost:${PORT}/`);
    console.log(`🌸 Dynamic form: http://localhost:${PORT}/form`);
});
