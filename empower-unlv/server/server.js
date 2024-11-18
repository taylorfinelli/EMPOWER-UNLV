import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import BetterSqlite3 from 'better-sqlite3';
import fetch from 'node-fetch'
import iso_3166_1 from 'iso-3166-1';
import iso_3166_2 from 'iso-3166-2';

dotenv.config(); // Load environment variables from .env file

const app = express();
const TLS_CERT_PATH = process.env.TLS_CERT_PATH;
const TLS_KEY_PATH = process.env.TLS_KEY_PATH;
const PORT = process.env.EXPRESS_PORT || 3000;

const DB_PATH = process.env.DB_PATH;
const IPINFO_API_KEY = process.env.IPINFO_API_KEY;
const db = new BetterSqlite3(DB_PATH);

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route

app.get('/', async (req, res) => {
    // Get the client's IP address
    const ipAddress = req.ip;
    
    // Query the database to check if this IP is in the UniqueVisitors table
    const result = db.prepare("SELECT * FROM UniqueVisitors WHERE ip_address = ?").all(ipAddress);
    
    // If no record is found for this IP address, fetch & process geolocation data
    if (result.length === 0) {
        try {
            const today = new Date().toISOString().slice(0, 10);
            const geoResponse = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${IPINFO_API_KEY}`);
            if (!geoResponse.ok) {
                throw new Error(`Failed to fetch geo data for IP: ${ipAddress}`);
            }
            const geoData = await geoResponse.json();  // Decompress and parse the JSON

            if (geoData.bogon) {
                // return if we encounter a bogon IP
                return;
            }

            const countryAlpha2 = geoData.country;
            const country = iso_3166_1.whereAlpha2(countryAlpha2);
            const countryAlpha3 = country.alpha3;
            const countryName = country.country;
            const regionName = geoData.region;

            // Update country visits
            const countryVisitInfo = db.prepare("SELECT * FROM CountryVisits WHERE country_name = ?").get(countryName);

            if (!countryVisitInfo) {
                // If country info not found, create a new row for it
                db.prepare("INSERT INTO CountryVisits (country_code, country_name, visitor_count) VALUES (?, ?, ?)").run(countryAlpha3, countryName, 0);
            }

            db.prepare("UPDATE CountryVisits SET visitor_count = visitor_count + 1 WHERE country_name = ?").run(countryName);

            // Update state visits (if applicable)
            if (countryAlpha3 === "USA") {
                const stateVisitInfo = db.prepare("SELECT * FROM StateVisits WHERE state_name = ?").get(regionName);

                if (!stateVisitInfo) {
                    const stateAbbreviation = iso_3166_2.subdivision(countryAlpha3, regionName).regionCode;
                    db.prepare("INSERT INTO StateVisits (state_abbr, state_name, visitor_count) VALUES (?, ?, ?)").run(stateAbbreviation, regionName, 0);
                }

                db.prepare("UPDATE StateVisits SET visitor_count = visitor_count + 1 WHERE state_name = ?").run(regionName);
            }

            // Update unique visitors
            db.prepare("INSERT INTO UniqueVisitors (ip_address, first_visit_date, country_code, country_name, region_name) VALUES (?, ?, ?, ?, ?)")
                .run(ipAddress, today, countryAlpha3, countryName, regionName)
        } catch (error) {
            console.error("Error fetching geo data:", error);
            return res.json({ ok: false });
        }
    } else {
        console.log("Visitor found in database:", result);
    }

    // Return the IP address as a JSON response
    return res.json({ ok: true });
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

// Middleware to validate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.sendStatus(403); // No token, access denied

    jwt.verify(token, process.env.VITE_JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token, access denied
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Protected route -- checks if token is valid
app.get('/checkToken', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

// Read the SSL certificate and private key files
const privateKey = fs.readFileSync(TLS_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(TLS_CERT_PATH, 'utf8');

// Set up the HTTPS server
const credentials = { key: privateKey, cert: certificate };

// Start the server using HTTPS
// https.createServer(credentials, app).listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});