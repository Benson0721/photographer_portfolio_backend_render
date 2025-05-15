import { User } from "../models/UserSchema.js";





export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out" });
    });
  });
};

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("username already registered");
    }
    const newuser = new User({ username: username });
    const registeredUser = await User.register(newuser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.json(req.user);
    });
  } catch (error) {
    console.error("伺服器錯誤:", error.message);
    res.status(400).json({ error: error.message });
  }
};
