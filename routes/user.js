const express = require('express');
const router = express.Router();
const userController = require('../controller/user');



router.get('/',userController.getUser);
router.post('/',userController.createUser);
router.put('/',userController.updateUser);
router.delete('/',userController.deleteUser);



module.exports = router;