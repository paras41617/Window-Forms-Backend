import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;
const dbPath = './db.json';

app.use(bodyParser.json());

interface Submission {
    index:string
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

// Initialize db.json if it doesn't exist or is invalid
try {
    if (!fs.existsSync(dbPath) || !Array.isArray(JSON.parse(fs.readFileSync(dbPath, 'utf8')))) {
        fs.writeFileSync(dbPath, JSON.stringify([]));
    }
} catch (error) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
}

// Ping endpoint
app.get('/ping', (req, res) => {
    res.send(true);
});

// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    submissions.push({ name, email, phone, github_link, stopwatch_time });
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
    res.send({ success: true });
});

// Read endpoint
app.get('/read', (req, res) => {
    const { index } = req.query;

    // Validate index
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send({ error: 'Invalid or missing index' });
    }

    const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const idx = parseInt(String(index), 10);

    if (idx >= 0 && idx < submissions.length) {
        const response = { 
            form: submissions[idx], 
            totalForms: submissions.length 
        }
        res.send(response);
    } else {
        res.status(404).send({ error: 'Index out of range' });
    }
});

// Delete endpoint
app.delete('/delete', (req, res) => {

    const { index } = req.query;

    // Validate index
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send({ error: 'Invalid or missing index' });
    }

    const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const idx = parseInt(index as string, 10);

    if (idx >= 0 && idx < submissions.length) {
        submissions.splice(idx, 1);
        fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
        res.send({ success: true });
    } else {
        res.status(404).send({ error: 'Index out of range' });
    }
});

// Edit endpoint
app.put('/edit', (req, res) => {
    const { index, name, email, phone, github_link } = req.body;

    // Validate index
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send({ error: 'Invalid or missing index' });
    }

    const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const idx = parseInt(index, 10);

    if (idx >= 0 && idx < submissions.length) {
        const submission = submissions[idx];

        // Update only provided fields
        if (name !== undefined) submission.name = name;
        if (email !== undefined) submission.email = email;
        if (phone !== undefined) submission.phone = phone;
        if (github_link !== undefined) submission.github_link = github_link;

        fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
        res.send({ success: true });
    } else {
        res.status(404).send({ error: 'Index out of range' });
    }
});

// Search endpoint by email
app.get('/search', (req, res) => {
    const { email } = req.query;

    // Validate email
    if (!email || typeof email !== 'string') {
        return res.status(400).send({ error: 'Invalid or missing email parameter' });
    }

    const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const filteredSubmissions = submissions
        .map((submission, index) => ({ submission, index })) // Map each submission to include its index
        .filter(item => item.submission.email === email); // Filter by email

    res.send(filteredSubmissions);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
