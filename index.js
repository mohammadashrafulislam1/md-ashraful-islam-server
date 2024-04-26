import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { projectRouter } from './routes/project.js'; 
import dotenv from "dotenv";
import { clientRouter } from "./routes/client.js";
import { testRouter } from "./routes/testimonial.js";

// Load environment variables from .env file
dotenv.config();

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json())

try {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2lboph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
  console.log("connected-DB");
} catch (e) {
  console.error(e);
  // Handle connection error appropriately (e.g., return an error message)
}


app.use('/projects', projectRouter);
app.use('/clients', clientRouter)
app.use('/testimonial', testRouter)

app.get('/', (req, res)=>{
  res.json({msg: 'app is running'})
})
// listen for req
app.listen(4000, function () {
  console.log('listening on port 4000')
})
