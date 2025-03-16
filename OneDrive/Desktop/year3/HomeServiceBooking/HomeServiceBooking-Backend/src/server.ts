import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes";
import requiterRoutes from "./routes/requiterRoutes";
import adminRoutes from "./routes/adminRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import connectCloudinary from "./config/cloudinary";

//initialize express
const app = express();

//cloudinary connect
(async () => {
  await connectCloudinary();
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/requiter", requiterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
