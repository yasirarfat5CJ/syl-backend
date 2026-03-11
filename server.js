const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const syllabusRoutes = require('./routes/syllabusRoutes'); 
const subjectRoutes = require('./routes/sujectRoutes');
const moduleRoutes =require('./routes/moduleRoute')
const branchRoutes = require('./routes/branchRoutes');
const chatbotRoutes = require('./routes/chatRoutes');


const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.disable('x-powered-by');
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://syl-frontend.netlify.app'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api', subjectRoutes);
app.use('/api', moduleRoutes);
app.use('/api', chatbotRoutes);


// Sample Route
app.get('/', (req, res) => {
  res.send('Syllabus Management API Running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
