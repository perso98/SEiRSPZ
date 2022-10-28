module.exports=(sequelize,DataTypes)=>
{
const listaSpecjalnosci=sequelize.define("listaSpecjalnosci",
{
    nazwa:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  listaSpecjalnosci.associate = (models) => {
    listaSpecjalnosci.hasMany(models.efektyLista, {
      onDelete: "cascade",
    });
  };



return listaSpecjalnosci
}
