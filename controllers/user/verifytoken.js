const userverify = require("../../middleware/userverification");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    return res.status(200).json({ success: "User found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
