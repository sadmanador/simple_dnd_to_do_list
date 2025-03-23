# Task Manager App - Full Stack Application

## Overview

This is a full-stack task management application built using **Next.js**, **NextAuth**, **Mongoose**, **MongoDB**, and **Axios**. The app allows users to register, log in, manage tasks, and track progress with a simple and intuitive interface. Users can add, edit, check off, and delete tasks while maintaining an organized to-do list. The app is built with security in mind, with password hashing and secure user authentication.

## Features

### 1. **User Registration and Authentication:**

- Users must register to access the app.
- After registering, users can log in using their email and password.
- Passwords are securely hashed and stored in the database using a hashing algorithm.
- Users are redirected to the task page after a successful login.

### 2. **Task Management:**

- Once logged in, users are taken to the task page where they can:
  - Add a new task by typing in an input field and clicking the "Add" button.
  - Edit existing tasks by clicking an "Edit" button next to the task.
  - Mark tasks as completed by clicking a "Checkmark" button.
  - Permanently delete tasks by clicking a "Delete" button.
- Tasks are stored in a MongoDB database and are tied to the user’s account.

### 3. **Logout Functionality:**

- Users can log out, which redirects them back to the home page.

### 4. **Security:**

- Passwords are securely hashed for safety using a password hashing algorithm before being stored in the database.
- The application uses **NextAuth** to handle secure authentication via credentials (email and password).

## Missing Features

While the current version of the app is functional, some features are yet to be implemented:

1. **User Profile Picture Upload:**

   - Currently, users cannot upload or change their profile picture. This feature will be added in the future.

2. **Profile Picture Editing:**
   - The ability for users to update their profile picture is still pending.

## Future Prospects

The following features and improvements are planned for future versions of the app:

1. **Drag and Drop (DND) Task Management:**

   - The user interface will be enhanced with drag-and-drop functionality to make managing tasks more intuitive and fun.

2. **Mobile Responsiveness:**

   - The app will be made fully responsive to ensure it works seamlessly on mobile devices.

3. **State Management with Redux:**

   - The app will incorporate Redux for better state management, particularly when dealing with more complex state handling.

4. **Multi-Select Tasks:**

   - The ability to bulk select tasks and perform batch actions (like marking multiple tasks as complete) will be added.

5. **Social Login:**

   - Users will be able to log in using social accounts like Google, Facebook, or GitHub for quicker authentication.

6. **Basic and Pro Tiers:**

   - Users will be able to choose between a Basic and Pro subscription, with the Pro tier offering additional features (such as unlimited tasks).

7. **Password Format Restrictions:**
   - To ensure stronger passwords, a password format validation will be added. This will enforce:
     - Special characters
     - At least one digit
     - Minimum length requirements

## Technologies Used

- **Next.js**: A React framework for building the application.
- **NextAuth.js**: For handling secure user authentication.
- **Mongoose**: MongoDB object modeling for Node.js.
- **MongoDB**: NoSQL database used for storing user data and tasks.
- **Axios**: For making HTTP requests to the backend.

## Setup and Installation

To run the application locally, follow these steps:

### Prerequisites:

- Node.js (v14 or later)
- MongoDB (cloud or local instance)
- Next.js app

### Steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sadmanador/simple_dnd_to_do_list.git
   ```

2. **Clone the repository:**

   ```bash
   cd project_name
   npm i
   ```
