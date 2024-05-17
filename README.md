# 🏦 Bank Claim Management System

## 📄 Description

**Claim Management System** is an innovative web-based application designed to facilitate the seamless management of customer claims within a banking environment. Leveraging the **NestJS** framework for the backend and **Next.js** for the frontend, this system provides a robust and user-friendly interface for customers to submit their issues and for back-office agents to efficiently process and redirect claims to the appropriate specialized agents within the bank.

## 📚 Table of Contents

- [📥 Installation](#installation)
  - [🔄 Clone the Repository](#clone-the-repository)
  - [🚀 Running with Yarn](#running-with-yarn)
  - [🐳 Running with Docker](#running-with-docker)
  - [🛠️ Using Prisma Studio](#using-prisma-studio)
- [🔌 API Endpoints](#api-endpoints)
  - [🔐 Auth](#auth)
  - [📋 Claims](#claims)
  - [👤 Users](#users)
- [📜 Swagger Documentation](#swagger-documentation)

## 📥 Installation

### 🔄 Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/0xUNS/claim-management-system.git
cd bank-claim-management-system
```


### 🚀 Running with Yarn

1. Install Dependencies:
    ```bash
    yarn install
    ```
2. Set Up Environment Variables: Create a .env file in the root directory and add your environment variables. Example:

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    ```
3. Run Database Migrations:

    ```bash
    npx prisma migrate dev
    ```
4. Start the Application:

    ```bash
    yarn start:dev
    ```

## 🐳 Running with Docker

1. Build and Run Docker Containers:
    ```bash
    docker-compose up --build
    ```
2. Run Database Migrations:
    ```bash
    docker-compose exec app npx prisma migrate dev
    ```
### 🛠️ Using Prisma Studio

Prisma Studio is a visual editor for the database. To use it:

1. Start Prisma Studio:
    ```bash
    npx prisma studio
    ```
2. Access Prisma Studio: Open your browser and navigate to `http://localhost:5555`.


## 🔌 API Endpoints

### 🔐 Auth

- **POST** /auth/local/register - *Register a new user*.
- **POST** /auth/local/login - *Login a user*.
- **POST** /auth/logout - *Logout a user*.
- **POST** /auth/refresh - *Refresh authentication tokens*.


### 📋 Claims

- **GET** /claims - *Retrieve a list of claims.*
      Query Parameters:
          page: number
          limit: number
          search: string
          status: PENDING, ONGOING, REJECTED, RESOLVED, CANCELLED
          archived: true | false

- **POST** /claims - *Create a new claim.*

- **GET** /claims/{id} - *Retrieve a claim by ID.*

- **PATCH** /claims/{id} - *Update a claim by ID.*

- **PATCH** /claims/{id}/cancel - *Cancel a claim by ID.*

- **PATCH** /claims/{id}/archive - *Archive a claim by ID.*


### 👤 Users

- **GET** /users/current - *Retrieve the current user's information.*
- **PATCH** /users - *Update the current user's information.*


## 📜 Swagger Documentation

For detailed API documentation, visit the Swagger UI at `/api`.

---

Feel free to reach out if you need more information or assistance! 
