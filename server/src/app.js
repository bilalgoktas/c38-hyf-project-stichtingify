import express from "express";
import cors from "cors";
import session from "express-session";
import eventRouter from "./routes/event.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import userRouter from "./routes/user.js";
import connectMongoSession from "connect-mongodb-session";
import handleErrors from "../error/handleErrors.js";
const MongoDBSessionStore = connectMongoSession(session);
import dotenv from "dotenv";
dotenv.config();

const { SESSION_SECRET, MONGODB_URL } = process.env;

// Create an express server
const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!

// SESSIONS

// Save sessions into MongoDB collection "sessions"
const sessionStore = new MongoDBSessionStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

// Init express-sessions
app.use(
  session({
    store: sessionStore,
    proxy: true,
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

app.use("*", cloudinaryConfig);

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/events", eventRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(handleErrors);

export default app;
