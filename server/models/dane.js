module.exports=(sequelize,DataTypes)=>
{
const dane=sequelize.define("dane",
{
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
    
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })



  dane.associate = models => {
    dane.hasOne(models.user, {
        onDelete:"cascade"
    });
  }



return dane
}