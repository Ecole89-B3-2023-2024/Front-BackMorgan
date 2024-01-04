const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Video extends Model {
    static associate(models) {
      Video.belongsTo(models.User, { foreignKey: 'idAuthor', as: 'author' });
    }
  }

  Video.init(
    {
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lien: {
        type: DataTypes.STRING,
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
      modelName: 'Video',
      timestamps: true,
    }
  );

  return Video;
};
