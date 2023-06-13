const bcrypt = require('bcrypt')
const connection = require('../config')

exports.getUsers = async (req, res) => {
    console.log("TESTE2")
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
    connection.end()

    

    /*
    const items = [
        { id: 1, name: 'Item 1', price: 123321 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 },
        { id: 2, name: 'Item 2', price: 12213123123 },
        { id: 9, name: 'Item 3', price: 30 },
      ];
      res.json(items);
      */
};

exports.signUp = async (req, res) => {
    console.log('Juan1')
    try {
        console.log('Juan2')
        const username = req.body.username
        console.log(username)
        const salt = await bcrypt.genSalt()
        console.log('Juan4')
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
};