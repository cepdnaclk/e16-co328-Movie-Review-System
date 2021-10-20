import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.get("/", (req, res) => res.send("Welcome to the Movie-Review API!"));
app.all("*", (req, res) => res.send("Route doesn't exist."));

app.listen(PORT, () =>
    console.log(`Server running on PORT : http://localhost:${PORT}`)
);
