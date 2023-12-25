const express = require('express');
const cors = require('cors')
// const jwt = require('jsonwebtoken')
require('dotenv').config();

app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())







app.get('/', (req, res) => {
    res.send('Express cargo server is running !!!')
})

app.all('*', (req, res, next) => {
    const error = new Error(`the requested url is invalid : [${req.url}]`)
    error.status = 404;
    next(error)
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({

        massage: `the requested url is invalid : [${req.url}]`,
        status: err.status

    })
})



app.listen(port, () => {
    console.log(`Express Cargo server is running on port : ${port}`)
})
