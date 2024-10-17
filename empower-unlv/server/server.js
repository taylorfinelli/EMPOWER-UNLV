import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Initialize admin user
let adminUser;

const initializeAdminUser = () => {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in the .env file.");
        process.exit(1); // Exit the process if variables are missing
    }

    adminUser = {
        username,
        passwordHash: bcrypt.hashSync(password, 10) // Hash the password
    };
};

// Initialize the admin user
initializeAdminUser();

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUser.username && bcrypt.compareSync(password, adminUser.passwordHash)) {
        const token = jwt.sign({ username }, process.env.VITE_JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }

    return res.status(401).send('Unauthorized');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
