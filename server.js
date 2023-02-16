const express = require('express')
const  StudentRoutes = require('./src/student/routes')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use("/api/v1/students", StudentRoutes)


app.listen(3000, () => console.log('Server running '))
 