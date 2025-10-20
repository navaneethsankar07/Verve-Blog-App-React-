# ![Verve Blog](https://img.icons8.com/ios-filled/50/000000/blog.png) Verve Blog App

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)](https://reactjs.org/) 
[![Firebase](https://img.shields.io/badge/Firebase-9.22.1-orange?logo=firebase&logoColor=white)](https://firebase.google.com/) 
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) 
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A modern blogging platform built with **React**, **Firebase**, and **Tailwind CSS**. Users can read blogs without logging in, but creating, editing, and deleting posts requires authentication. Sign in via email/password or Google account.  

---

## **🌟 Features**

- **Public Home Page**: Explore all blog posts without signing in.
- **Authentication**:
  - Email & Password sign up/login
  - Google Sign-In
- **Blog Management**:
  - Create new posts
  - Edit/Delete your own posts in **My Blogs**
- **Responsive Design**: Works seamlessly on desktop & mobile.
- **Notifications**: User feedback using **React Toastify**.

---

## **📄 Pages**

| Page | Description |
|------|-------------|
| **Home** | Lists all posts from all users. |
| **My Blogs** | Displays posts by the logged-in user with edit/delete options. |
| **Create Post** | Allows creating new blog posts. |

---

## **🛠 Getting Started**

### **Prerequisites**
- Node.js installed
- Firebase account
- Git installed

### **Installation**
```bash
git clone https://github.com/navaneethsankar07/Verve-Blog-App-React-.git
cd Blog-Project
npm install

Firebase Setup
Create a Firebase project.

Enable Authentication (Email/Password & Google Sign-In).

Enable Firestore Database.

Replace Firebase config in your project with your credentials.

Run Locally
npm start
Visit http://localhost:5173.

firebase deploy
🔒 Security
Public users can read all posts.

Only authenticated users can create, edit, delete their own posts.

Firestore security rules enforce access control.

💻 Technologies Used
React

Firebase (Authentication & Firestore)

Tailwind CSS

React Router DOM

React Toastify

📜 License
This project is licensed under the MIT License.
