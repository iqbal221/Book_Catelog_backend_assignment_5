import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

//middleware
app.use(cors());

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api end point
app.use('/api/v1/', router);

//global error handling
app.use(globalErrorHandler);

export default app;
