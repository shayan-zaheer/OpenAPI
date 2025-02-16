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




/**
* Route: PATCH /vote/:id
* Description:
*   Updates the vote for a specific API.
*   Expects a JSON body with an "action" field which should be one of:
*     "upvote", "downvote", "withdrawUpvote", "withdrawDownvote".
* URL Parameter:
*   :id - The ID of the API to vote on.
*/
router.route('/vote/:id').patch(updateVote);

/**
* Route: GET /language/:language
* Description:
*   Retrieves APIs filtered by the specified programming language.
* URL Parameter:
*   :language - The programming language (e.g., "javascript", "python", "java").
*/
router.route('/language/:language').get(getApisByLanguage);

/**
* Route: GET /my
* Description:
*   Retrieves APIs created by the authenticated user.
*   Relies on authentication middleware to populate req.user.
*/
router.route('/my').get(getUserAPIs);

/**
* Route: POST /upload
* Description:
*   Creates a new API document with the provided details.
*   Expects a JSON body with fields such as:
*     - name
*     - code
*     - documentation
*     - language
*     - baseUrl
*     - visibility
*     - cost
*   The "owner" field is typically set automatically (e.g., from req.user).
*/
router.route('/upload').post(addUserAPI);

/**
* Generic API Route for a Specific API:
* Route: /:id
* Description:
*   GET    /:id - Retrieves details for a specific API.
*   DELETE /:id - Deletes the API if the authenticated user is the owner.
*   PATCH  /:id - Updates the API with fields provided in the request body.
* URL Parameter:
*   :id - The ID of the API to operate on.
*/
router.route('/:id')
 .get(getAPIById)
 .delete(deleteUserAPI)
 .patch(updateUserAPI);

/**
* Root Route for All APIs:
* Route: GET /
* Description:
*   Retrieves all APIs with public/private filtering based on authentication.
*   Does not require any URL parameters or request body.
*/
router.route('/')
 .get(getAllAPIs);

module.exports = router;