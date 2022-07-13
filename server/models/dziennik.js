module.exports=(sequelize,DataTypes)=>
{
const dziennik=sequelize.define("dziennik",
{
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    dzien:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    data:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    ilosc_godzin:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    opis:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    efekt_uczenia:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    zatwierdzenie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  dziennik.associate = models => {
    dziennik.hasMany(models.dzienZalaczniki, {
        onDelete:"cascade"
    });
  }

  dziennik.associate = models => {
    dziennik.belongsTo(models.student, {
        foreignKey: {
            allowNull: true
        }
    });
  }

return dziennik
}