const mongoose = require('mongoose');
require('dotenv').config()

const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@cluster0.cjbna.mongodb.net/myTasks?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB has been connected"))
.catch(e => console.log(e))