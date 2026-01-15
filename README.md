# SpendWise 💰

SpendWise is a **full-stack expense tracking web application** that helps users manage their income and expenses efficiently.  
It is built using the **MERN stack** with a modern React (Vite) frontend and a Node.js + Express backend connected to MongoDB.

---

## 🚀 Features
- Add income and expense transactions
- View transaction history
- Automatic balance calculation
- RESTful API backend
- MongoDB database integration
- Responsive and clean UI

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6)
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

---

## 📁 Project Structure

```
FSD_project/
└── spendwise/
    ├── client/        # React frontend
    └── server/        # Express backend
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd spendwise
```

---

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend server:
```bash
node index.js
```

---

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/transactions` | Fetch all transactions |
| POST | `/transaction` | Add a new transaction |
| DELETE | `/transaction/:id` | Delete a transaction |

---

## 📦 Database
- MongoDB Atlas / Local MongoDB
- Schema includes:
  - Title
  - Amount (positive = income, negative = expense)
  - Date

---

## 🎯 Future Enhancements
- User authentication
- Category-wise expense tracking
- Charts & analytics
- Monthly reports
- Deployment on cloud

---

## 👩‍💻 Author
1. Sameksha - PES1PG25CS057
2. Sereen Varghese - PES1PG25CS059
M.Tech – Computer Science  
Full Stack Development Project

---

## 📜 License
This project is for **academic and learning purposes**.
