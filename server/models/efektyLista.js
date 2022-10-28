module.exports=(sequelize,DataTypes)=>
{
const efektyLista=sequelize.define("efektyLista",
{
    nazwa:{
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

  efektyLista.associate = (models) => {
    efektyLista.hasMany(models.efektyStudent, {
      onDelete: "cascade",
    });
  };

  


return efektyLista
}
