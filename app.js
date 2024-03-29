const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const tendersRouter = require("./routes/tendersRouter");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tenders", tendersRouter);
app.use("/api/test", (req, res) => {
  res.status(200).json({
    message: "fuck off",
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/...",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
