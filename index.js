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
