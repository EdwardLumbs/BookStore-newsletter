import express from 'express';
import pool from '../database/db.js';
import { errorHandler } from '../error.js';

const router = express.Router()

router.post('/addBook', async (req, res) => {
    const { title, author, year, genre } = req.body;
    try {
        await pool.query(`INSERT INTO books (title, author, year, genre)
            VALUES ($1, $2, $3, $4)`,
            [title, author, year, genre]);
        res.status(201).json('Book added successfully');
    } catch (error) {
        console.log(error)
        next(error);
    }
})

router.get("/getBooks", async (req, res, next) => {
    try {
        const data = await pool.query(`SELECT * 
            FROM books`)

        if (data.rows.length === 0) {
            return next(errorHandler(404, 'No Books found'));
        };

        res.status(200).json(data.rows);
    } catch (error) {
        next(error)
    }

    // try {
    //     const books = await Book.find({})
        
    //     return response.status(200).json({
    //         count: books.length,
    //         data: books
    //     });
    // } catch (error) {
    //     console.log(error.message)
    //     response.status(500).send({message: error.message})
    // }

})

router.get("/getBook/:id", async (req, res, next) => {
    const { id } = req.params

    try {
        const data = await pool.query(`SELECT * 
            FROM books
            WHERE id = $1`,
            [id])

        if (data.rows.length === 0) {
            return next(errorHandler(404, 'Book not found'));
        }

        const book = data.rows[0];

        res.status(200).json(book);
    } catch (error) {
        next(error)
    }
})

router.delete('/deleteBook/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        const result = await pool.query(`DELETE FROM books
            WHERE id = $1`,
            [id])
        
        if (!result) {
            return next(errorHandler(404, 'Book not found'));
        } 

        res.status(200).send('Book deleted successfully')

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

export default router