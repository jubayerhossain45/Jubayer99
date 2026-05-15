const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECT
========================= */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

/* =========================
   NODEMAILER
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* =========================
   GMAIL VERIFY
========================= */
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Gmail Error:", error.message);
  } else {
    console.log("✅ Gmail Ready");
  }
});

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});

/* =========================
   CONTACT API
========================= */
app.post("/api/contact", async (req, res) => {

  try {

    console.log("==================================");
    console.log("📩 নতুন Form Submit হয়েছে");

    const { name, email, message } = req.body;

    /* =========================
       SHOW TERMINAL DATA
    ========================= */
    console.log("👤 Name:", name);
    console.log("📧 Email:", email);
    console.log("💬 Message:", message);

    /* =========================
       VALIDATION
    ========================= */
    if (!name || !email || !message) {

      console.log("❌ Missing Fields");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* =========================
       SEND EMAIL
    ========================= */
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Message From ${name}`,

      html: `
        <h2>📩 New Portfolio Message</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong><br/>
          ${message}
        </p>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log("==================================");

    /* =========================
       SUCCESS RESPONSE
    ========================= */
    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });

  } catch (error) {

    console.log("❌ FULL ERROR:");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});