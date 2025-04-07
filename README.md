
# Employee Management App
## 101376617 Comp3133 Assignment2

This is a web-based Employee Management App that allows you to manage employees, search for employees, view their details, and add or edit employee information. It provides a simple and intuitive interface to interact with employee data. The backend is built using GraphQL, while the frontend is developed using Angular.

## Features

### Backend Features
- **GraphQL API**: Provides a set of queries and mutations for managing employees and users.
- **CRUD Operations**: 
  - Create, update, and delete employee records.
  - Query employees by ID, designation, and department.
  - User authentication (signup and login) with JWT tokens.

### Frontend Features
- **Employee Dashboard**: View all employees in a table format.
- **Add Employee**: Add new employees to the system.
- **Search Employees**: Filter employees based on their name, email, department, or designation.
- **View Employee Details**: View detailed information about an employee.
- **Edit Employee**: Update the details of an existing employee.
- **Delete Employee**: Remove an employee from the system.

## Tech Stack

### Backend
- **GraphQL**: For building the API.
- **Node.js**: JavaScript runtime for the server.
- **MongoDB**: NoSQL database to store employee and user data.
- **Bcryptjs**: For hashing passwords.
- **jsonwebtoken**: For creating and verifying JWT tokens.
  
### Frontend
- **Angular**: For building the user interface.
- **Bootstrap**: For styling UI components.

### Docker
- **Docker**: For containerizing the backend, frontend, and database services.
- **Docker Compose**: To manage multi-container Docker applications (frontend, backend, and MongoDB).

## Installation

### Prerequisites
Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) 
- [Angular CLI](https://angular.io/cli)

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/di1ara/101376617_comp3133_assignment2.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd employee-management-dashboard
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of your project and add the following variables:
     ```bash
     MONGO_URI=mongodb://mongo:27017/employee-db
     JWT_SECRET=your-secret-key
     ```
   
4. **Build and start the application with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   This will build the backend, frontend, and MongoDB containers and start the application.

5. **Access the Application**:
   - **Frontend**: Open your browser and visit `http://localhost:4200` to access the Angular dashboard.
   - **Backend**: The backend (GraphQL API) will be available at `http://localhost:4000/graphql`.



- **backend**: Contains the GraphQL API server and associated files for MongoDB interaction.
- **frontend**: Contains the Angular application for the employee management dashboard.
- **docker-compose.yml**: Defines the services for the frontend, backend, and MongoDB containers.
- **.env**: Contains environment variables for database connection and JWT secret.

## API Endpoints

### Queries
- **Get All Employees**: 
  - `GET /graphql` with query `{ getAllEmployees { id, first_name, last_name, email, designation, department } }`
  
- **Get Employee by ID**:
  - `GET /graphql` with query `{ getEmployeeById(eid: "employee-id") { id, first_name, last_name, email, designation } }`
  
- **Search Employees by Designation or Department**:
  - `GET /graphql` with query `{ searchEmployees(designation: "Developer", department: "IT") { id, first_name, last_name, email } }`

### Mutations
- **Signup**: 
  - `POST /graphql` with mutation `{ signup(username: "user", email: "email", password: "password") { id, username, email } }`
  
- **Login**:
  - `POST /graphql` with mutation `{ login(email: "email", password: "password") { id, username, email, token } }`

- **Add Employee**:
  - `POST /graphql` with mutation `{ addEmployee(input: { first_name: "John", last_name: "Doe", email: "john.doe@example.com", ... }) { id, first_name, last_name } }`

- **Update Employee**:
  - `POST /graphql` with mutation `{ updateEmployee(eid: "employee-id", input: { first_name: "Jane", last_name: "Doe", ... }) { id, first_name, last_name } }`

- **Delete Employee**:
  - `POST /graphql` with mutation `{ deleteEmployee(eid: "employee-id") }`

