const express = require('express')
const {addPersonController, loginPersonController, addPostController} = require('../controllers')

const router = express.Router()

router.post("/api/add-person", addPersonController)
router.post("/api/login-person", loginPersonController)
router.post("/api/add-post", addPostController)

module.exports = router