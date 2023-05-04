/*
const http = require('http')
const port = 8000
*/

const express = require('express')
const bcrypt = require('bcrypt')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

let users = require("./db/users.json")

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/index.html', function(req, res, next) {
    res.sendFile('/index.html')
})

/*
app.get('/users', (req, res) => {
    res.json(users)
})
*/

function existingUser(email) {
    for (user of users) {
        if (user.email === email) {
            return true;
        }
        
    }
    return false;
}

function write(fich, db) {
    fs.writeFile(fich, JSON.stringify(db, null, 4), 'utf8', err => {
        if (err) {
            console.log(`Error writing file: ${err}`)
        } else {
            console.log('Wrote on file ' + fich); 
        }
    })
}

app.post('/signUp', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        if (!existingUser(req.body.email)) {
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }
            
            if (newUser.password.length < 7) {
                return res.status(400).send({
                    msg: `Password must be at least 7 characters long!`
                })
            }
            users.push(newUser)
            write("./db/users.json", users);
            return res.status(201).send ({
                msg: `${username} was created.`
            });
        } else {
            return res.status(409).send({
                msg: `The user already exists. Try again.`
            })
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(8000)

// Might be usefull
/*
const server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('public/index.html', function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write("Erro: Ficheiro não encontrado.")
        } else {
            res.write(data)
        }
        res.end()
    })
})

server.listen (port, function(error) {
    if (error) {
        console.log("Deu erro" , error)
    } else {
        console.log("Server está a ouvir na porta " + port)
    }
})
*/