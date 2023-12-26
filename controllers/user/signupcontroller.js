const User = require("../../models/user");
const create = require("../../middleware/jwtcreate");
const encrypt = require("../../middleware/saltencrypt");

module.exports = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: "User already exisits!" });
  } else {
    const hashedPassword = await encrypt(req.body.password);
    data = new User({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hashedPassword,
    });
    const dataToSave = await data.save();
    let token = await create({ id: dataToSave.id, email: dataToSave.email });
    let encryptedData = await encrypt(token);
    return res.status(200).json({
      message: "Authentication successful",
      user: dataToSave,
      JWT_token: encryptedData,
    });
  }
};
