const express = require("express");
const cors = require("cors");
const router = require("./src/routes/route");
const GlobalError = require("./src/middlewares/globalErrorMiddleware");
const corsOptions = require("./src/middlewares/corsMiddleware");
const backgroundService = require("./src/utils/backgroundService");

backgroundService.deleteExpiredStories();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(GlobalError);
app.use(cors());
app.use("/api", router);

module.exports = app;
