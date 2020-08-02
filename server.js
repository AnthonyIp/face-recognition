const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const colors = require('colors')
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");
const hpp = require('hpp');
const cors = require('cors');
dotenv.config({path: './config/config.env'});

//  Routes
const auth = require('./routes/auth');
const user = require('./routes/user');

const app = express();

// Body parser
app.use(bodyParser.json());
// app.use(express.json());

//Enable CORS
app.use(cors());

// Middlewares
// Dev logging development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security Helmet
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max     : 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Prevent http param pollution
app.use(hpp());


app.get('/', (req, res) => {
    res.send('hello');
});

// Controllers
app.use('/api/auth', auth);
app.use('/api/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:  ${err.message}`.red);
    //    close server  & exit process
    server.close(() => process.exit(1));
});
