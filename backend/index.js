import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import movieReviewRoutes from "./routes/movieReviewsRoutes.js";
import castReviewRoutes from "./routes/castReviewsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGO_ATLAS_URI;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/movie-review", movieReviewRoutes);
app.use("/cast-review", castReviewRoutes);
app.get("/", (req, res) => res.send("Welcome to the Movie-Review API!"));
app.all("*", (req, res) => res.send("Route doesn't exist."));

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export { app };
