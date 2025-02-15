const express = require("express");
const {getAllAPIs, addUserAPI, updateUserAPI, getApisByLanguage, deleteUserAPI,  getUserAPIs, getAPIById, updateVote, addAuthorizedUser, removeAuthorizedUser, updateAPIStatus, getAuthorizedUsers} = require('../controllers/APIController')
const router = express.Router();

// router.route('/updatestatus/:apiId/:status')
// router.route('/:apiId/:userId').post(addAuthorizedUser)
//       .delete(removeAuthorizedUser)
// router.route('/vote/:id').patch(updateVote)
// router.route('/:id').get(getAPIById)
//       .delete(deleteUserAPI)
//       .patch(updateUserAPI)
// router.route('/')
//       .get(getAllAPIs)
//       .post(addUserAPI)
// router.route('/language/:language')
//       .get(getApisByLanguage);
// router.route('/my')
//       .get(getUserAPIs);


router.get("/:apiId/authorized-users", getAuthorizedUsers);

router.route('/updatestatus/:apiId/:status').patch(updateAPIStatus);

// Routes to add or remove an authorized user for an API.
// Expects both the API ID and the user ID in the URL.
// These routes use two URL segments (e.g. /:apiId/:userId) and are separate from the single-segment :id routes.
router.route('/:apiId/:userId')
  .post(addAuthorizedUser)
  .delete(removeAuthorizedUser);

// Route to update votes on an API document.
// Expects the API ID as a parameter.
router.route('/vote/:id').patch(updateVote); // Expected: "upvote", "downvote", "withdrawUpvote", "withdrawDownvote" in body

// Routes for API details, deletion, or update for a single API.
// Expects a single parameter :id,
router.route('/:id')
  .get(getAPIById)
  .delete(deleteUserAPI)
  .patch(updateUserAPI);

// Route to get APIs by language.
// URL pattern: /language/:language (expects two segments).
router.route('/language/:language').get(getApisByLanguage);

// Route for the authenticated user to view their own APIs.
router.route('/my').get(getUserAPIs);

// Root route to get all APIs (with public/private filtering) and to add a new API.
router.route('/')
  .get(getAllAPIs)
  .post(addUserAPI);

module.exports = router;