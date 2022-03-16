const bodyParser = require('body-parser')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.listen (3001, () => {
    console.log('Serwer uruchomiony na porcie 3001')
})

app.get('/',(req,res)=>{
    res.json({"ja":['macius']})
})