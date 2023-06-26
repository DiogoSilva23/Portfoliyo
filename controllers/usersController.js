const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const connection = require('../config')
require('dotenv').config()

exports.getUsers = async (req, res) => {
    console.log("GET USERS")
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
      });
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
  if (checkVariables(username, name, password, email, location, description, gender, birtdate)){
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

  if (gender === "gender"){
    return res.status(409).send({
      msg: `Gender not valid`
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
        msg: `${username} was created with success. Can login now`
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
  console.log("variaveis ->", variables)
  for (let i = 0; i < variables.length; i++) {
    if (typeof variables[i] === "undefined") {
      return true
    }
    if(variables[i].trim() === ""){
      return true; // At least one variable is undefined or ""
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
          createPortfolio(id, user);
          resolve(result);
        }
      });
    });
  }

function createPortfolio(id, user){
  const query = `INSERT INTO portfolios (id, nick, email, userName, birthDate, userDescription, location, companiesView) VALUES ('${id}', '${user.username}', '${user.email}', '${user.name}', '${user.birtdate}', '${user.description}', '${user.location}', '${visibleProfile}')`;
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
    const email = req.body.email;
    const pword = req.body.pword;
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
  const password = company.pword
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
        msg: `${companyName} was created with success. Can logIn now`
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

  const companyValid = await validatedCompany(email)
  console.log('VALIDACAO', companyValid)
  if (!companyValid){
    return res.status(405).json({ msg: `Empresa ainda nao validada por um Admin! Aguarde por validaçao` })
  }

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



function validatedCompany(email) {
  // Query to check if the user exists
  const query = `SELECT validated FROM companies WHERE email = '${email}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result[0])
        const count = result[0].validated;
        resolve(count > 0); // Returns true if the count is greater than 0
      }
    });
  });
}


exports.portfolioGet = async (req, res) => {
  const email = req.body.email;  
  const query = `SELECT * FROM portfolios WHERE email = '${email}'`;
  connection.query(query, async function (err, result) {
    if (err) {
        return res.status(500).send({msg: "Erro ao tentar obter o portfolio"});
    }
    const portfolio = result[0];
    return res.status(201).json({ msg: `Logado com sucesso`,  portfolio: portfolio})
})
}

exports.portfolioSaveSidebar = async (req, res) => {
  const sidebar = req.body;
  const userId = sidebar.userId;
  const userSideBarImage = sidebar.userSideBarImage;
  const userSidebarName = sidebar.userSidebarName;
  const userSidebarPhone = sidebar.userSidebarPhone;
  const userSidebarBirthday = sidebar.userSidebarBirthday;
  const userSidebarLocation = sidebar.userSidebarLocation;

  const query = `UPDATE portfolios SET profileImageURL = '${userSideBarImage}', userName = '${userSidebarName}', userName = '${userSidebarName}', phone = '${userSidebarPhone}', birthDate = '${userSidebarBirthday}', location = '${userSidebarLocation}'  WHERE id = '${userId}'`;
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

exports.portfolioSaveAboutMe = async (req, res) => {
  const aboutMe = req.body.description;
  const id = req.body.userId;
  const query = `UPDATE portfolios SET userDescription = '${aboutMe}' WHERE id = '${id}'`;
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

exports.getEnterprises = async (req, res) => {
  console.log("GET Enterprises")
  connection.query("SELECT * FROM companies", function (err, result, fields) {
      if (err) throw err;

      res.json(result);
    });
};

exports.addFriends = async (req, res) => {
  myNick = req.body.myNick;
  friend = req.body.friend;
  userExists = await existingUser(friend)
  if (!userExists){
    return res.status(404).json({ msg: `Utilizador não existe` })
  }
  
  if(alredyFriends(friend, myNick)){
    return res.status(404).json({ msg: `Utilizador já é seu amigo` })
  }

  try {
    await addNewFriend(friend, myNick); 

    return res.status(201).send({
      msg: `${friend} request sent successfully!`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "An error occurred while trying to add the friend."
    });
  }

}

async function addNewFriend(friend, nick) {
  // Query to insert friends
  const query = `INSERT INTO friends (friend1_nick, friend2_nick, accepted) VALUES ('${nick}', '${friend}', 0)`;
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

async function alredyFriends(friend, nick){
  const query = `SELECT COUNT(*) AS count FROM friends 
               WHERE (friend1_nick = '${nick}' AND friend2_nick = '${friend}')
               OR (friend1_nick = '${friend}' AND friend2_nick = '${nick}')`;
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


exports.getExperiences = async (req, res) => {
  const id = req.body.id;
  console.log("GET Experiences")
  console.log(req.body)
  
  console.log(`SELECT * FROM experiences WHERE idPortffolio = "${id}";`);
  connection.query(`SELECT * FROM experiences WHERE idPortfolio = '${id}'`, function (err, result, fields) {
      if (err) throw err;
      console.log(result)
      res.json(result);
    });
};

exports.getEducations = async (req, res) => {
  const id = req.body.id;
  console.log("GET Educations")
  connection.query(`SELECT * FROM educations WHERE idEducation = '${id}'`, function (err, result, fields) {
      if (err) throw err;

      res.json(result);
    });
};


exports.addExperience = async (req, res) => {

  const experience = req.body;
  const id = experience.userId;
  const localName = experience.experienceTitle;
  const logoUrl = experience.experienceImage;
  const inicialDate = experience.experienceInitialDate;
  const finalDate = experience.experienceFinalDate;
  const functionsDescription = experience.experienceDescription;
  
  console.log(experience);
  const query = `INSERT INTO experiences (idPortfolio, localName, logoUrl, inicialDate, finalDate, functionsDescription) VALUES ('${id}', '${localName}', '${logoUrl}', '${inicialDate}', '${finalDate}', '${functionsDescription}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
}

exports.addEducation = async (req, res) => {
  const education = req.body;
  const id = education.userId;
  const schoolName = education.schoolName;
  const curseName = education.curseName;
  const curseType = education.curseType;
  const media = education.media;

  const query = `INSERT INTO educations (idPortfolio, schoolName, curseName, curseType, media) VALUES ('${id}', '${schoolName}', '${curseName}', '${curseType}', '${media}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        resolve(result);
      }
    });
  });
}

exports.deleteExperience = async (req, res) => {
  const experience = req.body;
  const id = experience.id;

  const query = `DELETE FROM experiences WHERE idExperiences = '${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        resolve(result);
      }
    });
  });
}

exports.deleteEducation = async (req, res) => {
  const education = req.body;
  const id = education.id;

  const query = `DELETE FROM educations WHERE idEducation = '${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        resolve(result);
      }
    });
  });
}

exports.getFriends = async (req, res) => {
  console.log(req)
  const nick = req.body.nick;
  console.log("GETFriends", nick)
  const query = `SELECT * FROM friends WHERE friend1_nick = '${nick}' OR friend2_nick = '${nick}'`;
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
};
