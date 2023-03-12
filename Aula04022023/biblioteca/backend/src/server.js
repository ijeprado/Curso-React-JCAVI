const express = require('express')
const cors = require('cors')
const { routes } = require("./routes")

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use((req, res, next) => {

})

app.listen(3001, () => {
    console.log('Server is up')
})