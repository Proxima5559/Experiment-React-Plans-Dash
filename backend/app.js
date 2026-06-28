const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const planRoutes = require('./routes/planRoutes');
const budgetRoutes = require('./routes/budgetRoutes'); 

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/plans', planRoutes);
app.use('/api/budgets', budgetRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing smoothly in development on port ${PORT}`);
});