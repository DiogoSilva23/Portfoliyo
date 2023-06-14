/*
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

*/

/*
dotenv.config();

const connection = createConnection(process.env.DATABASE_URL);

console.log('Connected to PlanetScale!');

export default connection;
*/

/* MUDAR ISTO DEPOIS
require('dotenv').config() 
const mysql = require('mysql2') 
const connection = mysql.createConnection(process.env.DATABASE_URL) 
console.log('Connected to PlanetScale!') 
// Middleware function to handle the database connection 
const databaseMiddleware = (req, res, next) => {
        req.connection = connection     
        next() 
} 
module.exports = connection;*/