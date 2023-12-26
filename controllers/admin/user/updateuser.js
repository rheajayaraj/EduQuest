const User = require("../../../models/user");
const encrypt = require("../../../middleware/saltencrypt");
// const uploadBase64Image = require("../../middleware/uploadimg");
// const deleteFromS3 = require("../../middleware/deleteFromS3");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if (req.body.image) {
    //   const imageUrl = await uploadBase64Image(req.body.image);
    //   if (user.image) {
    //     await deleteFromS3(user.image);
    //   }
    //   user.image = imageUrl;
    // }
    const hashedPassword = "";
    if (req.body.password) {
      hashedPassword = encrypt(req.body.password);
    }
    user.name = req.body.name || user.name;
    user.contact = req.body.contact || user.contact;
    user.email = req.body.email || user.email;
    user.password = hashedPassword || user.password;
    user.gender = req.body.gender || user.gender;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
