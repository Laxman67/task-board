# Functional Requirements Document (FRD)
## Task Management System

<div align="center">
  <img src="./client/public/TaskBoard_logo.png" alt="Task Management System Logo" width="300" height="auto">
</div>

### 1. Feature List

#### Core Features
- **User Authentication**
  - User registration with email and password
  - User login with JWT token generation
  - Protected routes for authenticated users

- **Project Management**
  - Create new projects
  - View all user projects
  - Update project details
  - Delete projects

- **Task Management**
  - Add tasks within projects
  - Update task status (Todo / In Progress / Done)
  - View tasks organized by project
  - Edit task details
  - Delete tasks

#### UI Features
- Clean, responsive interface
- Loading states for async operations
- Error handling and user feedback
- Reusable components (Button, Input, Modal)

### 2. User Flow

#### Authentication Flow
1. User visits application
2. User registers or logs in
3. System validates credentials
4. JWT token generated and stored
5. User redirected to dashboard

#### Project Management Flow
1. Authenticated user views project list
2. User creates new project with name and description
3. Project appears in project list
4. User can click project to view tasks

#### Task Management Flow
1. User selects a project
2. User adds tasks with title and description
3. Tasks displayed with current status
4. User can update task status by clicking status buttons
5. Tasks can be edited or deleted

### 3. Basic Validations

#### User Registration/Login
- Email: Valid email format required
- Password: Minimum 6 characters
- Both fields required for login
- Email uniqueness check during registration

#### Project Validations
- Project name: Required, max 100 characters
- Project description:  max 500 characters
- Project belongs to authenticated user

#### Task Validations
- Task title: Required, max 200 characters
- Task description:  max 1000 characters
- Task status: Must be one of (Todo, In Progress, Done)
- Task belongs to a project owned by user

### 4. Assumptions

#### Technical Assumptions
- Users have modern browsers supporting ES6+
- Internet connection is available for API calls
- MongoDB database is accessible and properly configured
- Environment variables are properly set for deployment

#### Business Assumptions
- Each user can only manage their own projects and tasks
- No sharing/collaboration features required
- No file attachments needed for tasks
- No due dates or priorities required
- Single user per account (no team features)

#### Security Assumptions
- JWT tokens are stored securely in localStorage/httpOnly cookies
- API endpoints are protected with authentication middleware
- Input validation prevents XSS and injection attacks
- CORS is properly configured for frontend domain

### 5. Data Models

#### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Project Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

#### Task Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String (enum: ['Todo', 'In Progress', 'Done']),
  projectId: ObjectId (ref: Project),
  createdAt: Date,
  updatedAt: Date
}
```

### 6. API Endpoints

#### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

#### Projects
- GET /api/projects - Get all user projects
- POST /api/projects - Create new project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

#### Tasks
- GET /api/projects/:projectId/tasks - Get all tasks for a project
- POST /api/projects/:projectId/tasks - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

### 7. Success Criteria

#### Functional Success
- Users can register and login successfully
- Users can create, read, update, delete projects
- Users can create, read, update, delete tasks
- Task status updates work correctly
- Data persists across sessions

#### Technical Success
- Backend APIs respond correctly
- Frontend renders without errors
- Authentication protects routes properly
- Database operations complete successfully
- Deployment works on specified platforms
