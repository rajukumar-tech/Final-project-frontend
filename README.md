# 📚 AttendanceHub

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, full-stack attendance management system for educational institutions**

[Features](#-features) • [Quick Start](#-quick-start) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Screenshots](#-screenshots)

</div>

---

## 🌟 Features

### 👨‍💼 **Admin Portal**
- 📊 Dashboard with real-time attendance statistics
- 👥 Manage students and instructors
- 📚 Create and manage courses and batches
- 📈 Generate comprehensive attendance reports
- 🔐 Role-based access control

### 👨‍🏫 **Instructor Portal**
- ✅ Take attendance for assigned batches
- 📋 View assigned courses and batches
- 📊 Generate batch-wise attendance reports
- 📅 Session-based attendance tracking

### 👨‍🎓 **Student Portal**
- 📈 View personal attendance records
- 📚 Browse enrolled courses
- 📢 Receive announcements
- 📊 Track attendance percentage

---

## 🚀 Quick Start

The easiest way to run the entire application:

### Windows Users
Simply double-click the `START-ALL.bat` file in the root directory!

This will automatically:
1. Install backend dependencies
2. Generate Prisma client
3. Seed the database with sample data
4. Start the backend server
5. Install frontend dependencies
6. Start the frontend dev server

### Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

### Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Instructor | john.smith@example.com | instructor123 |
| Student | alice.johnson@example.com | student123 |

---

## 📦 Installation

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### Manual Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/AttendanceHub.git
cd AttendanceHub
```

#### 2. Setup Backend
```bash
# Navigate to backend directory
cd attendance-backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Seed the database (optional - adds sample data)
node prisma/seed.js

# Start the server
node src/index.js
```

#### 3. Setup Frontend (in a new terminal)
```bash
# Navigate to frontend directory
cd "final project frontend-frontend"

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🏗️ Project Structure

```
AttendanceHub/
├── 📁 attendance-backend/          # Backend server
│   ├── 📁 prisma/                  # Database schema & migrations
│   │   ├── schema.prisma           # Prisma schema definition
│   │   └── seed.js                 # Database seeding script
│   ├── 📁 src/
│   │   ├── 📁 routes/              # API route handlers
│   │   │   ├── auth.js             # Authentication routes
│   │   │   ├── users.js            # User management
│   │   │   ├── courses.js          # Course management
│   │   │   ├── batches.js          # Batch management
│   │   │   ├── attendance.js       # Attendance operations
│   │   │   ├── reports.js          # Report generation
│   │   │   └── admin.js            # Admin-specific routes
│   │   ├── 📁 lib/
│   │   │   └── prisma.js           # Prisma client instance
│   │   └── index.js                # Express app entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
├── 📁 final project frontend-frontend/  # Frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 admin/           # Admin dashboard components
│   │   │   ├── 📁 instructor/      # Instructor portal components
│   │   │   ├── 📁 student/         # Student portal components
│   │   │   ├── 📁 ui/              # Reusable UI components
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   │   ├── Profile.jsx         # User profile page
│   │   │   └── Settings.jsx        # Settings page
│   │   ├── 📁 services/            # API service functions
│   │   ├── App.jsx                 # Main application component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   └── package.json
│
├── START-ALL.bat                   # One-click startup script
└── README.md                       # This file
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Create a course |
| GET | `/api/courses/:id` | Get course by ID |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |

### Batches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/batches` | Get all batches |
| POST | `/api/batches` | Create a batch |
| GET | `/api/batches/:id` | Get batch by ID |
| GET | `/api/batches/:id/students` | Get students in batch |
| GET | `/api/batches/:id/instructors` | Get batch instructors |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance/sessions` | Get attendance sessions |
| POST | `/api/attendance/sessions` | Create attendance session |
| GET | `/api/attendance/records/:sessionId` | Get session attendance |
| POST | `/api/attendance/records` | Submit attendance records |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/batch/:id` | Get batch attendance report |
| GET | `/api/reports/student/:id` | Get student attendance report |

---

## 🗄️ Database Schema

The application uses **SQLite** with **Prisma ORM**. Key models:

- **User** - Stores user information (admin, instructor, student)
- **Course** - Academic courses offered
- **Batch** - Course batches with enrolled students
- **Enrollment** - Student-batch relationships
- **BatchInstructor** - Instructor-batch assignments
- **AttendanceSession** - Individual attendance sessions
- **AttendanceRecord** - Student attendance records per session

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

### Frontend
- **Library:** React 18
- **Build Tool:** Vite
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Styling:** CSS with modern design system

---

## ⚙️ Environment Variables

Create a `.env` file in the `attendance-backend` directory:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
COOKIE_SECURE=false
NODE_ENV=development
```

---

## 🧪 Running Tests

```bash
# Navigate to backend
cd attendance-backend

# Run smoke tests
npm run test
```

---

## 📝 Scripts

### Backend (`attendance-backend/`)
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run prisma:seed      # Seed database with sample data
```

### Frontend (`final project frontend-frontend/`)
```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Raju Kumar**

- GitHub: [@rajukumar-tech](https://github.com/rajukumar-tech)

---

<div align="center">

Made with ❤️ for better attendance management

⭐ Star this repo if you find it helpful!

</div>
