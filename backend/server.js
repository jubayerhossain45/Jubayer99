const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ================= CORS ================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

/* ================= ENV CHECK ================= */
if (!process.env.MONGODB_URI) {
  console.log("❌ MONGODB_URI missing");
}

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.log("❌ Gmail env missing");
}

/* ================= MONGODB ================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err.message));

/* ================= SCHEMA ================= */
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

/* ================= NODEMAILER ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend Running OK");
});

app.get("/api/test", (req, res) => {
  res.json({ success: true });
});

/* ================= CONTACT API ================= */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    /* SAVE TO DB */
    const saved = await Contact.create({
      name,
      email,
      subject,
      message
    });

    console.log("📦 Saved:", saved);

    /* SEND EMAIL */
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Message: ${subject || "No Subject"}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ success: true, message: "Message sent" });

  } catch (err) {
    console.log("❌ ERROR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ================= START ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});