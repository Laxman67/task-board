# Task Board - Task Management System

<div align="center">
  <img src="client/public/TaskBoard_logo.png" alt="Task Board Logo" width="200"/>
</div>

A modern, responsive task management application built with the MERN stack. Organize your projects and tasks efficiently with a clean, intuitive interface.

## 🚀 Features

- **User Authentication** - Secure registration and login with JWT
- **Project Management** - Create, update, and delete projects
- **Task Management** - Add tasks with status tracking (Todo, In Progress, Done)
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Instant status changes and task updates
- **Modern UI** - Built with React, Tailwind CSS, and Lucide icons

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB** (running locally or MongoDB Atlas)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-board
```

### 2. Install Dependencies

Install both frontend and backend dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/taskboard

# JWT
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
COOKIE_EXPIRE=1

# Server
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas for cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Run the Application

Start both the backend and frontend servers:

```bash
# Terminal 1 - Start backend server
cd backend
npm run dev

# Terminal 2 - Start frontend server
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## � Pre-created Users

For testing purposes, the application comes with two pre-created user accounts:

### User 1: John Doe
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john89@example.com",
    "password": "John@90"
}
```

### User 2: Mandeep Singh
```json
{
    "firstname": "Mandeep",
    "lastname": "Singh",
    "email": "MandeepS89@example.com",
    "password": "Mandep@156"
}
```

These users already have projects and tasks created in the system, which you can use to explore the application's features without needing to create new accounts from scratch.

## �📁 Project Structure

```
task-board/
├── client/                 # React frontend
│   ├── public/            # Static assets and logo
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context providers
│   │   ├── assets/        # Images and styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database and server configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   └── app.js         # Express app setup
│   ├── .env.example       # Environment variables template
│   └── package.json
├── FRD.md                 # Functional Requirements Document
└── README.md              # This file
```

## 🔧 Development Workflow

### 1. User Authentication Flow
```
User Registration/Login → JWT Token Generation → Protected Route Access → Dashboard
```

### 2. Project Management Flow
```
Dashboard → Create Project → Project List → View Project Tasks
```

### 3. Task Management Flow
```
Select Project → Add Task → Update Status → Edit/Delete Task
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get all tasks for a project
- `POST /api/projects/:projectId/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎯 Task Status Management

Tasks can have one of three statuses:
- **Todo** - New tasks that haven't been started
- **In Progress** - Tasks currently being worked on
- **Done** - Completed tasks

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- CORS configuration
- Protected API routes

## 🧪 Testing

Currently, the project uses manual testing. To add automated testing:

```bash
# Backend testing (when implemented)
cd backend
npm test

# Frontend testing (when implemented)
cd client
npm test
```

## 📦 Build for Production

### Frontend Build
```bash
cd client
npm run build
```

### Backend Production
```bash
cd backend
npm start
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Set environment variables for API URL

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend directory
3. Ensure MongoDB is accessible (Atlas recommended)

## 🌐 Live Demo

- **Frontend**: https://tws-task-board.vercel.app/
- **Backend API**: https://tws-task-board.onrender.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **Port Already in Use**
   - Change PORT in backend .env file
   - Kill processes using the port: `lsof -ti:5000 | xargs kill`

3. **CORS Issues**
   - Ensure frontend URL is allowed in backend CORS configuration
   - Check API endpoints are correctly called

4. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in .env file
   - Verify token expiration settings

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [FRD.md](./FRD.md) for detailed requirements
- Review the code comments for implementation details

---

<div align="center">
  <p>Made with ❤️ using MERN Stack</p>
</div>
