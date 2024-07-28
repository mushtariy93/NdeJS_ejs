const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 3000;

const createViewPath = (page) => {
  return path.join(__dirname, "views", `${page}.ejs`);
};

const app = express();
app.set("view engine", "ejs");
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render(createViewPath("index"), { title: "Main", currentRoute: "/" });
});

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data;

    res.render(createViewPath("users"), {
      title: "Users",
      users,
      currentRoute: "/users",
    });
  } catch (error) {
    console.error(error);
    res.render(createViewPath("error404"), {
      title: "Error",
      message: "Failed to load users",
      currentRoute: "/users",
    });
  }
});

app.get("/jobs", (req, res) => {
  const jobs = [
    { title: "Software Developer", company: "Tech Corp", years: 3 },
    { title: "Project Manager", company: "Business Inc.", years: 2 },
    { title: "Designer", company: "Creative Studio", years: 4 },
  ];

  res.render(createViewPath("jobs"), {
    title: "Jobs",
    jobs,
    currentRoute: "/jobs",
  });
});

app.get("/contacts", (req, res) => {
  const contacts = [
    { name: "John Doe", phone: "555-555-5555", email: "john@example.com" },
    { name: "Jane Smith", phone: "555-123-4567", email: "jane@example.com" },
    { name: "Bob Johnson", phone: "555-987-6543", email: "bob@example.com" },
  ];

  res.render(createViewPath("contacts"), {
    title: "Contacts",
    contacts,
    currentRoute: "/contacts",
  });
});

app.get("/gallery", (req, res) => {
  res.render(createViewPath("gallery"), {
    title: "Gallery",
    currentRoute: "/gallery",
  });
});

app.use((req, res) => {
  res.render(createViewPath("error404"), {
    title: "404",
    currentRoute: req.url,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
