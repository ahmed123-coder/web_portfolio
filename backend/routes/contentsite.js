const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Site = require("../models/contentsite");
const User = require("../models/user");

const JWT_SECRET = "your_secret_key"; // Use environment variables for production

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware to verify admin permissions
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add site data (used once)
router.post("/", verifyAdmin, upload.single("logo"), async (req, res) => {
  try {
    const { siteName, siteDescription, hero, footer, contactEmail, emailuser, passworduser, selected } = req.body;
    const logo = req.file ? req.file.path : null;

    if (!logo) return res.status(400).json({ message: "Logo is required" });

    const site = new Site({ siteName, siteDescription, hero, footer, contactEmail, emailuser, passworduser, logo, selected });
    await site.save();

    res.status(201).json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all site data
router.get("/", async (req, res) => {
  try {
    const sites = await Site.find();
    if (!sites) return res.status(404).json({ message: "Site settings not found" });

    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update site data
router.put("/:id", verifyAdmin, upload.single("logo"), async (req, res) => {
  try {
    const { siteName, siteDescription, hero, footer, contactEmail, emailuser, passworduser, selected } = req.body;
    const logo = req.file ? req.file.path : null;

    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Site settings not found" });

    if (siteName) site.siteName = siteName;
    if (siteDescription) site.siteDescription = siteDescription;
    if (hero) site.hero = hero;
    if (footer) site.footer = footer;
    if (contactEmail) site.contactEmail = contactEmail;
    if (emailuser) site.emailuser = emailuser;
    if (passworduser) site.passworduser = passworduser;
    if (selected) site.selected = selected;
    if (logo) site.logo = logo;

    await site.save();
    res.status(200).json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Select a site (set `selected` to "selected" and reset others)
router.put("/:id/select", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Reset all sites first
    await Site.updateMany({}, { selected: "not selected" });

    // Update the selected site
    const site = await Site.findByIdAndUpdate(
      id,
      { selected: "selected" },
      { new: true }
    );

    if (!site) return res.status(404).json({ message: "Site not found" });

    res.status(200).json({ message: "Site selected successfully", site });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deselect a site (set `selected` to "not selected")
router.put("/:id/deselect", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findByIdAndUpdate(
      id,
      { selected: "not selected" },
      { new: true }
    );

    if (!site) return res.status(404).json({ message: "Site not found" });

    res.status(200).json({ message: "Site deselected successfully", site });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a site
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json({ message: "Site not found" });

    res.status(200).json({ message: "Site deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the selected site
router.get("/selected", async (req, res) => {
  try {
    const selectedSite = await Site.findOne({ selected: "selected" });
    if (!selectedSite) {
      return res.status(404).json({ message: "No selected site found" });
    }
    res.status(200).json(selectedSite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;