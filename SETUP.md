# Quick Setup Guide

Follow these steps to get the assessment project running:

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- MetaMask browser extension (for wallet connection testing)

## Installation

1. **Install root dependencies** (optional - for running both servers together):
```bash
npm install
```

2. **Install backend dependencies**:
```bash
cd backend
npm install
```

3. **Install frontend dependencies**:
```bash
cd ../frontend
npm install
```

## Running the Application

### Option 1: Run servers separately (Recommended for development)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000` and automatically open in your browser.

### Option 2: Run both servers together

From the root directory:
```bash
npm run dev
```

## Testing with MetaMask

1. Install MetaMask browser extension if you haven't already
2. Create or import a test account
3. Switch to Sepolia testnet:
   - Click network dropdown in MetaMask
   - Select "Sepolia test network"
   - If not visible, add it manually:
     - Network Name: Sepolia
     - RPC URL: https://sepolia.infura.io/v3/YOUR_PROJECT_ID
     - Chain ID: 11155111
     - Currency Symbol: ETH
4. Get testnet ETH from a Sepolia faucet (if needed)

## Project Structure

```
take-home-assessment-pulsenow/
├── backend/              # Node.js API server
│   ├── server.js        # Express server with API endpoints
│   ├── mockData.js      # CommonJS version of mock data
│   └── package.json
├── frontend/            # React.js application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
├── contracts/           # Smart contracts
│   └── SignalVerification.sol
├── mockData.js          # ES6 version (for frontend)
├── README.md            # Main assessment instructions
├── TASKS.md             # Detailed task instructions
└── package.json         # Root package.json
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Ensure all dependencies are installed: `cd backend && npm install`
- Check Node.js version: `node --version` (should be 16+)

### Frontend won't start
- Check if port 3000 is available
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check React version compatibility

### MetaMask connection issues
- Ensure MetaMask is unlocked
- Check that you're on the correct network (Sepolia for testing)
- Clear browser cache and reload

### CORS errors
- Ensure backend is running on port 3001
- Check that CORS is enabled in `backend/server.js`
- Verify API URL in frontend code matches backend URL

## Next Steps

1. Read `README.md` for assessment overview
2. Read `TASKS.md` for detailed task instructions
3. Start implementing Task 1, 2, and 3
4. Good luck! 🚀

