import User from "../model/user.model";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    // get the user who are not equal to login
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {};
