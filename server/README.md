# BupStore

A TypeScript Node.js Express.js project with authentication, email verification, and Prisma ORM.

## Features

- ✨ TypeScript for type safety
- 🚀 Express.js for building APIs
- 🔐 Complete authentication system with JWT
- ✉️ Email verification workflow
- 🗄️ Prisma ORM with PostgreSQL
- 🔄 Nodemon for hot reloading during development
- 🎯 ESLint for code quality
- 📁 Organized project structure
- 🌍 Environment variable support with dotenv

## Project Structure

```
bupstore/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── routes/
│   │   ├── index.ts                # Main router
│   │   ├── auth.ts                 # Authentication routes
│   │   └── backup.ts               # Backup routes (protected)
│   ├── middleware/
│   │   ├── auth.ts                 # JWT authentication middleware
│   │   └── errorHandler.ts        # Error handling middleware
│   ├── utils/
│   │   └── email.ts                # Email utility functions
│   └── generated/
│       └── prisma/                 # Generated Prisma client
├── prisma/
│   └── schema.prisma               # Database schema
├── docs/
│   └── AUTHENTICATION.md           # Authentication API docs
├── dist/                           # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env.example
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or use a service like Neon)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-secure-random-secret-key
   APP_URL=http://localhost:3000
   DATABASE_URL=your-postgresql-connection-string
   ```

3. **Set up the database:**
   ```bash
   bunx prisma db push
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run in production mode:**
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run lint` - Run ESLint for code quality checks

## API Endpoints

### Public Endpoints
- `GET /health` - Health check endpoint
- `GET /api` - Welcome message

### Authentication Endpoints
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login with credentials
- `GET /auth/verify-email?token=<token>` - Verify email
- `POST /auth/resend-verification` - Resend verification email
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `GET /auth/me` - Get current user (requires auth)

### Protected Endpoints (Require Authentication)
- `GET /api/backup` - Backup routes (requires JWT token)

📖 **For detailed API documentation, see [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md)**

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `JWT_SECRET` - Secret key for JWT token generation
- `APP_URL` - Application URL for email links
- `DATABASE_URL` - PostgreSQL connection string

## Authentication Flow

1. **Sign Up**: User creates account → Verification email sent
2. **Verify Email**: User clicks link in email → Email verified
3. **Login**: User logs in with verified email → Receives JWT token
4. **Protected Routes**: Use JWT token in Authorization header

## Using Protected Routes

To access protected routes, include the JWT token in your requests:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/backup
```

## Adding Authentication to Your Routes

Use the `authenticateToken` middleware:

```typescript
import { authenticateToken } from '../middleware/auth';

router.get('/protected', authenticateToken, (req, res) => {
  // Access user info from req.user
  const userId = req.user!.userId;
  res.json({ userId });
});
```

## License

ISC
