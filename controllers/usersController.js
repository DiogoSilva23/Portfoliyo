const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const connection = require('../config')
require('dotenv').config()

exports.getUsers = async (req, res) => {
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
    connection.end()
};

exports.register = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const email = user.email;

  

  if (checkVariables(username, password, email)){
    return res.status(500).send({
      msg: "É necessario preencher todos os campos"
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);


  const userExists = await existingUser(email);

  if (!userExists) {
    const newUser = {
      username: username,
      email: req.body.registerEmail,
      password: hashedPassword,
      location: req.body.registerLocation,
      description: req.body.registerDescription,
      gender: req.body.gender,
      birtdate: req.body.registerDate,
      visibleProfile: req.body.visibleProfile
    };
    console.log('teste2', newUser);

    try {
      await createUser(newUser.email, newUser.username, newUser.password); // Call the newUser function to insert the user into the database

      return res.status(201).send({
        msg: `${username} was created.`
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        msg: "An error occurred while creating the user."
      });
    }
  } else {
    return res.status(409).send({
      msg: `The user already exists. Try again.`
    });
  }
};

function checkVariables(...variables) {
  for (let i = 0; i < variables.length; i++) {
    if (typeof variables[i] === 'undefined' || variables[i].trim() == '') {
      return true; // At least one variable is undefined
    }
  }
  return false; // All variables are defined
}


function existingUser(email) {
    // Query to check if the user exists
    const query = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
    return new Promise((resolve, reject) => {
      connection.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          const count = result[0].count;
          resolve(count > 0); // Returns true if the count is greater than 0
        }
      });
    });
  }

function createUser(email, username, password) {
    id = generateRandomId(email)
    // Query to insert a new user
    const query = `INSERT INTO users (id, email, username, pword) VALUES ('${id}', '${email}', '${username}', '${password}')`;
  
    return new Promise((resolve, reject) => {
      connection.query(query, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  function generateRandomId(email) {
    const randomString = Math.random().toString(36).substring(2); // Generate a random string 
    console.log(randomString)
    const data = email + randomString; // Combine email with random string
  
    const hash = crypto.createHash('sha256'); // Use SHA-256 hash function
    const hashedData = hash.update(data).digest('hex'); // Generate the hash of the combined data
  
    const id = hashedData.substr(0, 20); // Take the first 20 characters as the ID
  
    return id;
  }

  exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email.length == 0){
      return res.status(405).json({ msg: `Email não inserido!` })   //verificar se pode ser 405
    }
    if (password.length == 0){
      return res.status(405).json({ msg: `Password não inserida!` })  //verificar se pode ser 405
    }
    const userExist = await existingUser(email)
    if (!userExist) {
        return res.status(404).json({ msg: `Email não correspondente a nenhuma conta` })
    };
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(query, async function (err, result) {
      if (err) {
          return res.status(500).send({msg: "Erro no Log in"});
      }
      const user = result[0];
      const samePassword = await bcrypt.compare(password, user.pword)
      if (!samePassword){
          return res.status(401).json({ msg: `Password invalida!` })
      }
      //const accessToken = generateAccessToken(user) 
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      //token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      return res.status(201).json({ msg: `Logado com sucesso`, token: refreshToken})

  })
}

function generateAccessToken(user) {
    console.log(user, process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "300s"
    })
}
