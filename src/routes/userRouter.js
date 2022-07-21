const router = require('express').Router();
const controller = require('../controllers/index');
const validateToken = require('../middlewares/auth/validateToken');

router.get('/', validateToken, controller.user.getAllUser);
router.post('/', controller.user.create);

module.exports = router;