# Wanderon - User Authentication System

A full-stack user authentication system built with React, Node.js, Express, and MongoDB. Features secure password hashing, JWT-based authentication with HTTP-only cookies, and comprehensive security measures.

## Features

### Backend
- ✅ User registration with validation
- ✅ User login with JWT token generation
- ✅ Password hashing using bcrypt
- ✅ JWT authentication with HTTP-only cookies
- ✅ Protected routes with authentication middleware
- ✅ Input validation and sanitization
- ✅ XSS protection
- ✅ NoSQL injection prevention
- ✅ Rate limiting on auth endpoints
- ✅ Security headers (Helmet)
- ✅ Error handling middleware

### Frontend
- ✅ Modern React UI with Material-UI
- ✅ User registration page
- ✅ User login page
- ✅ Protected dashboard page
- ✅ Authentication context for state management
- ✅ Protected route component
- ✅ Automatic cookie handling
- ✅ Loading states and error handling
- ✅ Responsive design

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-mongo-sanitize** - NoSQL injection prevention
- **xss-clean** - XSS protection

### Frontend
- **React** - UI library
- **Material-UI** - Component library
- **React Router** - Routing
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
wanderon/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # MongoDB connection
│   │   │   └── jwt.js           # JWT configuration
│   │   ├── models/
│   │   │   └── User.js          # User schema
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   ├── auth.js          # Authentication middleware
│   │   │   ├── validation.js    # Input validation
│   │   │   └── errorHandler.js  # Error handling
│   │   ├── routes/
│   │   │   └── authRoutes.js    # Auth routes
│   │   └── app.js               # Express app
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── pages/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wanderon
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "message": "User registered successfully",
      "user": {
        "id": "...",
        "username": "johndoe",
        "email": "john@example.com"
      }
    }
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:** Sets HTTP-only cookie with JWT token
  ```json
  {
    "success": true,
    "data": {
      "message": "Login successful",
      "user": {
        "id": "...",
        "username": "johndoe",
        "email": "john@example.com"
      }
    }
  }
  ```

#### Logout
- **POST** `/api/auth/logout`
- **Headers:** Cookie with JWT token
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "message": "Logout successful"
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** Cookie with JWT token
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "...",
        "username": "johndoe",
        "email": "john@example.com",
        "createdAt": "..."
      }
    }
  }
  ```

#### Verify Token
- **GET** `/api/auth/verify`
- **Headers:** Cookie with JWT token
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "message": "Token is valid",
      "user": {
        "id": "...",
        "username": "johndoe",
        "email": "john@example.com"
      }
    }
  }
  ```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Passwords are never returned in API responses
- Password validation requires:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number

### Authentication Security
- JWT tokens stored in HTTP-only cookies (not accessible via JavaScript)
- Secure cookie flags in production (`secure: true`)
- SameSite cookie attribute set to 'strict' to prevent CSRF
- Token expiration: 7 days (configurable)

### Input Validation & Sanitization
- Server-side validation using express-validator
- Input sanitization to prevent XSS attacks
- NoSQL injection prevention using express-mongo-sanitize
- Email format validation
- Username format validation (alphanumeric + underscores only)

### Rate Limiting
- Login attempts: 5 requests per 15 minutes per IP
- Registration: 3 requests per hour per IP

### Security Headers
- Helmet.js configured for security headers
- CORS properly configured
- XSS protection enabled

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

Common error codes:
- `VALIDATION_ERROR` - Input validation failed
- `DUPLICATE_ERROR` - Username or email already exists
- `INVALID_CREDENTIALS` - Invalid email or password
- `NO_TOKEN` - Authentication token missing
- `INVALID_TOKEN` - Invalid or expired token
- `RATE_LIMIT_EXCEEDED` - Too many requests

## Usage

1. **Register a new user:**
   - Navigate to `/register`
   - Fill in username, email, and password
   - Submit the form

2. **Login:**
   - Navigate to `/login`
   - Enter email and password
   - Upon successful login, you'll be redirected to the dashboard

3. **Access protected routes:**
   - After logging in, you can access `/dashboard`
   - The authentication cookie is automatically sent with requests

4. **Logout:**
   - Click the logout button in the header or dashboard
   - The authentication cookie will be cleared

## Development

### Backend Development
- Uses ES6 modules (`type: "module"` in package.json)
- Nodemon for auto-restart in development
- Environment variables for configuration

### Frontend Development
- React with functional components and hooks
- Material-UI for components
- Context API for authentication state
- React Router for navigation

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Update `JWT_SECRET` to a strong, random value
3. Update `MONGODB_URI` to production database
4. Update `FRONTEND_URL` to production frontend URL
5. Ensure MongoDB is accessible

### Frontend
1. Build the React app: `npm run build`
2. Serve the `build` folder using a static file server
3. Update `REACT_APP_API_URL` to production backend URL
4. Ensure CORS is configured correctly on the backend

## Testing

### Manual Testing Checklist
- [ ] User registration with valid data
- [ ] User registration with duplicate email/username
- [ ] User registration with invalid data
- [ ] User login with valid credentials
- [ ] User login with invalid credentials
- [ ] Access protected routes without authentication
- [ ] Access protected routes with valid authentication
- [ ] Logout functionality
- [ ] Token expiration handling
- [ ] Rate limiting on auth endpoints

## Troubleshooting

### Backend Issues
- **MongoDB connection error:** Ensure MongoDB is running and `MONGODB_URI` is correct
- **Port already in use:** Change `PORT` in `.env` file
- **JWT errors:** Ensure `JWT_SECRET` is set in `.env`

### Frontend Issues
- **API connection error:** Check `REACT_APP_API_URL` and ensure backend is running
- **CORS errors:** Ensure backend CORS configuration includes frontend URL
- **Cookie not being sent:** Ensure `withCredentials: true` in axios config

## License

ISC

## Author

Wanderon Authentication System
