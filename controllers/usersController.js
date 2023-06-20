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

exports.registerUser = async (req, res) => {
  console.log('AQUIIII')
  const user = req.body;
  const username = user.username.trim();
  const name = user.name;
  const password = user.password;
  const email = user.email.trim();
  const location = user.location;
  const description = user.description;
  const gender = user.gender;
  const birtdate = user.birtdate;
  const visibleProfile = user.visibleProfile;

  //Mudar alguns checks (gender nao pode ser gender)
  if (checkVariables(username, name, password, email, location, description, gender, birtdate, visibleProfile)){
    return res.status(500).send({
      msg: "É necessario preencher todos os campos"
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  //Verificar se existe o nome ou o email associados a uma empresa ou a um utilizador
  const userExists = await existingUser(username);
  
  if (userExists){
    return res.status(409).send({
      msg: `Username em uso!`
    });
  }
  const emailExists = await existingEmail(email);
  if (emailExists){
    return res.status(409).send({
      msg: `Email ja registado!`
    });
  }

  if (!userExists) {
    const newUser = {
      username: username,
      name: name,
      email: email,
      password: hashedPassword,
      location: location,
      description: description,
      gender: gender,
      birtdate: birtdate,
      visibleProfile: visibleProfile
    };

    try {
      await createUser(newUser); // Call the newUser function to insert the user into the database

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
    if (typeof variables[i] === 'undefined') {
      if(variables[i].trim() === ''){
        return true; // At least one variable is undefined
      }
    }
  }
  return false; // All variables are defined
}

function existingEmail(email) {
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

function existingUser(user) {
  console.log(user)
  // Query to check if the user exists
  const query = `SELECT COUNT(*) AS count FROM users WHERE nick = '${user}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        const count = result[0].count;
        console.log('NUMERO', count)
        resolve(count > 0); // Returns true if the count is greater than 0
      }
    });
  });
}

async function createUser(user) {
    id = await generateRandomId(user.email)
    if (user.visibleProfile == true){
      visibleProfile = 1;
    } else{
      visibleProfile = 0;
    }
    // Query to insert a new user
    const query = `INSERT INTO users (id, nick, email, userName, pword, birthDate, gender, userDescription, location, companiesView, userAdmin) VALUES ('${id}', '${user.username}', '${user.email}', '${user.name}', '${user.password}', '${user.birtdate}', '${user.gender}', '${user.description}', '${user.location}', '${visibleProfile}', 0)`;
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
    console.log('TESTEEEEE')
    const randomString = Math.random().toString(36).substring(2); // Generate a random string 
    console.log(randomString)
    const data = email + randomString; // Combine email with random string
  
    const hash = crypto.createHash('sha256'); // Use SHA-256 hash function
    const hashedData = hash.update(data).digest('hex'); // Generate the hash of the combined data
  
    const id = hashedData.substr(0, 20); // Take the first 20 characters as the ID
    
    return id;
  }

  exports.loginUser = async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const pword = req.body.pword;
    console.log('TESTE123', email, pword)
    if (email.length == 0){
      return res.status(405).json({ msg: `Email não inserido!` })   //verificar se pode ser 405
    }
    if (pword.length == 0){
      return res.status(405).json({ msg: `Password não inserida!` })  //verificar se pode ser 405
    }
    const emailExist = await existingEmail(email)
    if (!emailExist) {
        return res.status(404).json({ msg: `Email não correspondente a nenhuma conta` })
    };

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(query, async function (err, result) {
      if (err) {
          return res.status(500).send({msg: "Erro no Log in"});
      }
      const user = result[0];
      if (pword === user.pword){
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        return res.status(201).json({ msg: `Logado com sucesso`, token: refreshToken, user: user})
      }
      const samePassword = await bcrypt.compare(pword, user.pword)
      if (!samePassword){
          return res.status(401).json({ msg: `Password invalida!` })
      }
      //const accessToken = generateAccessToken(user) 
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      //token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      return res.status(201).json({ msg: `Logado com sucesso`, token: refreshToken, user: user})

  })
}

function generateAccessToken(user) {
    console.log(user, process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "300s"
    })
}

exports.registerCompany = async (req, res) => {
  const company = req.body;
  const companyName = company.companyName
  const email = company.email
  const password = company.password
  const websiteURL =  company.websiteURL
  const logoURL = company.logoURL
  const description = company.description
  

  if (checkVariables(companyName, email, password, websiteURL, logoURL, description)){
    return res.status(500).send({
      msg: "É necessario preencher todos os campos"
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  //Verificar se existe o nome ou o email associados a uma empresa ou a um utilizador
  const companyExists = await existingCompany(email);

  if (!companyExists) {
    const newCompany = {
      companyName: companyName,
      email: email,
      password: hashedPassword,
      websiteURL: websiteURL,
      logoURL: logoURL,
      description: description
    };

    try {
      await createCompany(newCompany); // Call the newUser function to insert the user into the database

      return res.status(201).send({
        msg: `${companyName} was created.`
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


function existingCompany(email) {
  // Query to check if the user exists
  const query = `SELECT COUNT(*) AS count FROM companies WHERE email = '${email}'`;
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

async function createCompany(company) {
  id = await generateRandomId(company.email)
  // Query to insert a new user
  const query = `INSERT INTO companies (id, companieName, companieDescription, siteUrl, email, pword, logoUrl, validated) VALUES ('${id}', '${company.companyName}', '${company.description}', '${company.websiteURL}', '${company.email}', '${company.password}', '${company.logoURL}', 0)`;
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

exports.loginCompany = async (req, res) => {
  const email = req.body.email;
  const pword = req.body.pword;
  console.log('YOOOO', email, pword)
  if (email.length == 0){
    return res.status(405).json({ msg: `Email não inserido!` })   //verificar se pode ser 405
  }
  if (pword.length == 0){
    return res.status(405).json({ msg: `Password não inserida!` })  //verificar se pode ser 405
  }
  const companyExist = await existingCompany(email)
  if (!companyExist) {
      return res.status(404).json({ msg: `Email não correspondente a nenhuma conta` })
  };
  const query = `SELECT * FROM companies WHERE email = '${email}'`;
  connection.query(query, async function (err, result) {
    if (err) {
        return res.status(500).send({msg: "Erro no Log in"});
    }
    const company = result[0];
    if(pword === company.pword){
      const refreshToken = jwt.sign(company, process.env.REFRESH_TOKEN_SECRET)
      return res.status(201).json({ msg: `Logado com sucesso`, token: refreshToken, company: company})
    }
    const samePassword = await bcrypt.compare(pword, company.pword)
    if (!samePassword){
        return res.status(401).json({ msg: `Password invalida!` })
    }
    //const accessToken = generateAccessToken(user) 
    const refreshToken = jwt.sign(company, process.env.REFRESH_TOKEN_SECRET)
    //token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.status(201).json({ msg: `Logado com sucesso`, token: refreshToken, company: company})
})
}

function existingCompany(email) {
  // Query to check if the user exists
  const query = `SELECT COUNT(*) AS count FROM companies WHERE email = '${email}'`;
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

