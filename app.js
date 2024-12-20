require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const path = require('path');

const repoRoutes = require('./routes/repoRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/repos', repoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
