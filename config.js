/*
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
//connection.query("INSERT INTO users VALUES (1, 'a', 'a@a', 'pass', 'html://1', 'html://2')")
*/


import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = createConnection(process.env.DATABASE_URL);

console.log('Connected to PlanetScale!');

export default connection;