const bodyParser = require('body-parser')
const express = require('express')
const allroutes = require('./routes')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json({ type: "application/json" }))
app.use(allroutes)

app.listen(port, () => console.log(`Running on port ${port}`))
