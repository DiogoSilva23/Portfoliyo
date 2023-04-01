/*
const http = require('http')
const fs = require('fs')
const port = 8000
*/
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/index.html', function(req, res, next) {
    res.sendFile('/index.html')
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