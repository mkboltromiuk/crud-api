
````markdown
# Express User Management API

This project is a simple user management API built with Express.js. It allows for user registration, login, and the ability to secure routes using JSON Web Tokens (JWT). The API supports user creation, login, and authorization with JWT tokens. The project uses **SQLite** as the database.

## Features

-   **User Registration**: Allows new users to register by providing their first name, last name, email, password, and role.
-   **User Login**: Allows registered users to log in by providing their email and password.
-   **JWT Authentication**: Generates a JWT token for authenticated users.
-   **User Role**: Supports two user roles: `user` and `admin`.

## Technologies Used

-   **Express.js**: Web framework for Node.js.
-   **Sequelize ORM**: ORM to interact with the SQLite database.
-   **Bcrypt.js**: Library for hashing passwords.
-   **JWT (JSON Web Tokens)**: For securing API endpoints.
-   **SQLite**: Lightweight database used for development and testing.
-   **Swagger**: API documentation.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mkboltromiuk/crud-api.git
    ```
````

2. Navigate to the project directory:

    ```bash
    cd express-user-api
    ```

3. Install the dependencies:

    ```bash

    npm init -y
    
    npm install

    npm install express sequelize sqlite3 dotenv
    
    npm install --save-dev nodemon


    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    JWT_SECRET=your_jwt_secret_key
    DB_NAME=your_database_name.db
    PORT=3000
    ```

    This will set up the database connection to SQLite. By default, Sequelize will create the database file (`your_database_name.db`) in the project directory.



## API Endpoints

### 1. Register a New User

-   **URL**: `/api/auth/register`
-   **Method**: `POST`
-   **Body**:

    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "user"
    }
    ```

-   **Response** (Success):

    ```json
    {
        "user": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "role": "user"
        },
        "token": "your_generated_jwt_token"
    }
    ```

-   **Response** (Error):
    ```json
    {
        "error": "Error message"
    }
    ```

### 2. Login a User

-   **URL**: `/api/auth/login`
-   **Method**: `POST`
-   **Body**:

    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

-   **Response** (Success):

    ```json
    {
        "user": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "role": "user"
        },
        "token": "your_generated_jwt_token"
    }
    ```

-   **Response** (Error):
    ```json
    {
        "error": "Invalid credentials"
    }
    ```

## Authentication

After registering or logging in, the user will receive a JWT token. This token should be included in the `Authorization` header of subsequent requests to protected routes.

For example:



```bash
curl -X GET http://localhost:3000/api/protected-endpoint \
-H "Authorization: Bearer your_generated_jwt_token"
```

Remember of adding to another CRUD operations:

```bash
-H "Authorization: Bearer your_generated_jwt_token"
```


## Testing with CURL

### Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
```

### Log in as a User

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Another CRUD Operations

http://localhost:3000/api-docs

## Running the Application

To start the application in development mode:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Documentation

The API is documented using Swagger. You can access the Swagger UI by visiting `http://localhost:3000/api-docs` after starting the server.

