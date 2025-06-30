const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 4002;

// Enable CORS for both 4000 and 4001
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003'],
  credentials: true
}));

// Proxy middleware configuration
const proxyOptions = {
  target: 'https://api.linear.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api/linear': '/graphql'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Forward the Authorization header
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
    // Set content type
    proxyReq.setHeader('Content-Type', 'application/json');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Dynamically set CORS origin to match the request origin
    proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
};

// Create proxy middleware
const proxy = createProxyMiddleware('/api/linear', proxyOptions);

// Use the proxy middleware
app.use('/api/linear', proxy);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Linear API Proxy is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Linear API Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to https://api.linear.app/graphql`);
}); 