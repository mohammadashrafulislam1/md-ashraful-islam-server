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

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = ['https://mdashrafulislam-portfolio.netlify.app', 'http://localhost:3000'];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));


app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2lboph.mongodb.net/personalDB?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


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
