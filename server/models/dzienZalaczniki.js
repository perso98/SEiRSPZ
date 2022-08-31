module.exports=(sequelize,DataTypes)=>
{
const dzienZalaczniki=sequelize.define("dzienZalaczniki",
{
    zalacznik:{
        type:DataTypes.BLOB("long"),
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  dzienZalaczniki.associate = models => {
    dzienZalaczniki.belongsTo(models.dziennik, {
        foreignKey: {
            allowNull: true
        }
    });
}

return dzienZalaczniki
}