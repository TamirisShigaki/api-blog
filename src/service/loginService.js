const { User } = require('../database/models/index');

module.exports = async (email) => {
    const getUser = await User.findOne({ 
        where: { email },
        attributes: { exclude: ['password'] },
        raw: true,
    });

    if (!getUser) return { error: { code: 'invalidData', message: 'Invalid fields' } }; 
       
    return getUser;
};