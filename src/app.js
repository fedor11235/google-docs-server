const bodyParser = require('body-parser')
const allroutes = require('./routes')
const cors = require('cors')
const app = require('express')()

const port = 3001

app.use(cors())
app.use(bodyParser.json({ type: "application/json" }))
app.use(allroutes)

const server = app.listen(port, () => console.log(`Running on port ${port}`))

require('./socket')(server)
