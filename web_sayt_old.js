const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

const createViewPath = (page) => {
  return path.join(__dirname, "views", `${page}.html`);
};

const app = express();
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile(createViewPath("index"));
});

app.get("/users", (req, res) => {
  res.sendFile(createViewPath("users"));
});

app.get("/jobs", (req, res) => {
  res.sendFile(createViewPath("jobs"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(createViewPath("gallery"));
});

app.get("/contact", (req, res) => {
  res.sendFile(createViewPath("contact"));
});

app.use((req, res) => {
  res.sendFile(createViewPath("error404"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
