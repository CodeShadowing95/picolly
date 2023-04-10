import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Every routes inside the postRoutes will gonna start with 'posts'
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  try {
    res.send('Hello to PICOLLY API');
  } catch (error) {
    alert(error.message);
  }
  
});

const PORT = process.env.PORT || 5000;

// To connect to the database
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
