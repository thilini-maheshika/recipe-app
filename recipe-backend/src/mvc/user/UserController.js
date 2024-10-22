const UserModel = require("./UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { getToken } = require("../../../config/token");

const addUser = async (req, res) => {
  try {
    const user = req.body;

    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailRegex.test(user.email)) {
      res.status(400).send({ error: "Invalid email format" });
      return;
    }

    // Check if email is axist in db
    const emailExists = await UserModel.getByEmail(user.email);
    if (emailExists) {
      res.status(409).send({ error: "Email already exists" });
      return;
    }

    // Check if phone number is axist in db
    const phoneExists = await UserModel.getByPhone(user.phone);
    if (phoneExists) {
      res.status(409).send({ error: "Phone number already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Replace the plain password with the hashed one
    user.password = hashedPassword;

    const userId = await UserModel.addUser(user);
    if (!userId) {
      res.status(500).send({ error: "Failed to create user" });
      return;
    }

    //response
    res.status(200).send({
      message: "User created successfully.",
      userId,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({ error: "Error adding user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user by email
    const user = await UserModel.getByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Your password or username is incorrect' });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Your password or username is incorrect' });
    }

    // Generate a JWT token
    const token = generateToken(user.email);

    // Send the token as a response
    res.status(200).json({
      message: "User login success.",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

const getAll = async (req, res) => {
  try {
    const results = await UserModel.getAll();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).send({ error: "Error fetching data from the database" });
  }
};


// Generate token using JWT
function generateToken(email) {
  const payload = { email };
  const options = { expiresIn: "1h" }; // Token expiration time

  // Sign the token with the secret key from the .env file
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

module.exports = {
  login,
  getAll,
  addUser,
};
