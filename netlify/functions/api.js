import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { storage } from '../../server/storage.js';

const app = express();

// Configure CORS for Netlify
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple auth routes for Netlify
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Simple check - in production you'd verify against database
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
  // Simple token check
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

// Fan photos routes
app.get('/api/fan-photos', async (req, res) => {
  try {
    const photos = await storage.getApprovedFanPhotos();
    res.json(photos);
  } catch (error) {
    console.error('Error fetching fan photos:', error);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

app.post('/api/fan-photos', async (req, res) => {
  try {
    const photo = await storage.createFanPhoto(req.body);
    res.status(201).json(photo);
  } catch (error) {
    console.error('Error creating fan photo:', error);
    res.status(500).json({ message: 'Failed to create photo' });
  }
});

// Contact messages
app.post('/api/contact', async (req, res) => {
  try {
    const message = await storage.createContactMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Export handler for Netlify
export const handler = serverless(app);