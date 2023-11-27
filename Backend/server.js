const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/productRoute')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoute)
app.use('/',(req, res) => {
    res.send("ini API product")
})

mongoose.connect('mongodb://localhost:27017/catalog').then(() => {
    console.log("connected to database")

    app.listen(3001, () => {
        console.log("Node is running at port 3001")
    })
}).catch((error) => {
    console.log(error)
})