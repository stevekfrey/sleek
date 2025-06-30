# Project Setup & Run Instructions

**IMPORTANT: Always use the 4000-series ports (4000, 4001, 4002, 4003, etc.) for all local development for this project. If a port is in use, free it or use the next available 4000-series port. This is a permanent convention for this project.**

## Running the Project (Local Development)

**All services should run on localhost 4000-series ports.**

### 1. Environment Variables
- Ensure you have a `.env.local` file in the `linear` directory with:
  ```
  VITE_LINEAR_API_KEY=your_linear_api_key_here
  ```

### 2. Start Both Frontend and Backend Proxy
- Open a terminal and run:
  ```sh
  cd linear
  npm install # (first time only)
  npm run dev:all
  ```
- This will:
  - Start the Vite dev server (usually on http://localhost:4000 or the next available 4000-series port)
  - Start the backend proxy server on http://localhost:4002

### 3. If You See Port Conflicts
- If you see errors like `EADDRINUSE` (address already in use):
  - Kill any processes using ports 4000, 4001, 4002, or 4003.
  - Or restart your computer to clear ports.
- The frontend may auto-switch to 4001, 4002, etc. If so, add that port to the CORS `origin` list in `server.js` and restart the proxy.

### 4. CORS Troubleshooting
- The backend proxy (`server.js`) must allow the frontend port in its CORS config:
  ```js
  app.use(cors({
    origin: ['http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003'],
    credentials: true
  }));
  ```
- If you change this, restart the proxy server.

### 5. Access the App
- Open your browser to the port shown in the terminal (e.g., http://localhost:4000 or the next available 4000-series port).

### 6. Reference
- **For all future setup/run questions, refer to this INSTRUCTIONS.md file.** 