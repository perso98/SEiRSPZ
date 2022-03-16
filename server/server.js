const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require("./models");
const { student } = require("./models");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
db.sequelize.sync()


app.listen (5000, () => {
    console.log('Serwer uruchomiony na porcie 5000')
})

app.get('/',(req,res)=>{
    res.json({"ja":['macius']})
})