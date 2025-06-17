import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (password < 6) {
      res
        .status(400)
        .json({ message: "Password should be more than 6 characters" });
    }

    if (!fullname || !email || !password) {
      res.status(400).json({ message: "All fileds are required" });
    }

    // check email
    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User email already exist" });

    // salt and hash the password no want password in appear
    const salt = await bcrypt.genSalt(10);

    const hassPassword = await bcrypt.hash(password, salt);

    // now create sugnup form if all are done
    const newUser = new User({
      fullname,
      email,
      password: hassPassword,
    });

    if (newUser) {
      // generate a token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req, res) => {
  res.send("Login router");
};

export const logout = (req, res) => {
  res.send("Logout route");
};
