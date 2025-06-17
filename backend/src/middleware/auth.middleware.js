import jwt from "jsonwebtoken";

import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;

    if (!token) {
      res.status(400).json({
        message: "Unathorized - No Token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Unathorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
