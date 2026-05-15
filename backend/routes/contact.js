const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS (must)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

// JSON body
app.use(express.json());