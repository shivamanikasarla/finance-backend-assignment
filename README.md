# Finance Data Processing & Access Control Backend (Spring Boot)

## Overview
This is a robust backend system for a finance dashboard, built with **Spring Boot** to leverage Java's strong typing and enterprise-ready ecosystem. The system handles financial records with Role-Based Access Control (RBAC) for **Admin**, **Analyst**, and **Viewer** roles.

## Tech Stack
- **Framework**: Spring Boot 3.2.4
- **Language**: Java 17
- **Database**: H2 (In-memory/Local for easy evaluation)
- **Security**: Spring Security 6 (JWT-based)
- **ORM**: Spring Data JPA (Hibernate)
- **API Documentation**: [Swagger UI (Interactive API Docs)](http://localhost:8080/swagger-ui/index.html)

---

## Project Structure
```bash
src/main/java/com/finance/backend/
├── controller/     # REST Controllers (Auth, Transaction, Dashboard)
├── model/          # JPA Entities (User, Transaction, Role)
├── repository/     # Spring Data Repositories
├── security/       # JWT Logic, Filters, and Security Configuration
├── service/        # Business Logic Services
├── DataInitializer.java # Auto-seeds test data on startup
└── FinanceApplication.java # Main Application Entry
```

---

## Getting Started

### 1. Prerequisites
- **Java 17** or higher
- **Maven** (optional, you can use the included wrapper)

### 2. Build and Run
Clone the project and run the following command:
```bash
./mvnw spring-boot:run
```
The server will start at `http://localhost:8080`.

### 3. Test Accounts
The system automatically seeds the following users on startup:
*   **Admin**: `admin` / `admin123`
*   **Analyst**: `analyst` / `analyst123`
*   **Viewer**: `viewer` / `viewer123`

### 4. H2 Console
Explore the database at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:financedb`
- User: `sa`
- Password: `password`

---

## Roles and Permissions

| Role | Dashboard Summary | View Records | Create/Edit Records | Delete Records |
| :--- | :---: | :---: | :---: | :---: |
| **Viewer** | ✅ | ✅ | ❌ | ❌ |
| **Analyst** | ✅ | ✅ | ✅ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new account
- `POST /api/auth/login` - Authenticate and receive a JWT

### Financial records
- `GET /api/transactions` - Filtered list of transactions (**All Roles**)
  - Query Params: `category`, `type` (INCOME/EXPENSE), `startDate`, `endDate`
- `POST /api/transactions` - Add new record (**Analyst, Admin**)
- `PUT /api/transactions/{id}` - Update existing record (**Analyst, Admin**)
- `DELETE /api/transactions/{id}` - Remove record (**Admin Only**)

### Dashboard
- `GET /api/dashboard/summary` - Aggregated stats: Net Balance, Income vs Expense, and Category breakdown (**All Roles**)

---

## Core Logic & Implementation Notes
1. **Security**: Implemented a stateless JWT filter. Roles are automatically mapped to `GrantedAuthority`.
2. **Dynamic Filtering**: Used a custom JPQL query in the repository for efficient multi-param filtering of financial data.
3. **Data Integrity**: Used JPA annotations for validation and unique constraints on usernames.
4. **Analytics**: Real-time aggregation using Java Streams in the Dashboard controller.

---

**Designed for Backend Engineering Assignment**  
*Submitted by: Java Backend Developer Candidate*
