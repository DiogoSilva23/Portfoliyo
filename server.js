const router = require("./routes/routes")

const https = require('https')
const express = require('express')
const bcrypt = require('bcrypt')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()




app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.get('/index.html', function(req, res, next) {
    res.sendFile('/index.html')
})

const sslServer = https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert:fs.readFileSync('cert/certificate.pem')
}, app)

app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

sslServer.listen(8000, () => console.log("O servidor está a correr na porta 8000."))

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

app.use(router)
/*
app.post('/signUp', async (req, res) => {
    try {
        const username = req.body.username
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        if (!existingUser(req.body.email)) {
            const newUser = {
                username: username,
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
*/

// Verificar o Login mais tarde
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        for (user of users) {
            if (existingUser(email)) {
                if (await bcrypt.compare(password, user.password)) {
                    const accessToken = generateAccessToken(user)
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                    res.json({ accessToken: accessToken, refreshToken: refreshToken })
                    token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(201).json({ msg: `Lezgooo` })
                } else {
                    return res.status(401).json({ msg: `Invalid Password!` })
                }
            } else {
                return res.status(404).json({ msg: `User not found!` })
            }
        }
    } catch {
        res.status(500).send();
    }
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus
})

console.log("--------TESTE-----------")
console.log("--------TESTE-----------")

//connection.query("INSERT INTO users VALUES (1, 'a', 'a@a', 'pass', 'html://1', 'html://2')")
//connection.query("INSERT INTO users (1, 'a', 'a@a', 'aaa')");
/*

*/


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