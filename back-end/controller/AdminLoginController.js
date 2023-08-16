const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');

// Admin Login Controller
async function adminLogin(req, res) {
  const { UserName, Email, Password } = req.body;

  try {
    // Check if the user exists and has an 'Admin' role
    const user = await User.findOne({
      where: {
        Role: 'Admin',
        [Op.or]: [
          { UserName: { [Op.eq]: UserName } },
          { Email: { [Op.eq]: Email } }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid user name' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.UserID }, 'super_secret_key_1234', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  adminLogin,
};