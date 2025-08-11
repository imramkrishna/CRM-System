// Simple deployment check script
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Basic health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
  console.log('Environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- PORT:', process.env.PORT);
  console.log('- JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL);
});
