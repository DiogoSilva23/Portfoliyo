/*
const http = require('http')
const port = 8000
*/

const express = require('express')
const bcrypt = require('bcrypt')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

let users = require("./db/users.json")
let refreshTokens = require("./db/refreshTokens.json")

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

function authenticateToken(req, res, next) {
    const authHeader = req.headers["autorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "300s"
    })
}

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

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) {
        return res.sendStatus(401)
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        const accessToken = generateAccessToken({email: user.email})
        res.json({accessToken: accessToken})
    })
})

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.email === req.user.email))
})

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

// Verificar o Login mais tarde
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        for (user of users) {
            if (user.email === email) {
                if (await bcrypt.compare(password, user.password)) {
                    const accessToken = generateAccessToken(user)
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                    res.json({ accessToken: accessToken, refreshToken: refreshToken })
                    token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(201).json({
                        auth: true,
                        token: token
                    })
                } else {
                    return res.status(401).json({ msg: "Invalid Password!" })
                }
            }
        }
    } catch {
        res.status(500).send();
    }
    return res.status(404).json({ msg: "User not found!" })
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus
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