const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const encrypt = require("../../middleware/saltencrypt");

module.exports = async (req, res) => {
  try {
    const decryptedData = await decrypt(req.body.encrypt);
    const data = JSON.parse(decryptedData);
    console.log("Decrypted JSON:", data);
    const currentTimestamp = new Date().getTime();
    const otpTimestamp = new Date(data.timestamp).getTime();
    const oneHour = 60 * 60 * 1000;
    if (
      data.otp === req.body.otp &&
      currentTimestamp < otpTimestamp + oneHour
    ) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      user.password = await encrypt(req.body.password);
      await user.save();
      return res.json({ success: "Password reset successfully." });
    } else {
      return res.status(400).json({ error: "Invalid OTP or expired." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
