import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

// Middleware to protect routes by verifying JWT
export const protectRoute = async (req, res, next) => {
  try {
    // Fix: should be req.cookies, not req.cookie
    const token = req.cookies?.jwt;

    // Check if token is not present
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid or cannot be decoded
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user from the decoded token (omit password field)
    const user = await User.findById(decoded.userId).select("-password");

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    // Pass control to the next middleware or route
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    // Catch expired token or other JWT errors
    res.status(401).json({ message: "Unauthorized - Token failed or expired" });
  }
};
