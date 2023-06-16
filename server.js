const router = require("./routes/routes")

const http = require('http');
const https = require('https')
const httpolyglot = require('httpolyglot')
const express = require('express')

const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(express.static('public'))
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

console.log('Portfoliyo Online', process.env.REFRESH_TOKEN_SECRET)

// Criar server SSL com key e certificado
const sslServer = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/certificate.pem')
}

// Criar server para ter as conexões http e https na mesma port
const server = httpolyglot.createServer(sslServer, app)

// Verificar se o server está a correr
server.listen(8000, () => console.log("O servidor está a correr na porta 8000."))

// Redirecionar HTTP para HTTPS
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url)
    }
    next()
})

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

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus
})

