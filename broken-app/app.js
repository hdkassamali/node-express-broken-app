const express = require("express");
const userRoutes = require("./routes/users");
const { errorHandler } = require("./middleware/error");

const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
