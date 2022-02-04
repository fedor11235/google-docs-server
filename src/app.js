// import bodyParser from "body-parser"
const express = require('express')
const allroutes = require('./routes')
const cors = require('cors')

const app = express()
const port = 5000

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'localhost:5000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept');
//     next();
//   });

app.use(cors())

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json({ type: "application/json" }))
app.use(allroutes)

app.listen(port, () => console.log(`Running on port ${port}`))
