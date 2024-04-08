import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

router.post('/addEmail', async (req, res, next) => {
    const {email} = req.body
    console.log(email)
    try {
        await pool.query(`INSERT INTO email (email)
            VALUES ($1)`,
            [email]);
        res.status(201).json('Email Registered Successfully')
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router