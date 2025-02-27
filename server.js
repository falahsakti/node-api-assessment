require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorMiddleare");
const db = require("./models/");
const studentRoutes = require("./routes/studentRoutes");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", studentRoutes);

app.use(errorHandler);

db.sequelize.sync().then((req) => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
