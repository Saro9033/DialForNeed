const express = require('express')
const mongoose = require('mongoose')
const errorMiddleware = require('./middlewares/error')
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const category = require('./routes/category')
const brand = require('./routes/brand')
const employee = require('./routes/employee')
const payment = require('./routes/payment')
const task = require('./routes/task')

const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
const corsOptions = {
    origin: 'https://dial-for-need.web.app', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
};

app.use(cookieParser())

app.use(cors(corsOptions));

app.use(express.json())



//for storing avatar image into uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/', products)
app.use('/api/', auth)
app.use('/api/', order)
app.use('/api/', category)
app.use('/api/', brand)
app.use('/api/', employee)
app.use('/api/', payment)
app.use('/api/', task)

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../Frontend/dialforneed/dist'), {
        setHeaders: (res, path, stat) => {
            if (path.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
        }
    }));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dialforneed/dist/index.html'));
    });
}

app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to ${process.env.PORT} and running in ${process.env.NODE_ENV}`);
    })
}).catch(err => {
    console.log(err);
})


