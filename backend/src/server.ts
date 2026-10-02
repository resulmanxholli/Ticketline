import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

await connectDb(env.MONGODB_URI);
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
