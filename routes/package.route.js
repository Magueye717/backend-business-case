const express = require("express");
const router = express.Router();

const packageController = require("../controllers/package.controller");

// Package routes
router.post("/:id?", packageController.create);
router.get("/", packageController.findAll);
router.get("/:id", packageController.findOne);
router.put("/:id", packageController.update);
router.delete("/:id", packageController.delete);

module.exports = router;
