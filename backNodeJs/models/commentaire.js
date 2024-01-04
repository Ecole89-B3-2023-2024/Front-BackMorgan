const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Commentaire extends Model {
    static associate(models) {
      Commentaire.belongsTo(models.User, { foreignKey: 'idVideo', as: 'video' });
      Commentaire.belongsTo(models.User, { foreignKey: 'idAuthor', as: 'author' });
    }
  }

  Commentaire.init(
    {
      contenu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idVideo: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      idAuthor: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      loginAuthor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Commentaire',
      timestamps: true,
    }
  );

  return Commentaire;
};
