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
  } catch (error) {}
};

export const login = (req, res) => {
  res.send("Login router");
};

export const logout = (req, res) => {
  res.send("Logout route");
};
