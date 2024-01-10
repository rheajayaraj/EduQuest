const User = require("../../models/user");
const SENDMAIL = require("../../utils/sendemail");
const encrypt = require("../../middleware/saltencrypt");
const speakeasy = require("speakeasy");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ error: "User with given email doesn't exist" });
    const secret = speakeasy.generateSecret({ length: 20 });
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });
    const timestamp = new Date();
    const jsonData = { otp: code, timestamp: timestamp };
    console.log(jsonData);
    const jsonDataString = JSON.stringify(jsonData);
    let encryptedData = await encrypt(jsonDataString);
    const emailOptions = {
      from: "<rheajayaraj1@gmail.com>",
      to: user.email,
      subject: "EduQuest account password reset",
      text: `Dear ${user.name},\n\nYou recently requested to reset your password for your account. Use the following OTP (One Time Password) to reset your password:\nOTP: ${code}\nPlease note that this OTP is valid for a limited time and can only be used once. If you didn't request this password reset, you can ignore this email.\n\nThank you,\nEduQuest`,
    };
    await SENDMAIL(emailOptions);
    return res.json({
      success: "Password reset link sent to your email account",
      otp: code,
      encrypt: encryptedData,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
