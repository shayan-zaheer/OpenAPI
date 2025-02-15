const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, deleteUser} = require('../controllers/userController');



router.route('/delete')
  .delete(deleteUser);

// Route to get all users (admin use)
router.route('/')
  .get(getAllUsers);

// Route to get a single user by ID
router.route('/:id')
  .get(getUserById);



module.exports = router;