# 📝 To-Do Full Stack App

A simple and clean full-stack To-Do application where users can add, update, delete, and mark tasks as complete.

---

## 🚀 Features

* ➕ Add new task
* ✏️ Edit / Update task
* ❌ Delete task
* ✅ Mark task as complete
* 📄 Pagination support
* 💾 Data stored in MongoDB

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

---

## 📁 Project Structure

```
todo/
├── backend/
│   ├── server.js
│   ├── package.json
│
├── todo-frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

---

## 🔹 2. Backend Setup

Go to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
MONGO_URL=your_mongodb_connection_string
```

Start backend server:

```
node server.js
```

👉 Backend runs on:
http://localhost:5000

---

## 🔹 3. Frontend Setup

Open a new terminal and go to frontend folder:

```
cd todo-frontend
```

Install dependencies:

```
npm install
```

Start React app:

```
npm start
```

👉 Frontend runs on:
http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Add new task  |
| PUT    | /tasks/:id | Update task   |
| DELETE | /tasks/:id | Delete task   |

---

## 🧠 How It Works

* React (frontend) sends request to backend
* Backend (Node + Express) handles logic
* MongoDB stores data
* UI updates after API response

---

## 🧪 Usage

* Add a new task using the input box
* Edit or delete tasks using action buttons
* Click on a task to mark complete/incomplete
* Use pagination controls to navigate pages

---

## 🎨 Customization

* Update styles in `App.css` for UI design
* Modify backend logic in `server.js` to add features

---

## 🔐 Environment Variables

| Key       | Description                     |
| --------- | ------------------------------- |
| MONGO_URL | MongoDB Atlas connection string |

---

## 🎯 Future Improvements

* 🔐 Add authentication (login/signup)
* 📅 Add due date feature
* 🎨 Improve UI design
* 🌍 Deploy project

---

## 🙋‍♀️ Author

**Nisha Yadav**

---

## 📜 License

This project is for educational purposes.

---

## ⭐ Support

If you like this project, please ⭐ the repository!
