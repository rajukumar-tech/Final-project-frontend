# Complete Attendance Management API - Endpoints Documentation

## Overview
All endpoints are fully implemented and tested with proper:
- Authentication (JWT with Bearer token or Cookie)
- Authorization (Role-based access control: admin, instructor, student)
- Request validation
- Response formatting

---

## Authentication & Authorization

### Required Headers
```
Authorization: Bearer <JWT_TOKEN>
```
OR
```
Cookie: token=<JWT_TOKEN>
```

### User Roles
- **admin** - Full system access, can manage courses, batches, instructors, sessions
- **instructor** - Can create sessions, record attendance, view reports for assigned batches
- **student** - Can view own attendance records and summary
- **user** - Default role with limited access

---

## Endpoints Documentation

### 1. Batch Student Management

#### GET `/api/batches/:batchId/students`
**List students in a batch**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: admin, assigned instructor, enrolled students
- **Description**: Retrieve all students enrolled in a specific batch
- **Path Parameters**:
  - `batchId` (string, required) - The batch ID

**Request**:
```http
GET /api/batches/batch_123/students HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "students": [
    {
      "studentId": "student-1",
      "enrolledAt": "2025-12-03T14:53:34.150Z"
    },
    {
      "studentId": "student-2",
      "enrolledAt": "2025-12-03T14:53:34.150Z"
    }
  ]
}
```

**Error Responses**:
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (user not authorized to view batch students)
- `404` - Batch not found

---

### 2. Batch Instructor Assignment

#### POST `/api/batches/:batchId/assign-instructor`
**Assign an instructor to a batch**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: admin only
- **Description**: Assign a specific instructor to teach a batch
- **Path Parameters**:
  - `batchId` (string, required) - The batch ID
- **Request Body**:
  ```json
  {
    "instructorId": "instructor-1"
  }
  ```

**Response (201)**:
```json
{
  "assignment": {
    "id": "instructor_1764773614157",
    "batchId": "071261e3-42ca-4783-a82f-cb0afa8a1a8f",
    "instructorId": "instructor-1",
    "createdAt": "2025-12-03T14:53:34.157Z"
  }
}
```

**Error Responses**:
- `400` - Validation error (missing instructorId)
- `401` - Unauthorized
- `403` - Forbidden (only admin)
- `404` - Batch not found
- `409` - Instructor already assigned to batch

---

#### DELETE `/api/batches/:batchId/assign-instructor/:instructorId`
**Remove instructor from a batch**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: admin only
- **Description**: Remove an instructor's assignment from a batch
- **Path Parameters**:
  - `batchId` (string, required) - The batch ID
  - `instructorId` (string, required) - The instructor ID to remove

**Request**:
```http
DELETE /api/batches/batch_123/assign-instructor/instructor-1 HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "removed": {
    "id": "instructor_1764773614157",
    "batchId": "071261e3-42ca-4783-a82f-cb0afa8a1a8f",
    "instructorId": "instructor-1",
    "createdAt": "2025-12-03T14:53:34.157Z"
  },
  "message": "Instructor removed from batch"
}
```

**Error Responses**:
- `401` - Unauthorized
- `403` - Forbidden (only admin)
- `404` - Assignment not found

---

### 3. Attendance Sessions

#### POST `/api/attendance/sessions`
**Create an attendance session**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin
- **Description**: Create a new attendance session for a batch
- **Request Body**:
  ```json
  {
    "batchId": "batch_123",
    "sessionDate": "2025-12-03T14:53:08.506Z",
    "sessionLabel": "morning",
    "duration": 60
  }
  ```

**Response (201)**:
```json
{
  "session": {
    "id": "session_1764773588508",
    "batchId": "b3d1fcd3-de75-4ce3-b395-849a6a2725f8",
    "instructorId": "instructor-1",
    "sessionDate": "2025-12-03T14:53:08.506Z",
    "sessionLabel": "morning",
    "duration": 60,
    "createdAt": "2025-12-03T14:53:08.508Z"
  }
}
```

**Error Responses**:
- `400` - Validation error (invalid date, missing batchId)
- `401` - Unauthorized
- `403` - Forbidden (only instructor/admin)

---

