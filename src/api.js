const express = require('express');
require('express-async-errors');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const categoriesRoute = require('./routes/categoriesRoute');
const loginRoute = require('./routes/loginRoute');
const postsRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postsRoute);

app.use(errorHandlerMiddleware);

module.exports = app;
