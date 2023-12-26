const User = require("../../../models/user");
const encrypt = require("../../../middleware/saltencrypt");

module.exports = async (req, res) => {
  try {
    const hashedPassword = await encrypt(req.body.password);
    data = new User({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: hashedPassword,
      gender: req.body.gender,
      state: req.body.state,
      country: req.body.country,
    });
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
