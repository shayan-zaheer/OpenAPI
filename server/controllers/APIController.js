const API = require("../models/API");

const getAPIById = async (req, res) => {
  try {
    const api = await API.findById(req.params.id).populate("owner");

    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }

    if (api.visibility === "private") {
      if (!req.user) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: This API is private"
        });
      }
      
      const isOwner = api.owner._id.toString() === req.user.id;

      const isAuthorizedUser = api.authorizedUsers && api.authorizedUsers.some(
        userId => userId.toString() === req.user.id
      );

      if (!isOwner && !isAuthorizedUser) {
        return res.status(403).json({ success: false, message: "Unauthorized: You do not have access to this API" });
      }
    }

    res.status(200).json({ success: true, api });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getUserAPIs = async (req, res) => {
  try {
    console.log(req.user.id);
    const APIs = await API.find({ owner: req.user.id }).populate("owner");

    if (!APIs.length) {
      return res.status(404).json({
        success: false,
        message: "No APIs found for this user."
      });
    }

    res.status(200).json({
      success: true,
      count: APIs.length,
      APIs
    });
  } catch (error) {
    console.error("Error fetching user APIs:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message
    });
  }
};

const getAPIsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user?.id;

    const filter = loggedInUserId === id
      ? { owner: id }
      : { owner: id, visibility: "public" };
    const APIs = await API.find(filter).populate("owner");

    if (!APIs.length) {
      return res.status(404).json({
        success: false,
        message: "No APIs found for this user."
      });
    }

    res.status(200).json({
      success: true,
      count: APIs.length,
      APIs
    });
  } catch (error) {
    console.error("Error fetching user APIs:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message
    });
  }
};

const addUserAPI = async (req, res) => {
  try {
    console.log(req.user);
    const { name, code, documentation, owner, language, version, visibility, cost } = req.body;

    const newAPI = new API({
      name,
      code,
      documentation,
      language,
      owner,
      version: version || "1.0.0",
      visibility: visibility || "public",
      cost: cost || 0,
    });

    const savedAPI = await newAPI.save();

    res.status(201).json({
      success: true,
      message: "API added successfully",
      API: savedAPI,
    });
  } catch (error) {
    console.error("Error adding user API:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

const updateUserAPI = async (req, res) => {
  try {
    const APIId = req.params.id;
    const newVersion = req.params.version;
    const { name, language, documentation, code, visibility, cost, authorizedUsers } = req.body;

    const existingAPI = await API.findById(APIId);
    if (!existingAPI) {
      return res.status(404).json({
        success: false,
        message: "API not found",
      });
    }

    if (existingAPI.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not own this API",
      });
    }

    if (newVersion) {
      existingAPI.version = newVersion;
    }

    const updatedAPI = await API.findByIdAndUpdate(APIId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "API updated successfully",
      API: existingAPI,
    });
  } catch (error) {
    console.error("Error updating API:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};


const getApisByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language parameter is required"
      });
    }
    let filter = { language, visibility: "public" };

    if (req.user && req.user.id) {
      filter = {
        language,
        $or: [
          { visibility: "public" },
          {
            $and: [
              { visibility: "private" },
              {
                $or: [
                  { owner: req.user.id },
                  { authorizedUsers: req.user.id }
                ]
              }
            ]
          }
        ]
      };
    }
    const apis = await API.find(filter).populate("owner");
    if (!apis.length) {
      return res.status(404).json({
        success: false,
        message: `No APIs found for language: ${language}`
      });
    }
    res.status(200).json({ success: true, count: apis.length, apis });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const deleteUserAPI = async (req, res) => {
  try {
    const apiId = req.params.id;
    const existingAPI = await API.findById(apiId);

    if (!existingAPI) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    if (existingAPI.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not own this API"
      });
    }

    await API.findByIdAndDelete(apiId);
    res.status(200).json({
      success: true,
      message: "API deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getAllAPIs = async (req, res) => {
  try {

    let filter = { visibility: "public" };
    console.log(req.user)

    if (req.user && req.user.id) {
      filter = {
        $or: [
          { visibility: "public" },
          {
            $and: [
              { visibility: "private" },
              {
                $or: [
                  { owner: req.user.id },
                  { authorizedUsers: req.user.id }
                ]
              }
            ]
          }
        ]
      };
    }
    const apis = await API.find(filter).populate("owner");
    res.status(200).json({
      success: true,
      count: apis.length,
      apis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const updateVote = async (req, res) => {
  try {
    const apiId = req?.params?.id;
    const { action } = req?.body;
    const userId = req?.user?.id;
    console.log(apiId, action, userId);

    // Validate the action value.
    const validActions = ["upvote", "downvote", "withdrawUpvote", "withdrawDownvote"];
    if (!validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vote action. Use one of: upvote, downvote, withdrawUpvote, withdrawDownvote."
      });
    }

    // Retrieve the API document
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }

    // If the API is private, ensure that the user is either the owner or an authorized user.
    if (api.visibility === "private") {
      const isOwner = api.owner.toString() === req.user.id;
      const isAuthorized = api.authorizedUsers && api.authorizedUsers.some(
        authId => authId.toString() === req.user.id
      );
      if (!isOwner && !isAuthorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Private API"
        });
      }
    }

    // Vote logic (assuming the API schema includes upvotedBy and downvotedBy arrays)
    switch (action) {
      case "upvote":
        if (api.upvotedBy.includes(userId)) {
          return res.status(400).json({ success: false, message: "User has already upvoted this API." });
        }
        // Remove a prior downvote if present.
        if (api.downvotedBy.includes(userId)) {
          api.downvotedBy.pull(userId);
          api.downvotes = Math.max(0, api.downvotes - 1);
        }
        api.upvotedBy.push(userId);
        api.upvotes += 1;
        break;

      case "downvote":
        if (api.downvotedBy.includes(userId)) {
          return res.status(400).json({ success: false, message: "User has already downvoted this API." });
        }
        // Remove a prior upvote if present.
        if (api.upvotedBy.includes(userId)) {
          api.upvotedBy.pull(userId);
          api.upvotes = Math.max(0, api.upvotes - 1);
        }
        api.downvotedBy.push(userId);
        api.downvotes += 1;
        break;

      case "withdrawUpvote":
        if (!api.upvotedBy.includes(userId)) {
          return res.status(400).json({ success: false, message: "User has not upvoted this API." });
        }
        api.upvotedBy.pull(userId);
        api.upvotes = Math.max(0, api.upvotes - 1);
        break;

      case "withdrawDownvote":
        if (!api.downvotedBy.includes(userId)) {
          return res.status(400).json({ success: false, message: "User has not downvoted this API." });
        }
        api.downvotedBy.pull(userId);
        api.downvotes = Math.max(0, api.downvotes - 1);
        break;
    }

    // Save the updated API document
    const updatedAPI = await api.save();

    res.status(200).json({
      success: true,
      message: "Vote updated successfully",
      API: updatedAPI
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getUserAPIs,
  addUserAPI,
  updateUserAPI,
  getApisByLanguage,
  deleteUserAPI,
  getAllAPIs,
  getAPIById,
  updateVote,
  getAPIsByUser
};
