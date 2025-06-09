const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Configure CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple auth routes for Netlify
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Simple authentication for demo
    if (username === 'admin' && password === 'admin123') {
      const user = {
        id: '1',
        username: 'admin',
        email: 'admin@cuca.ao',
        firstName: 'Admin',
        lastName: 'CUCA'
      };
      
      return res.json({ user, token: 'simple-token-' + Date.now() });
    }
    
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/auth/user', (req, res) => {
  // Simple token validation
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer simple-token-')) {
    return res.json({
      id: '1',
      username: 'admin',
      email: 'admin@cuca.ao',
      firstName: 'Admin',
      lastName: 'CUCA'
    });
  }
  
  return res.status(401).json({ message: 'Unauthorized' });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Mock data for fan photos
app.get('/api/fan-photos', async (req, res) => {
  try {
    const photos = [
      {
        id: 1,
        imageUrl: '/images/cuca-hero.jpg',
        description: 'CUCA na praia com amigos',
        userName: 'João Silva',
        status: 'approved',
        createdAt: new Date().toISOString()
      }
    ];
    res.json(photos);
  } catch (error) {
    console.error('Error fetching fan photos:', error);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

app.post('/api/fan-photos', async (req, res) => {
  try {
    const photo = {
      id: Date.now(),
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    res.status(201).json(photo);
  } catch (error) {
    console.error('Error creating fan photo:', error);
    res.status(500).json({ message: 'Failed to create photo' });
  }
});

// Contact messages
app.post('/api/contact', async (req, res) => {
  try {
    const message = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = [
      {
        id: 1,
        name: 'CUCA Original',
        description: 'A cerveja nacional de Angola',
        price: 250,
        imageUrl: '/images/cuca-beer.jpg',
        category: 'Cerveja'
      }
    ];
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Catch all other routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export handler for Netlify
module.exports.handler = serverless(app);