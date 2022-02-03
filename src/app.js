import bodyParser from "body-parser"
import express from "express"
import allroutes from "./routes"

const app = express()
const port = 5000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: "application/json" }))
app.use(allroutes)

app.listen(port, () => console.log(`Running on port ${port}`))
