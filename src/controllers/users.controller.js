const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const { v4 } = require("uuid");
const userFilePath = path.resolve(__dirname, "../../data/users.json");

const usersController = {};

usersController.readAllUser = (req, res) => {
  fs.readFile(userFilePath, (error, data) => {
    if (error)
      return res.status(500).send("Error 500: error al leer el archivo");

    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
};

usersController.readUserById = (req, res) => {
  const { id } = req.params;

  fs.readFile(userFilePath, (error, data) => {
    if (error)
      return res.status(500).send("Error 500: error al leer el archivo");

    const users = JSON.parse(data);
    const user = users.find(user => user.userId === id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.send(user);
  });
};

usersController.createNewUser = (req, res) => {
  const { name, email } = req.body;

  fs.readFile(userFilePath, (error, data) => {
    if (error) {
      return res.status(500).send("Error 500: error al crear el usuario");
    }

    let users = JSON.parse(data);

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return res.status(409).send("Este correo ya está registrado");
    }

    const userId = v4();
    const newUser = { userId, name, email };

    users = JSON.stringify([...users, newUser]);

    fs.writeFile(userFilePath, users, error => {
      if (error) {
        return res.status(500).send("Error 500: error al guardar el archivo");
      }

      res.send(newUser);
    });
  });
};

module.exports = usersController;
