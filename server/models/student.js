module.exports=(sequelize,DataTypes)=>
{
const student=sequelize.define("student",
{
    login:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    haslo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    imie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    nazwisko:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    indeks:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    studia:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    kierunek:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    specjalnosc:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    rok_studiow:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    rodzaj_studiow:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    telefon:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    rola:{
        type:DataTypes.STRING,
        defaultValue: "student",
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })



return student
}