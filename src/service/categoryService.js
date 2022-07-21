const { Category } = require('../database/models/index');

const create = async (name) => {
    try {
        const newCategory = await Category.create(name, { 
            raw: true,
        });
           
        return newCategory;
    } catch (error) {
        return null;
    }
};

module.exports = {
    create,
};