const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const create = async ({ title, content, categoryIds }, userId) => {
    try {
        const newBlogPost = await sequelize.transaction(async (t) => {
            const newBP = await BlogPost.create({ title, content, userId }, { transaction: t });
            const getCategories = categoryIds.map((category) => ({
                postId: newBP.id,
                categoryId: category,
            }));
            await PostCategory.bulkCreate(getCategories, {
                validate: true,
                transaction: t,
                raw: true,
            });
            return newBP.toJSON();
        });

        return newBlogPost;
    } catch (error) {
        return { error: { code: 'required', message: '"categoryIds" not found' } };
    }
};

module.exports = {
    create,
};