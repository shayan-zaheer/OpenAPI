const express = require("express");
const {getAllAPIs, addUserAPI, updateUserAPI, getApisByLanguage, deleteUserAPI,  getUserAPIs, getAPIById, updateVote} = require('../controllers/APIController')
const router = express.Router();


router.route('/vote/:id').patch(updateVote)
router.route('/:id').get(getAPIById).delete(deleteUserAPI).patch(updateUserAPI)


router.route('/')
  .get(getAllAPIs)
  
  .post(addUserAPI)
  

router.route('/language/:language')
  .get(getApisByLanguage);

router.route('/my')
  .get(getUserAPIs);


module.exports = router;