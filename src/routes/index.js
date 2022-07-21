const login = require('./loginRouter');
const user = require('./userRouter');
const category = require('./categoryRouter');
const post = require('./postRouter');

module.exports = {
    login,
    user,
    category,
    post,
};
