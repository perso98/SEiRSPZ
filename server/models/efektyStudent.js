module.exports=(sequelize,DataTypes)=>
{
const efektyStudent=sequelize.define("efektyStudent",
{
    komentarz:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })


  efektyStudent.associate = models => {
    efektyStudent.belongsTo(models.user, {
        foreignKey: {
            allowNull: true
        }
    });
}


efektyStudent.associate = models => {
    efektyStudent.belongsTo(models.efektyLista, {
        foreignKey: {
            allowNull: true
        }
    });
}



return efektyStudent
}
