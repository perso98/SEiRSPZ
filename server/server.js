const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require("./models");
const session = require('express-session')
const cookieParser = require("cookie-parser")

const {
    student
} = require("./models");
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors(
{
    origin :["http://localhost:3000"],
    methods : ["GET","POST"],
    credentials: true,
}))
app.use(cookieParser())
app.use(session({
    key:"user",
    secret:"adsadsadkisahduja92183782uiwejdhjlkjsandkjbnsa",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60*60*48,
    }
}))


db.sequelize.sync()


app.listen(5000, () => {
    console.log('Serwer uruchomiony na porcie 5000')
})

app.post('/api/createAccount', async (req, res) => {
    const {
        registerLogin,
        registerPassword,
        registerPassword2
    } = req.body
    const loginChecker = await student.findOne({
        where: {
            login: registerLogin
        }
    })
    if (loginChecker == null) {
        if (registerPassword == registerPassword2) {
            const hashedPassword = await bcrypt.hash(registerPassword, 10)
            student.create({
                login: registerLogin,
                haslo: hashedPassword,
            })
            res.send({
                message: 'Konto zostało pomyślnie utworzone ;)'
            });
        } else
            res.send({
                message: 'Hasła się nie zgadzają ;('
            });

    } else
        res.send({
            message: 'Niestety taki login jest już zajęty ;('
        });
})

app.get("/api/loginToAccount",(req,res)=>{
    if(req.session.user){
    res.send({logged:true,user:req.session.user})
}
    else {
        res.send({logged:false})
    }
})

app.post('/api/loginToAccount', async (req, res) => {
    const {
        loginLogin,
        loginPassword
    } = req.body

    const checkLogin = await student.findOne({
        where: {
            login: loginLogin
        }
    })
    if (checkLogin == null)
        res.send({
            message: 'Błędny login ;('
        });
    else if (checkLogin) {
        if (await bcrypt.compare(loginPassword, checkLogin.haslo)){
            req.session.user = checkLogin
            req.session.logged = true
            res.send({
                message: 'Pomyślne zalogowanie ;)'
            });
        }
        else
            res.send({
                message: 'Hasło nie jest poprawne ;('
            });

    } else res.send({
        message: 'Nieoczekiwany błąd spróbuj później ;('
    });


})

app.post('/api/createForm', async (req, res) => {
    try {
        await db.sequelize.transaction(async function (t) {
            const {
                imie,
                nazwisko,
                indeks,
                studia,
                kierunek,
                rok_studiow,
                rodzaj_studiow,
                telefon,
                email
            } = req.body

            const id = 1

            student.update({
                imie: imie,
                nazwisko: nazwisko,
                indeks: indeks,
                studia: studia,
                kierunek: kierunek,
                rok_studiow: rok_studiow,
                rodzaj_studiow: rodzaj_studiow,
                telefon: telefon,
                eEmail: email,
            }, {
                where: {
                    id: id
                },
            }, {
                transaction: t,
            })
            console.log("Wysłano")
            res.send({
                message: 'pomyślnie wysłano ;)'
            });
        })
    } catch {
        console.log("Błąd")
        res.send({
            message: 'Błąd ;)'
        });
    }


})