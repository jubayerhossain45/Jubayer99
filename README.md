# 🚀 Jubayer Abir — Full Stack Developer Portfolio

A production-ready personal portfolio website with a modern dark editorial design, built with React + Vite (frontend) and Node.js + Express + MongoDB (backend), featuring a fully functional contact form with Gmail email notifications.

---

## 📸 Features

- ⚡ **Blazing-fast React frontend** (Vite + TypeScript + Tailwind CSS)
- 🎨 **Dark editorial design** — deep navy/charcoal with electric cyan accents
- 🔤 **Typewriter animation** in the hero for multiple roles
- 🌌 **Animated particle background** in the hero section
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🌀 **Scroll-triggered animations** via Intersection Observer
- 📬 **Working contact form** → saves to MongoDB + sends dual Gmail notifications
- 🍃 **MongoDB Atlas** data persistence with Mongoose ODM
- 📧 **Nodemailer + Gmail SMTP** — owner notification + sender auto-reply
- ✅ **Server-side validation** with express-validator
- 🔒 **CORS-protected** REST API

---

## 🗂️ Project Structure

```
portfolio/
├── backend/                        # Node.js + Express REST API
│   ├── server.js                   # Express app entry point
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Your secrets (NOT in git)
│   ├── .env.example                # Template for .env
│   ├── models/
│   │   └── Message.js              # Mongoose schema for contact messages
│   └── routes/
│       └── contact.js              # POST /api/contact route
├── src/                            # React frontend source
│   ├── App.tsx                     # Root component
│   ├── index.css                   # All styles (dark theme + animations)
│   ├── main.tsx                    # React entry point
│   └── components/
│       ├── Navbar.tsx              # Fixed responsive navigation
│       ├── Hero.tsx                # Fullscreen hero + particle canvas
│       ├── About.tsx               # About section with profile
│       ├── Skills.tsx              # Animated skill bars by category
│       ├── Projects.tsx            # Project cards grid
│       ├── Contact.tsx             # Contact form → API call
│       ├── Footer.tsx              # Footer with social links
│       ├── BackToTop.tsx           # Scroll-to-top button
│       └── Toast.tsx               # Success/error notifications
├── public/
│   └── images/
│       └── profile.jpg             # Your profile photo
├── index.html                      # HTML entry (Vite)
├── vite.config.ts
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **npm** v9+ (bundled with Node.js)
- **MongoDB Atlas account** (free) → [mongodb.com/atlas](https://mongodb.com/atlas)
- **Gmail account** with 2-Step Verification enabled

---

## 🖥️ Frontend Setup

The frontend is a React + Vite + TypeScript app. It builds to a single `dist/index.html`.

```bash
# From the project root
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build for production → dist/
npm run preview    # Preview the production build
```

> **Note:** Update personal details (name, bio, projects, social links) in the component files under `src/components/`.

---

## ⚙️ Backend Setup

### Step 1 — Install dependencies

```bash
cd backend
npm install
```

### Step 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=your.email@gmail.com
```

### Step 3 — Start the server

```bash
node server.js          # Production
npm run dev             # Development (with nodemon auto-restart)
```

You should see:
```
✅ MongoDB connected successfully
📧 Email transporter ready
🚀 Server running on http://localhost:5000
📬 Contact API → http://localhost:5000/api/contact
```

---

## 🍃 MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → **Create a free account**
2. Create a new **Free Cluster** (M0 Sandbox)
3. Under **Database Access** → Add a database user:
   - Username: `jubayer_abir` (or anything you prefer)
   - Password: strong auto-generated password → **Copy it!**
   - Role: `Atlas admin` or `Read and write to any database`
4. Under **Network Access** → Add IP Address:
   - Click **Allow Access From Anywhere** → `0.0.0.0/0` (for development)
   - In production: add only your server IP
5. Under **Clusters** → Click **Connect** → **Connect your application**:
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string → paste into `.env` as `MONGODB_URI`
   - Replace `<password>` with your actual database password
   - Replace `myFirstDatabase` with `portfolio`

---

## 📧 Gmail App Password Setup

> ⚠️ **Critical:** Gmail requires an App Password — your regular Gmail password **will not work**.

**Step-by-step:**

