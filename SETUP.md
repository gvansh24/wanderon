# Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wanderon
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** 
- Make sure MongoDB is running locally, or use MongoDB Atlas connection string
- Change `JWT_SECRET` to a strong random string (at least 32 characters)

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/wanderon`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env` file

## Testing the Application

1. Navigate to http://localhost:3000
2. Click "Sign Up" to create a new account
3. Fill in the registration form
4. After registration, you'll be redirected to login
5. Login with your credentials
6. You'll be redirected to the dashboard

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify `REACT_APP_API_URL` in frontend `.env` (if set)

### Authentication not working
- Check browser console for errors
- Verify cookies are enabled in browser
- Check backend logs for errors
- Ensure `JWT_SECRET` is set correctly
