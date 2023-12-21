require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;
const userroutes = require("./routes/user/routes");
const categoriesroutes = require("./routes/categories/routes");
const subscriptionsroutes = require("./routes/subscriptions/routes");
const coursesroutes = require("./routes/courses/routes");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

app.use("/api", userroutes);
app.use("/api", categoriesroutes);
app.use("/api", subscriptionsroutes);
app.use("/api", coursesroutes);
