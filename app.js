import dotenv from 'dotenv';
import 'express-async-errors';
dotenv.config()
import express from 'express';
import connectDB from './db/connect.js';
import errorHandler from './middlewares/error-handler.js';
import notFound from './middlewares/not-found.js';
import morgan from 'morgan';
import productRouter from './routes/products.route.js';
import cors from 'cors';
import path from 'path'
const app = express();

// middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(morgan('dev'))

// routes
app.use('/api/v1/products', productRouter)

app.get('/', (req, res) => {
    res.sendFile(path.resolve('static', 'documentation.html'))
})

// custom middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000;
(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
})();

