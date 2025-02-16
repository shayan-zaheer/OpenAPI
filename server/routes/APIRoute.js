const express = require("express");
const {getAllAPIs, addUserAPI, updateUserAPI, getApisByLanguage, deleteUserAPI,  getUserAPIs, getAPIById, updateVote, addAuthorizedUser, removeAuthorizedUser, updateAPIStatus, getAuthorizedUsers} = require('../controllers/APIController')
const router = express.Router();


router.route('/vote/:id').patch(updateVote)
router.route('/:id').get(getAPIById).delete(deleteUserAPI).patch(updateUserAPI)


router.route('/')
 .get(getAllAPIs);

module.exports = router;