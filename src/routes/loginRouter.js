const router = require('express').Router();
const controller = require('../controllers/index');

router.post('/', controller.login);

module.exports = router;