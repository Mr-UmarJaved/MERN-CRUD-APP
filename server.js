const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const personRoutes = require('./routes/personRoutes');

// Enhanced CORS configuration to allow all methods and handle preflight
const corsOptions = {
    origin: 'https://crudfrontend.z27.web.core.windows.net',  // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],    // Explicitly allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'],        // Allow common headers
    credentials: true,                                      // Allow cookies if needed
    optionsSuccessStatus: 200                               // Ensure OPTIONS returns 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/people', personRoutes);


// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));