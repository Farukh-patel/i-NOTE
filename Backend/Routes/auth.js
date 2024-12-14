const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../midlewares/fetchUser");
const JWT_SECRET =process.env.JWT-SECRET;

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter }); // Initialize Multer

// POST route to create a new user
router.post(  "/createuser", upload.single("profileImage"), // Handle file upload
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secPas = await bcrypt.hash(req.body.password, salt);

      // Handle profile image upload
      let profileImagePath = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/default-profile.png"; 

      // Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
        profileImage: profileImagePath, 
      });

      // Generate auth token
      const data = { user: { id: user.id } };
      const authToken = JWT.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// POST route for user login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      const data = { user: { id: user.id } };
      const authToken = JWT.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// POST route to get a user
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// GET route to show user profile
router.get("/profile", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile route:", error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// PUT route to update user profile
router.put(
  "/updateprofile",
  fetchUser,
  upload.single("profileImage"), // Handle file upload
  async (req, res) => {
    const { email, name } = req.body;

    try {
      const updatedProfile = {};
      if (name) updatedProfile.name = name;
      if (email) updatedProfile.email = email;
      if (req.file) {
        updatedProfile.profileImage = `/uploads/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedProfile },
        { new: true }
      );

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.json({ success: true, user });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
