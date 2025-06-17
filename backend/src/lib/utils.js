import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    //ms in 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    // prevent xss attack cross site scripting
    httpOnly: true,
    // CSRF attack
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
