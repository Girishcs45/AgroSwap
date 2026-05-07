import Tool from "../models/tool.js";

export const CreateTool = async (req, res) => {
  try {
    const { name, category, price, power, fuel, drive, location, description } =
      req.body;

    // 🔍 Required validation
    if (!name || !category || !price || !location) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path; // 🔥 already uploaded by middleware
    }

    // 🔥 Build object dynamically (IMPORTANT FIX)
    const toolData = {
      name,
      category,
      price,
      location,
      description,
      image: imageUrl,
      owner: req.user.id,
    };

    // ✅ Only add optional fields if they are valid
    if (power) toolData.power = power;
    if (fuel && fuel.trim() !== "") toolData.fuel = fuel;
    if (drive && drive.trim() !== "") toolData.drive = drive;

    const newTool = new Tool(toolData);

    await newTool.save();

    return res.status(201).json({
      success: true,
      message: "Tool created successfully",
      data: newTool,
    });
  } catch (error) {
    console.log("CreateTool Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find()
      .populate("owner", "fullName mobile") // optional
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tools",
      error: error.message,
    });
  }
};

export const getUserTools = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔒 Safety check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🔥 Fetch only user's tools
    const tools = await Tool.find({ owner: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error("getUserTools Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const updateToolController = async (req, res) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.status(200).json(updatedTool);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteToolController = async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Tool deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleToolVisibility = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: "Tool not found",
      });
    }

    // toggle value
    tool.isActive = !tool.isActive;

    await tool.save();

    res.status(200).json({
      success: true,
      message: `Tool ${
        tool.isActive ? "activated" : "paused"
      } successfully`,
      tool,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update visibility",
    });
  }
};