import fs from 'fs';
import path from 'path';
import { pool } from './db.js';
import { hash } from 'bcrypt';
// import { sign } from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const __dirname = import.meta.dirname;

dotenv.config();

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "../data.sql"), 'utf-8');
    pool.query(sql);
}

const insertTestUser = async (email, password) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query("INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *", 
            [email, hashedPassword]
        );
    });
}

const getToken = async (email) => {
    return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY)
}

export { initializeTestDb, insertTestUser, getToken };