#### GET `/api/attendance/sessions`
**List attendance sessions**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin, student
- **Description**: Retrieve attendance sessions with optional filters
- **Query Parameters**:
  - `batchId` (optional) - Filter by batch ID
  - `instructorId` (optional) - Filter by instructor ID
  - `fromDate` (optional) - Filter sessions from this date (ISO 8601)
  - `toDate` (optional) - Filter sessions until this date (ISO 8601)

**Request**:
```http
GET /api/attendance/sessions?batchId=batch_123&sessionLabel=morning HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "sessions": [
    {
      "id": "session_1764773588508",
      "batchId": "b3d1fcd3-de75-4ce3-b395-849a6a2725f8",
      "instructorId": "instructor-1",
      "sessionDate": "2025-12-03T14:53:08.506Z",
      "sessionLabel": "morning",
      "duration": 60,
      "createdAt": "2025-12-03T14:53:08.508Z"
    }
  ]
}
```

---

### 4. Attendance Records

#### POST `/api/attendance/sessions/:sessionId/records`
**Bulk upsert attendance records for a session**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin
- **Description**: Record attendance for multiple students in a session (creates or updates)
- **Path Parameters**:
  - `sessionId` (string, required) - The session ID
- **Request Body**:
  ```json
  {
    "records": [
      {
        "studentId": "student-1",
        "status": "present",
        "remarks": "On time"
      },
      {
        "studentId": "student-2",
        "status": "absent",
        "remarks": "Sick leave"
      },
      {
        "studentId": "student-3",
        "status": "leave",
        "remarks": "Medical"
      }
    ]
  }
  ```

**Status Values**: `present`, `absent`, `leave`

**Response (201)**:
```json
{
  "records": [
    {
      "id": "record_1764773614172_0.xxx",
      "sessionId": "session_1764773614165",
      "studentId": "student-1",
      "status": "present",
      "remarks": "On time",
      "createdAt": "2025-12-03T14:53:34.172Z",
      "updatedAt": "2025-12-03T14:53:34.172Z"
    }
  ],
  "upserted": [...]
}
```

**Error Responses**:
- `400` - Validation error (invalid records array)
- `401` - Unauthorized
- `403` - Forbidden (only instructor/admin)

---

#### GET `/api/attendance/sessions/:sessionId/records`
**Get attendance records for a session**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin, student (only own records)
- **Description**: Retrieve attendance records for a specific session
- **Path Parameters**:
  - `sessionId` (string, required) - The session ID
- **Query Parameters**:
  - `studentId` (optional) - Filter by student ID (instructors/admin can filter any, students see only own)

**Request**:
```http
GET /api/attendance/sessions/session_123/records?studentId=student-1 HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "records": [
    {
      "id": "record_1764773614172_0.xxx",
      "sessionId": "session_1764773614165",
      "studentId": "student-1",
      "status": "present",
      "remarks": "On time",
      "createdAt": "2025-12-03T14:53:34.172Z",
      "updatedAt": "2025-12-03T14:53:34.172Z"
    }
  ]
}
```

---

### 5. Reports

#### GET `/api/reports/batch/:batchId/history`
**Get batch-wise attendance summary and history**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin
- **Description**: Get comprehensive attendance summary for all students in a batch
- **Path Parameters**:
  - `batchId` (string, required) - The batch ID

**Request**:
```http
GET /api/reports/batch/batch_123/history HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "batchId": "071261e3-42ca-4783-a82f-cb0afa8a1a8f",
  "batchName": "Batch B",
  "totalSessions": 1,
  "attendance": [
    {
      "studentId": "student-1",
      "present": 1,
      "absent": 0,
      "leave": 0,
      "total": 1,
      "percent": 100
    },
    {
      "studentId": "student-2",
      "present": 0,
      "absent": 1,
      "leave": 0,
      "total": 1,
      "percent": 0
    }
  ]
}
```

**Error Responses**:
- `401` - Unauthorized
- `403` - Forbidden (only instructor/admin)
- `404` - Batch not found

---

#### GET `/api/reports/student/:studentId/summary`
**Get student-wise attendance summary**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: instructor, admin, student (students can only view own)
- **Description**: Get attendance summary for a specific student across all sessions
- **Path Parameters**:
  - `studentId` (string, required) - The student ID

