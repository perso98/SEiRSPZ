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
    id_dziennik:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    isStudent:{
        type:DataTypes.INTEGER,
        defaultValue: 1,
    },
    isOpiekunZakl:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    isOpiekun:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    isDyrektor:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    isDziekanat:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
    isAdmin:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  student.associate = models => {
    student.belongsTo(models.opiekuni, {
        foreignKey: {
            allowNull: true
        }
    });
  }

  student.associate = models => {
    student.hasMany(models.dziennik, {
        onDelete:"cascade"
    });
  }



return student
}