const express = require("express");
const router = express.Router();

const deliveryController = require("../controllers/delivery.controller");

// Package routes
router.post("/:id", deliveryController.create);
router.get("/", deliveryController.findAll);
router.get("/:id", deliveryController.findOne);
router.put("/:id", deliveryController.update);
router.delete("/:id", deliveryController.delete);

module.exports = router;
