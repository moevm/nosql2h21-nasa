"use strict";

const { Router } = require("express");
const router = Router();

const PORT = 8080;
const HOST = '0.0.0.0';

router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;
console.log(`Running on http://${HOST}:${PORT}`);
