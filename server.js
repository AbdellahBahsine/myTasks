require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 9000

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(userRouter)
app.use(taskRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log('Server is up and running at port ' + PORT)
})