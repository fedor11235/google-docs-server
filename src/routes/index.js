const express = require('express')
const {addPersonController, loginPersonController, addPostController} = require('../controllers')

const router = express.Router()

router.post("/add-person", addPersonController)
router.post("/login-person", loginPersonController)
router.post("/add-post", addPostController)

module.exports = router