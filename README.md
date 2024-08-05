# User Management Portal

A React Project for Managing Multiple Users & Features.

## Overview

This project is a React application designed to manage multiple user roles: Super Admin, Workspace Admin, and Employee. Each user role has specific permissions and capabilities. The application includes authentication, user management, workspace management, and various other features with responsive design and custom UI using Tailwind CSS.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>=18.0.0)
- npm (>=9.1.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AksharPrajapati/user-management-portal.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-management-portal
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Start Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Steps to follow

1. Login as Admin

- Email: admin@gmail.com
- Password: Admin@1234

2. Create a Workspace

- Provide the workspace credentials to the Workspace Admin.

3. Login as Workspace Admin

- Use the provided workspace credentials to access the workspace dashboard.

4. Create an Employee

- In the workspace dashboard, create an employee with their email address.

5. Register the Employee

- Note the employee ID.
- Register the employee using their email address and a password.

6. Login as the Registered Employee

- Use the newly registered credentials to log in.
- Access the employee dashboard.

Note: Direct registration is not allowed for any type of user.
