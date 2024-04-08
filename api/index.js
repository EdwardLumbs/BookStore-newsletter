import express from "express";
import booksRoute from "./routes/booksRoute.js";
import emailRoute from './routes/emailsRoute.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`)
});

app.use('/books', booksRoute);
app.use('/email', emailRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});