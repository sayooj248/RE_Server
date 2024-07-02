import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoute from './Routes/UserRoute.js'
import AuthRoute from './Routes/AuthRoute.js'
import cookieParser from 'cookie-parser';
import AddRoute from './Routes/AddRoute.js'
dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const app=express()

  app.use(express.json());
  app.use(cookieParser());

  const PORT =3000 || process.env.PORT


app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});


app.use('/api/user',UserRoute);
app.use('/api/auth',AuthRoute);
app.use('/api/add', AddRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 406
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})