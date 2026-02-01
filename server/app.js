const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connect_db');
const cors = require('cors');
const CategoryRouter = require('./routes/CategoryRoute');
const ColorRouter = require('./routes/ColorRoute');
const BrandRouter = require('./routes/BrandRoute');
const ProductRouter = require('./routes/ProductRoute');
const UserRouter = require('./routes/UserRoute');

dotenv.config('.env') //in the bracket .env is the file name. or you can also write any name and then end it with ".env". 
const app = express();
app.use(cors(
    { origin: "http://localhost:3000" }
));
app.use(express.json());
app.use(express.static("public"));
// http://localhost:5000/images/category/20251125_180203_728_login.svg.png
// URL for accessing photos
//lives the public folder in the server/backend folder so that images can be accessed directly using the url and the image file name

app.use('/brand', BrandRouter)
app.use('/category', CategoryRouter);
app.use('/colors', ColorRouter);
// app.use('/order')
app.use('/product', ProductRouter)
app.use('/user', UserRouter)
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