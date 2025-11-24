const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connect_db');
const CategoryRouter = require('./routes/CategoryRoute');
const cors = require('cors');
// const ColorRouter = require('./routes/ColorRoute');

dotenv.config('.env') //in the bracket .env is the file name. or you can also write any name and then end it with ".env". 
const app = express();
app.use(cors(
    { origin: "http://localhost:3000" }
));
app.use(express.json())

// app.use('/brand')
app.use('/category', CategoryRouter);
// app.use('/color', ColorRouter);
// app.use('/order')
// app.use('/product')
// app.use('/user')
// app.use('/variant')

connectDB()
    .then(
        () => {
            console.log('DB Connected');
            app.listen(
                '5000',
                () => console.log('Server Started')
            )
        }
    )
    .catch(
        console.log('Unable to start the server.')
    )