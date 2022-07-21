const { User } = require('../database/models/index');

const create = async (obj) => {
    try {
        const newUser = await User.create(obj, { 
            attributes: { exclude: ['password'] },
            raw: true,
        });
           
        return newUser;
    } catch (error) {
        return { error: { code: 'alreadyExists', message: 'User already registered' } };
    }
};

const getAllUser = async () => {
    try {
        const getAll = await User.findAll({ 
            attributes: { exclude: ['password'] },
            raw: true,
        });

        return getAll;
    } catch (error) {
        return null;
    }
};

const getUserId = async (id) => {
    try {
        const getId = await User.findByPk(id, { 
            attributes: { exclude: ['password'] },
            raw: true,
        });

        if (!getId) return { error: { code: 'notFound', message: 'User does not exist' } };

        return getId;
    } catch (error) {
        return { error: { code: 'notFound', message: 'User does not exist' } };
    }
};

module.exports = {
    create,
    getAllUser,
    getUserId,
};