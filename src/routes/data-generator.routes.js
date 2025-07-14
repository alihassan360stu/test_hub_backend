const express = require("express");
const router = express.Router();
const dataGeneratorControllers = require("../controllers/data-generator.controllers");
router.post("/create", dataGeneratorControllers.dataGenerator);
router.get("/", dataGeneratorControllers.findAll);
router.post("/delete", dataGeneratorControllers.deleteData);
module.exports = router;
