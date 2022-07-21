const router = require('express').Router();
const controller = require('../controllers/index');
const validateToken = require('../middlewares/auth/validateToken');

router.post('/', validateToken, controller.post.create);

module.exports = router;