# User Authentication and Authorization API

# Postman API Document link
    https://documenter.getpostman.com/view/41728894/2sB3HtGHgN

A secure RESTful API for user authentication and authorization, built with Node.js, Express.js, and MongoDB. The API uses JSON Web Tokens (JWT) for secure, token-based authentication and follows the Model-View-Controller (MVC) design pattern for clear separation of concerns.

## Features

-   **User Registration**: Create a new user with a hashed password.
-   **User Login**: Authenticate existing users and issue a JWT bearer token.
-   **Protected Routes**: Secure endpoints using middleware to verify the JWT.
-   **User Profile Retrieval**: Access a protected route to get the authenticated user's information.
-   **Password Hashing**: Securely store user passwords using `bcrypt`.
-   **Environment Configuration**: Manage sensitive data with `.env` files.
-   **Input Validation**: Basic validation for registration and login requests.
-   **MVC Pattern**: A well-organized codebase with separate folders for models, controllers, and routes.

## Technologies Used

-   **Node.js**: The JavaScript runtime environment.
-   **Express.js**: A fast and minimalist web framework for Node.js.
-   **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **MongoDB**: The NoSQL database for storing user data.
-   **JSON Web Token (JWT)**: For creating and managing access tokens.
-   **Bcrypt**: For hashing and securing passwords.
-   **Dotenv**: For loading environment variables from a `.env` file.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (LTS version recommended)
-   MongoDB (local or cloud-hosted)
-   Postman (or a similar tool) for testing the API endpoints

## Getting Started

Follow these steps to get your project up and running.

2. Install dependencies
npm install express mongoose jsonwebtoken bcrypt dotenv
3.Environment variables
.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
--------------------------------------------------------------------
4.API Endpoints
Base URL
http://localhost:3000/auth

1. Register a new user
----------------------

Endpoint: POST /auth/register
Description: Registers a new user and saves their hashed password to the database.
Request Body:
json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
####Success Response (201 Created)
json
{
  "message": "User registered successfully"
}

Error Responses:
-----------------
400 Bad Request: Invalid input (e.g., missing fields, invalid email, weak password).
400 Bad Request: User with that email already exists.
500 Internal Server Error: Server-side issues.
--------------------------------------------------------------------------------------------
2. Log in a user
Endpoint: POST /auth/login
Description: Authenticates a user and returns a JWT on successful login.
Request Body:
json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Success Response (200 OK):
json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Error Responses:
-----------------
400 Bad Request: Invalid email or password.
400 Bad Request: User not found.
500 Internal Server Error: Server-side issues.
--------------------------------------------------------------------------------
3. Get authenticated user's profile
Endpoint: GET /auth/me
Description: Retrieves the profile of the currently authenticated user. This route is protected and requires a valid JWT.
Authorization Header:
Authorization: Bearer <your-jwt-token>
Success Response (200 OK):
json
{
  "user": {
    "_id": "60c72b2f9b1d8d001f8e4c7d",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2021-06-14T12:00:00.000Z",
    "updatedAt": "2021-06-14T12:00:00.000Z"
  }
}
Error Responses:
401 Unauthorized: No token provided, invalid token, or invalid authorization type.
404 Not Found: User not found.
500 Internal Server Error: Server-side issues.
----------------------------------------------------------------------------------------------------
How to Test with Postman
Register a User: Make a POST request to http://localhost:3000/auth/register with the required JSON body.
Log In: Make a POST request to http://localhost:3000/auth/login. Copy the token from the response.
Access Protected Route: Make a GET request to http://localhost:3000/auth/me. In the Headers tab, add a new key-value pair:
Key: Authorization
Value: Bearer <paste_your_token_here>



