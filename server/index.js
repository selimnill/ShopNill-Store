import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoute.js";
import ProductRoutes from "./routes/ProductRoutes.js";
//configure env
dotenv.config();

//databse config
connectDB();

const corsOptions ={
  origin:'https://shopnill-store-zeta.vercel.app', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: ["https://shopnill-store-zeta.vercel.app/","shopnill-store-39soa01g7-mohammad-selims-projects.vercel.app", "shopnill-store-git-main-mohammad-selims-projects.vercel.app", "https://shopnill-store-81k3nbuf1-mohammad-selims-projects.vercel.app" ]
}));
app.use(cors(corsOptions));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);

app.use("/", (req, res)  => {
  res.send("Server is Running on Vercel");
})

//PORT
const PORT = process.env.PORT || 9000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
