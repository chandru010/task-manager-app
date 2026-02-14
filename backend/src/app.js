const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const { authenticate } = require("./middlewares/auth.middleware");
const { authorize } = require("./middlewares/role.middleware");
const taskRoutes = require("./routes/task.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.get("/api/v1/protected", authenticate, (req, res) => {
  res.json({ message: "Protected route working!", user: req.user });
});

app.get(
  "/api/v1/admin-only",
  authenticate,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }

);

app.use("/api/v1/tasks", taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
