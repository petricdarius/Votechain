//cron task
require("./utils/cronTask");

//pre-installed
const path = require("path");
const express = require("express");

//installed from npm
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const compression = require("compression");
const cors = require("cors");

//utils imports
const AppError = require("./utils/appError");

//controllers imports
const globalErrorHandler = require("./controllers/errorController");

//routes imports
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");
const candidatesRoutes = require("./routes/candidatesRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP! Please try again in one hour.",
});
app.use("/api", limiter);

app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

app.use(mongoSanitize());

app.use(xss());

app.use(compression());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Backend routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/elections", electionRoutes);
app.use("/api/v1/candidates", candidatesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
