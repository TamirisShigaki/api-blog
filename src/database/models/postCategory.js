'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'PostCategories',
          key: 'id',
        },
      },
      categoryId: DataTypes.INTEGER,
    }, 
    {
    underscored: true,
    timestamps: false,
    tableName: 'PostCategories'
    })

    PostCategory.associate = (model) => {
        model.BlogPost.belongsToMany(model.Category, { 
          as: 'postsCategories',
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });

        model.Category.belongsToMany(model.BlogPost, {
          as: 'categories',
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
    }

  return PostCategory;
};