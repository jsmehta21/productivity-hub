# 📋 Poductivity Hub

A simple productivity web app combining a task management system (to-do list) with a Pomodoro timer.  
Built with **React**, **Firebase Authentication**, **Firestore**, and **Bootstrap** for styling.

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)<br>
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase&logoColor=white&style=for-the-badge)](https://firebase.google.com/)<br>
[![Bootstrap](https://img.shields.io/badge/Styling-Bootstrap-7952B3?logo=bootstrap&logoColor=white&style=for-the-badge)](https://getbootstrap.com/)<br>
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)](https://vercel.com/)<br>

---

## 🚀 Features
- ✅ User Authentication (Login, Signup, Logout)
- ✅ Add, View, and Filter Tasks (All / Completed / Pending)
- ✅ Pomodoro Timer (Manage your focus sessions)
- ✅ Responsive UI (Mobile Friendly)
- ✅ Task Analytics (View Completed and Pending tasks per day)
- ✅ Private Routes (Access control based on login)
- ✅ Hosted on **Vercel**

---

## 🛠 Tech Stack
- **Frontend:** React.js, Bootstrap 5
- **Backend:** Firebase (Authentication + Firestore Database)
- **Hosting:** Vercel

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/2bd3245d-4ccb-4a73-83ee-912a5ee473f4)

---

## 🔥 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jsmehta21/productivity-hub-jiya.git
   cd productivity-hub
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set up Firebase**
  - Go to Firebase Console
  - Create a project.
  - Enable Authentication (Email/Password).
  - Create a Firestore database.
  - Get your Firebase config and update it inside /src/firebase.js file.

4. **Run the Project Locally**
  ```bash
  npm start
  ```

---

## 🌍 Deployment
This project is deployed using Vercel.
To deploy:
- Push your project to GitHub.
- Connect your GitHub repo to Vercel.
- Set environment variables if required.
- Deploy 🚀

---

## ✨ Folder Structure
  ```pgsql
  src/
  │
  ├── components/
  │   ├── Analytics.js
  │   ├── Home.js
  │   ├── MyNavbar.js
  │   ├── Pomodoro.js
  │   ├── PrivateRoute.js
  │   ├── SelectPage.js
  │   ├── ToDoForm.js
  │   ├── ToDoList.js
      ├── UserProfile.js
  │   └── auth/
  │       ├── login.js
  │       └── signup.js
  │
  ├── context/
  │   └── AuthContext.js
  │
  ├── firebase.js
  ├── App.js
  ├── App.css
  ├── App.test.js
  ├── index.css
  ├── logo.svg
  ├── reportWebVitals.js
  ├── setupTests.js
  └── index.js
  ```

---

## 📧 Contact
If you like this project or have any suggestions, feel free to reach out - [jsmehta21](https://github.com/jsmehta21) <br>
Made with ❤️ by Jiya Mehta

---

## 🚀 Live Demo Link
Deployed Link - [Productivity Hub](https://productivity-hub-jiya.vercel.app/login)
