// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";


dotenv.config();

// Create an Express application
const app = express();

app.use(
  cors({
    origin: true,
  })
);

//for accepting json data
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/", userRoutes);
app.use("/question", questionRoutes)
app.use("/uploads", express.static(path.join("uploads")));

const port = 5000; // You can change this to your desired port

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
