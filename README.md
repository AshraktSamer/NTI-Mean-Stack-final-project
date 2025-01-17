# NTI Mean Stack Final Project

This is the final project for the NTI MEAN Stack program. It is a full-stack web application that uses the MEAN stack (MongoDB, Express, Angular, Node.js). The project consists of both the backend (Node.js and Express) and frontend (Angular) applications.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)

## Project Overview

This project is designed to manage a simple e-commerce platform. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with Angular. The application allows users to interact with a variety of resources such as products, orders, and user authentication.

## Technologies Used

- **Frontend:**
  - Angular
  - TypeScript
  - HTML, CSS
  - Angular CLI
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - Multer for file uploads

- **Others:**
  - Git for version control
  - Visual Studio Code (or your preferred code editor)

## Installation Instructions

To run this project locally, you'll need to set up both the backend and frontend applications. Follow the steps below.

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/AshraktSamer/NTI-Mean-Stack-final-project.git
   cd NTI-Mean-Stack-final-project


2. Navigate to the backend directory: 
   ```bash
   cd backend


3. Install the required dependencies:
   ```bash
   npm install

4. Set up environment variables: Create a .env file and configure your environment variables (e.g., database URL, JWT secret, etc.).

5. Start the backend server:
   ```bash
   nodemon start app

### Frontend


1. Navigate to the nodeMart (or frontend) directory: 
   ```bash
    cd nodeMart

2. Install the frontend dependencies:
   ```bash
   npm install

3. Run the Angular development server: 
   ```bash
    ng serve


## Usage
- Once both the backend and frontend servers are running:
   - Open the frontend in your browser at http://localhost:4200.
   -  The backend API is accessible at http://localhost:5000 (or the port you've configured).
   - Use the app for managing products, placing orders, and managing user authentication.


