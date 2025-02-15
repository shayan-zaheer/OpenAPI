const express = require("express");
const {getAllAPIs, addUserAPI, updateUserAPI, getApisByLanguage,  getUserAPIs, getAPIById  } = require('../controllers/APIController')
const router = express.Router();
router.route("/userAPIs").get()

router.route('/:id').get(getAPIById)

router.route('/')
  .get(getAllAPIs)
  .post(addUserAPI)
  .patch(updateUserAPI)

router.route('/language/:language')
  .get(getApisByLanguage);

router.route('/my')
  .get(getUserAPIs);


module.exports = router;