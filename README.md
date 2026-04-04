# Finance Data Processing & Access Control Backend

## Overview
This is a backend system designed for a finance dashboard where users interact with financial records based on predefined roles: **Admin**, **Analyst**, and **Viewer**. 

The system provides robust Role-Based Access Control (RBAC), financial logic, and aggregated dashboard APIs.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize (v6)
- **Database**: SQLite (In-Memory/File persistent for easy portability)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt.js for password hashing

---

## Project Structure
```bash
src/
├── controllers/    # Business logic for Auth, Transactions, and Dashboard
├── db/             # Database connection configuration
├── middleware/     # Auth (JWT) and Role-Based Access Control (RBAC)
├── models/         # Sequelize data models (User, Transaction)
├── routes/         # Express API route definitions
├── app.js          # Express app configuration
└── server.js       # Entry point for the server
```

---

## Getting Started

### 1. Installation
Clone the project and install the dependencies:
```bash
npm install
```

### 2. Initial Setup (Seeding Data)
I have included a seed script to help generate test users and sample transactions immediately.
```bash
# This will create Admin, Analyst, and Viewer accounts + 6 sample transactions
npm run seed
```

### 3. Run the Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

## Roles and Permissions

| Role | Dashboard Summary | View Records | Create/Edit/Delete Records | Manage Users |
| :--- | :---: | :---: | :---: | :---: |
| **Viewer** | ✅ | ❌ | ❌ | ❌ |
| **Analyst** | ✅ | ✅ | ❌ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user (Default: VIEWER)
- `POST /api/auth/login` - Authenticate and get a JWT token

### Financial Records
- `GET /api/transactions` - Filterable list of all transactions (**Analyst+, Admin**)
  - Query Params: `category`, `type` (INCOME/EXPENSE), `startDate`, `endDate`
- `POST /api/transactions` - Add new record (**Admin only**)
- `PUT /api/transactions/:id` - Update existing record (**Admin only**)
- `DELETE /api/transactions/:id` - Remove record (**Admin only**)

### Dashboard
- `GET /api/dashboard/summary` - Aggregated stats like Net Balance, Income vs Expense, and Category breakdown (**All Roles**)

---

## Core Logic & Assumptions
1. **Simplified Storage**: Used SQLite as specified in the assignment for ease of "zero-setup" evaluation. Data is stored in `database.sqlite` in the root.
2. **Access Control**: Implemented as middleware using JWT payloads. Permissions are strictly enforced at the route level.
3. **Data Integrity**: Financial amounts are validated to ensure they are positive, and types are restricted to `INCOME` or `EXPENSE`.
4. **Human Transparency**: Code uses modern ESM syntax, clear separation of concerns, and focuses on maintainability rather than over-engineered complexity.

---

**Designed for Zorvyn FinTech Pvt. Ltd. Assignment**  
*Submitted by: Backend Developer Intern Candidate*
