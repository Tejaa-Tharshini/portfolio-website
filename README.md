# Tejaa Tharshini R - Portfolio Website

A modern, full-stack portfolio website built with React.js, Tailwind CSS, Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, gradient accents, and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **6 Sections**: Home, About, Projects, Skills, Experience, and Links
- **RESTful API**: Complete backend with MongoDB integration
- **Dark Theme**: Beautiful dark mode with vibrant accent colors

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

## 📁 Project Structure

```
portfolio-website/
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app with routing
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                # Express.js API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── server.js           # Express server
│   └── package.json
│
└── README.md
```

## 🏃‍♀️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (optional - works with default data)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

### Backend Setup

1. Create a `.env` file in the backend folder:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

2. Install dependencies and start:
```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Get profile info |
| `/api/projects` | GET | Get all projects |
| `/api/skills` | GET | Get all skills |
| `/api/experience` | GET | Get work experience |
| `/api/links` | GET | Get social links |
| `/api/health` | GET | Health check |

## 🎨 Customization

### Update Your Information

1. **Profile**: Edit `backend/routes/profile.js` default data or add to MongoDB
2. **Projects**: Edit `frontend/src/pages/Projects.jsx` or use API
3. **Skills**: Edit `frontend/src/pages/Skills.jsx` or use API
4. **Experience**: Edit `frontend/src/pages/Experience.jsx` or use API
5. **Links**: Update social links in `frontend/src/pages/Links.jsx`

### Colors

Customize colors in `frontend/tailwind.config.js`:
- `primary`: Blue accent colors
- `accent`: Purple/pink accent colors
- `dark`: Background colors

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy dist folder to Vercel
```

### Backend (Render)

1. Push your backend to GitHub
2. Connect to Render
3. Set environment variables (MONGODB_URI, PORT)
4. Deploy!

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

Made by Tejaa Tharshini R
