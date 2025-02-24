const express = require("express");
const { loginUser, signupUser } = require("../controllers/authController");
 
const router = express.Router();
 
// 🔹 Test route
router.get("/", (req, res) => {
    res.send("Welcome to the auth route");
});
 
// 🔹 Authentication routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
 
module.exports = router;