**Request**:
```http
GET /api/reports/student/student-1/summary HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "studentId": "student-1",
  "present": 1,
  "absent": 0,
  "leave": 0,
  "total": 1,
  "percent": 100
}
```

**Error Responses**:
- `401` - Unauthorized
- `403` - Forbidden (students can only view own summary)

---

### 6. Admin Only

#### GET `/api/admin/instructor-sessions`
**Get sessions taken by instructors (with filters)**

- **Auth Required**: Yes (Bearer Token)
- **Allowed Roles**: admin only
- **Description**: Retrieve all sessions taken by instructors with date and instructor filtering
- **Query Parameters**:
  - `instructorId` (optional) - Filter by instructor ID
  - `fromDate` (optional) - Filter sessions from this date (ISO 8601)
  - `toDate` (optional) - Filter sessions until this date (ISO 8601)

**Request**:
```http
GET /api/admin/instructor-sessions?instructorId=instructor-1&fromDate=2025-12-01T00:00:00Z HTTP/1.1
Authorization: Bearer <token>
```

**Response (200)**:
```json
{
  "sessions": [
    {
      "sessionId": "session_1764773614165",
      "batchId": "071261e3-42ca-4783-a82f-cb0afa8a1a8f",
      "instructorId": "instructor-1",
      "instructorAssignmentId": "instructor_1764773614163",
      "sessionDate": "2025-12-03T14:53:34.164Z",
      "sessionLabel": "morning",
      "duration": 60
    }
  ]
}
```

**Error Responses**:
- `401` - Unauthorized
- `403` - Forbidden (only admin)

---

## Test Results Summary

### Endpoints Tested ✅

| Endpoint | Method | Status | Auth | Role |
|----------|--------|--------|------|------|
| `/api/batches/:batchId/students` | GET | ✅ | Required | admin, instructor*, student* |
| `/api/batches/:batchId/assign-instructor` | POST | ✅ | Required | admin |
| `/api/batches/:batchId/assign-instructor/:id` | DELETE | ✅ | Required | admin |
| `/api/attendance/sessions` | POST | ✅ | Required | instructor, admin |
| `/api/attendance/sessions` | GET | ✅ | Required | instructor, admin, student |
| `/api/attendance/sessions/:id/records` | POST | ✅ | Required | instructor, admin |
| `/api/attendance/sessions/:id/records` | GET | ✅ | Required | instructor, admin, student* |
| `/api/reports/batch/:batchId/history` | GET | ✅ | Required | instructor, admin |
| `/api/reports/student/:studentId/summary` | GET | ✅ | Required | instructor, admin, student* |
| `/api/admin/instructor-sessions` | GET | ✅ | Required | admin |

*\* Conditional access - instructors need batch assignment, students see own data only*

### Authorization Checks ✅
- ✅ Unauthorized (401) - Missing/invalid token
- ✅ Forbidden (403) - Insufficient role permissions
- ✅ Forbidden (403) - Instructors cannot access batches they're not assigned to
- ✅ Students can only view own records/summaries
- ✅ Admin has full access to all endpoints

### All Test Cases Pass
```
✅ Batch instructor assignment and removal
✅ Attendance session creation and retrieval
✅ Bulk attendance record creation/update
✅ Student-specific record viewing (own only)
✅ Batch-wide attendance summaries
✅ Student attendance summaries
✅ Admin instructor session viewing with filters
✅ Date range filtering
✅ Authentication and authorization checks
```

---

## Running Tests

```bash
# Run comprehensive endpoint tests
node tools/test_all_endpoints.js

# Run instructor access control tests
node tools/test_instructor_access.js

# Run original smoke tests
node tools/inprocess_smoke.js
```

---

## Database Schema

### New Models Added
- **BatchInstructor** - Maps instructors to batches
- **AttendanceSession** - Individual attendance sessions
- **AttendanceRecord** - Student attendance records per session

### Migration
Migration `20251203145240_add_attendance_sessions_records` applied successfully.

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing the issue"
}
```

Or with validation errors:

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

---

**Last Updated**: 2025-12-03  
**Test Status**: ✅ All Endpoints Working
