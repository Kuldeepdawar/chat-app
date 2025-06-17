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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credential" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ message: "Internal server" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const updateProfile = async (req, res) => {};
