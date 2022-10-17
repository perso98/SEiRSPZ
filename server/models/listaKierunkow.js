module.exports=(sequelize,DataTypes)=>
{
const listaKierunkow=sequelize.define("listaKierunkow",
{
    nazwa:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  listaKierunkow.associate = (models) => {
    listaKierunkow.hasMany(models.efektyLista, {
      onDelete: "cascade",
    });
  };



return listaKierunkow
}