1. Go to [myaccount.google.com](https://myaccount.google.com) → **Security**
2. Make sure **2-Step Verification** is **ON** (required for App Passwords)
3. In the search bar at the top of Security page, type **"App Passwords"**
4. Click **App Passwords** → You may need to sign in again
5. At the bottom, select:
   - **App:** Mail
   - **Device:** Other (custom name) → type `Portfolio`
6. Click **Generate**
7. A **16-character password** will appear (e.g., `abcd efgh ijkl mnop`)
8. Copy it → paste into `.env` as `GMAIL_APP_PASSWORD`
9. Click **Done**

> ℹ️ The spaces in the 16-character password are optional — `abcdefghijklmnop` also works.

---

## 🔌 API Reference

### `POST /api/contact`

Submit a contact form message.

**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hi Jubayer, I'd love to work with you on..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": "65a1b2c3d4e5f6789abcdef0"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Please enter a valid email address",
  "errors": [...]
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

### `GET /api/health`

Health check endpoint.

```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 142.3,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🌍 Environment Variables Reference

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Server port (default: 5000) | `5000` |
| `FRONTEND_ORIGIN` | Yes | Frontend URL for CORS | `http://localhost:5173` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` |
| `GMAIL_USER` | Yes | Your Gmail address | `you@gmail.com` |
| `GMAIL_APP_PASSWORD` | Yes | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `OWNER_EMAIL` | Yes | Email to receive contact notifications | `you@gmail.com` |

---

## 🎨 Customization Guide

### Personal Information
Update these files with your details:

| File | What to update |
|---|---|
| `src/components/Hero.tsx` | Your name, roles in the typewriter, bio text |
| `src/components/About.tsx` | Bio paragraphs, location, education, stats |
| `src/components/Skills.tsx` | Skill names and proficiency levels |
| `src/components/Projects.tsx` | Project names, descriptions, tech stacks, GitHub/live links |
| `src/components/Contact.tsx` | Your email, LinkedIn, GitHub, Twitter links |
| `src/components/Footer.tsx` | Social media URLs |
| `index.html` | Page title and meta description |
| `public/images/profile.jpg` | Your actual profile photo |

### Theme Colors
All design tokens are in `src/index.css` under `:root`:

```css
:root {
  --clr-bg:       #0a0a0f;    /* Main background */
  --clr-accent:   #00e0ff;    /* Electric cyan — change to your preferred accent */
  --clr-accent-2: #7b2fff;    /* Secondary accent for gradients */
  ...
}
```

---

## 🚀 Production Deployment

### Frontend (Vercel / Netlify)

```bash
npm run build
# Upload the dist/ folder to Vercel or Netlify
```

On Vercel, connect your GitHub repo and it will auto-deploy.

> **Important:** Update the API URL in `src/components/Contact.tsx` from `http://localhost:5000` to your production backend URL.

### Backend (Railway / Render / DigitalOcean)

1. Push the `backend/` folder to a separate GitHub repo (or a monorepo)
2. Connect to [Railway](https://railway.app) or [Render](https://render.com)
3. Add all environment variables in the platform dashboard
4. The `npm start` script (`node server.js`) will be used automatically

### Production Checklist

- [ ] Update `FRONTEND_ORIGIN` in backend `.env` to your actual frontend domain
- [ ] Update the API fetch URL in `Contact.tsx` to your backend domain
- [ ] Restrict MongoDB Atlas IP access to your server's IP only
- [ ] Ensure `NODE_ENV=production` is set
- [ ] Enable MongoDB Atlas connection string SSL (already on by default with Atlas)
- [ ] Set up a custom domain for both frontend and backend

---

## 🛡️ Security Notes

- `.env` is in `.gitignore` — **never commit real credentials**
- Passwords are validated server-side (not just client-side)
- Input is sanitized and length-limited to prevent abuse
- CORS is restricted to your frontend origin in production
- MongoDB Atlas uses TLS/SSL encryption by default
- Gmail App Passwords are scoped to a single application

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| `MongoDB connection failed` | Check your `MONGODB_URI`, whitelist your IP in Atlas |
| `Email transporter not ready` | Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct |
| `CORS error` in browser | Set `FRONTEND_ORIGIN` to your exact frontend URL |
| App Password not accepted | Make sure 2-Step Verification is enabled on your Google account |
| Form shows "Network error" | Ensure backend server is running on port 5000 |
| Images not loading | Place your profile photo at `public/images/profile.jpg` |

---

## 📦 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling (reset only) |
| Custom CSS | — | All portfolio-specific styles |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| Mongoose | 7.6 | MongoDB ODM |
| Nodemailer | 6.9 | Email sending |
| express-validator | 7.0 | Input validation |
| cors | 2.8 | Cross-origin requests |
| dotenv | 16.3 | Environment variables |

---

## 📄 License

MIT — feel free to fork, customize, and use this as your own portfolio!

---

## 👤 Author

**Jubayer Abir**
- 📧 Email: [jubayer123abir@gmail.com](mailto:jubayer123abir@gmail.com)
- 🐙 GitHub: [@jubayerabir](https://github.com/jubayerabir)
- 💼 LinkedIn: [linkedin.com/in/jubayerabir](https://linkedin.com/in/jubayerabir)
- 🌐 Portfolio: [jubayerabir.dev](https://jubayerabir.dev)

---

*Built with ♥ in Dhaka, Bangladesh*
