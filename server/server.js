const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require("./models");
const { student } = require("./models");
const cors = require('cors')
const bcrypt = require ('bcrypt')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
db.sequelize.sync()


app.listen (5000, () => {
    console.log('Serwer uruchomiony na porcie 5000')
})

app.post('/api/createAccount', async(req,res) =>{
    const {registerLogin,registerPassword,registerPassword2} = req.body
    const loginChecker = await student.findOne({where: {login:registerLogin}})
    if (loginChecker == null) {
    if(registerPassword==registerPassword2){
    const hashedPassword = await bcrypt.hash(registerPassword, 10) 
   student.create({
        login: registerLogin,
        haslo: hashedPassword,
    })    
    console.log()
    res.send({ message: 'Konto zostało pomyślnie utworzone ;)' });
}
else
res.send({ message: 'Hasła się nie zgadzają ;(' });

}
else 
res.send({ message: 'Niestety taki login jest już zajęty ;(' });
})

app.post('/api/loginToAccount', async(req,res)=>
{
    const {loginLogin,loginPassword}=req.body

    const checkLogin = await student.findOne({where:{login:loginLogin}})
    if(checkLogin==null)
    {
        res.send({ message: 'Błędny login ;(' });
    }
    if(checkLogin)
    {
       if( await bcrypt.compare(loginPassword,checkLogin.haslo))
       {
        res.send({ message: 'Pomyślne zalogowanie ;)' });
    }
    else {
        res.send({ message: 'Hasło nie jest poprawne ;(' });
    }
    }
    
    
})