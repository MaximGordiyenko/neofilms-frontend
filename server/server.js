import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import 'dotenv/config'
import slideRouter from './routes/slide.js';
import { corsOptions } from './config/corsOptions.js';
import { createDBIfNotExists } from './DB.js';

const PORT = process.env.SERVER_PORT || 4001;
const app = express();

// app.use(credentials);
app.use(cors(corsOptions));

app.listen(PORT, async () => {
  try {
    console.info(`Server is running on port ${PORT}`);
    await createDBIfNotExists('neofilm', 'maxim');
  } catch (error) {
    console.error('Error starting the server:', error);
  }
});

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
app.use(cookieParser());

app.use(slideRouter);
