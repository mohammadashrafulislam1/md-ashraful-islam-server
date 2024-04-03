import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { projectRouter } from './routes/project.js'; 
import dotenv from "dotenv";
import { clientRouter } from "./routes/client.js";

// Load environment variables from .env file
dotenv.config();

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2lboph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
  console.log("connected-DB");
 })
.catch((e)=>{console.log(e)});

app.use('/projects', projectRouter);
app.use('/clients', clientRouter)

app.get('/', (req, res)=>{
  res.json({msg: 'app is running'})
})
// listen for req
app.listen(4000, function () {
  console.log('listening on port 4000')
})
