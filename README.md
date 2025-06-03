# ⚡ Charging Station Management System

A full-stack web application to manage electric vehicle charging stations with features like user authentication, station listings, filters, and a map view.

## 🌐 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, Google Maps
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📁 Project Structure
charging-station/
├── backend/
│ ├── db/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── public/
│ ├── src/
│ └── vite.config.js


---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/charging-station.git
cd charging-station

cd backend
npm install
npm run dev

open new terminal
cd frontend
npm install
npm run dev

Create a .env file inside the backend folder:

PORT=3000
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/charging-station?retryWrites=true&w=majority
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret
NODE_ENV=development

chage baseurl in frontend > service > authservice.js file for locally run the project
baseURL: "http://localhost:3000/api",






