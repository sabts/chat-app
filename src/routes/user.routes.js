const express = require("express");
const usersRoutes = express.Router();
const usersController = require("../controllers/users.controller");

usersRoutes.get("/read", usersController.readAllUser);
usersRoutes.get("/read/:id", usersController.readUserById);
usersRoutes.post("/write", usersController.createNewUser);

module.exports = usersRoutes;
