const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");
// const uploadBase64Image = require("../../middleware/uploadimg");
// const deleteFromS3 = require("../../middleware/deleteFromS3");

module.exports = async (req, res) => {
  try {
    const decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);

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
    user.name = req.body.name || user.name;
    user.contact = req.body.contact || user.contact;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
