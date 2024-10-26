import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import 'dotenv/config'

import api from "./api";
import { responseFormatter, errorHandler, notFound } from "./middlewares/response";

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", error => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Store Management API",
      description: "Store Management API Information",
      contact: {
        name: "duynguyen"
      }
    },
    servers: [
      {
        url: "http://localhost:5001/api/v1"
      }
    ]
  },
  apis: [
    "src/api/auth.js",
    "./src/api/emojis.js"
  ]
};

const app = express();

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(responseFormatter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄"
  });
});

app.use("/api/v1", api);

app.use(notFound);

export default app;
