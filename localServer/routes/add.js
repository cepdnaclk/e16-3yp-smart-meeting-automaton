const express = require("express");
//init
const router = express.Router();

router.post('/schedule', authenticate, scheduleValidate)