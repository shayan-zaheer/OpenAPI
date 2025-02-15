const API = require("../models/API");


const getAPIById = async (req, res) => {
  try {
    const api = await API.findById(req.params.id).populate("owner");
    if (!api) {
      return res.status(404).json({ success: false, message: "API not found" });
    }
    res.status(200).json({ success: true, api });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



/**
 * Get all APIs created by the authenticated user.
 * GET /API/APIs/my
 */
const getUserAPIs = async (req, res) => {
  try {
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

/**
 * Add a new API for the authenticated user.
 * POST /API/APIs
 */
const addUserAPI = async (req, res) => {
  try {
    // Destructure necessary fields from the request body
    const { name, code, documentation, language, baseUrl, version, visibility, cost } = req.body;

    // Create a new API document with the authenticated user as the owner
    const newAPI = new API({
      name,
      code,
      documentation,
      language,
      baseUrl,
      owner: req.user.id, // Set owner from the authenticated user
      version: version || "1.0.0",
      visibility: visibility || "public",
      cost: cost || 0,
    });

    // Save the new API to the database
    const savedAPI = await newAPI.save();

    // Send a success response with the new API data
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

/**
 * Update an existing API owned by the authenticated user.
 * PUT /API/APIs/:id
 */
const updateUserAPI = async (req, res) => {
  try {
    // Get the API ID from the route parameters
    const APIId = req.params.id;

    // Find the API by its ID
    const existingAPI = await API.findById(APIId);
    if (!existingAPI) {
      return res.status(404).json({ 
        success: false, 
        message: "API not found" 
      });
    }

    // Ensure the authenticated user is the owner of the API
    if (existingAPI.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not own this API",
      });
    }

    // Update the API document with the data from the request body.
    const updatedAPI = await API.findByIdAndUpdate(APIId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "API updated successfully",
      API: updatedAPI,
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

/**
 * Get all APIs for a specific language.
 * GET /api/apis/language/:language
 */
const getApisByLanguage = async (req, res) => {
  try {
    // Retrieve the language from request parameters
    const { language } = req.params;

    if (!language) {
      return res.status(400).json({ success: false, message: "Language parameter is required" });
    }

    // Find APIs that match the given language and populate the entire owner object
    const apis = await API.find({ language }).populate("owner");

    if (!apis.length) {
      return res.status(404).json({ success: false, message: `No APIs found for language: ${language}` });
    }

    res.status(200).json({ success: true, count: apis.length, apis });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
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
  
      // Ensure the authenticated user is the owner of the API
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
  
  /**
   * Get all APIs (public endpoint)
   * GET /api/apis
   */
  const getAllAPIs = async (req, res) => {
    try {
      const newAPI = new API({
        name,
        code,
        documentation,
        language,
        baseUrl,
        owner: req.user.id, // Set owner from the authenticated user
        version: version || "1.0.0",
        visibility: visibility || "public",
        cost: cost || 0,
      });
      // Save the new API to the database
      const savedAPI = await newAPI.save();
      const apis = await API.find({}).populate("owner");
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

module.exports = {
  getUserAPIs,
  addUserAPI,
  updateUserAPI,
  getApisByLanguage,
  deleteUserAPI,
  getAllAPIs,
  getAPIById
};
