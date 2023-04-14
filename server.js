import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import authenticateUser from './middleware/auth.js';

import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

const app = express();

//routers

//Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get('/', (eq, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

//Has to be tle last as it hasto catch all the routes not matching
app.use(notFoundMiddleware);

//Has to be the last. Used to catch errors in existing routes
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

//mongoose returns a promise, so async await
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
