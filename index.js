require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;
const userroutes = require("./routes/user/routes");
const categoriesroutes = require("./routes/categories/routes");
const subscriptionsroutes = require("./routes/subscriptions/routes");
const coursesroutes = require("./routes/courses/routes");
const adminroutes = require("./routes/admin/routes");
const cors = require("cors");
const axios = require("axios");

mongoose.connect(mongoString);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected. Reconnecting...");
  mongoose.connect(mongoString);
});

db.on("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server Started at ${process.env.PORT || 4000}`);
});

app.use("/api", userroutes);
app.use("/api", categoriesroutes);
app.use("/api", subscriptionsroutes);
app.use("/api", coursesroutes);
app.use("/api", adminroutes);

app.use(express.static(__dirname + "/assets"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/listusers", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listuser"
    );
    const apiData = apiResponse.data;
    res.render("users", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listcategories", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listcategory"
    );
    const apiData = apiResponse.data;
    res.render("categories", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listcourses", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listcourse"
    );
    const apiData = apiResponse.data;
    res.render("courses", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listcoursecontent", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listcoursecontent"
    );
    const apiData = apiResponse.data;
    res.render("coursecontent", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listplans", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listplan"
    );
    const apiData = apiResponse.data;
    res.render("plans", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listcourseusers", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listcourseuser"
    );
    const apiData = apiResponse.data;
    res.render("courseusers", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listplanusers", async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/api/admin/listplanuser"
    );
    const apiData = apiResponse.data;
    res.render("planusers", { apiData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/editcategory", async (req, res) => {
  try {
    res.render("editcategory");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/editcoursecontent", async (req, res) => {
  try {
    res.render("editcoursecontent");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/editcourse", async (req, res) => {
  try {
    res.render("editcourse");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/editplan", async (req, res) => {
  try {
    res.render("editplan");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/edituser", async (req, res) => {
  try {
    res.render("edituser");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/createcategory", async (req, res) => {
  try {
    res.render("createcategory");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/createcourse", async (req, res) => {
  try {
    res.render("createcourse");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/createcoursecontent", async (req, res) => {
  try {
    res.render("createcoursecontent");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/createplan", async (req, res) => {
  try {
    res.render("createplan");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/createuser", async (req, res) => {
  try {
    res.render("createuser");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
