module.exports=(sequelize,DataTypes)=>
{
const efektUczeniaSie=sequelize.define("efektUczeniaSie",
{
    efektUczeniaSieNazwa:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    opis:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })


return efektUczeniaSie
}