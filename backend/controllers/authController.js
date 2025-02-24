const{ supabase} = require("../config/db");
 
// 🔹 Signup Function with Debugging
const signupUser = async (req, res) => {
    try {
        const { email, password, name, phone, address } = req.body;
 
        if (!email || !password || !name || !phone || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }
 
        console.log("⏳ Signing up user...");
 
        // Sign up user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });
 
        if (error) {
            return res.status(400).json({ error: error.message });
        }
 
        const userId = data.user.id;
 
        // Store additional user details in Supabase Database
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([{ user_id: userId, name, email, phone, address, created_at: new Date() }]);
 
        if (userError) {
            return res.status(500).json({ error: userError.message });
        }
 
        res.status(201).json({ message: "Signup successful", user: userData });
    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 
// 🔹 Login Function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
 
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
 
        console.log("⏳ Logging in user...");
 
        // 🔹 Supabase Login
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 
        if (error) {
            console.error("❌ Login Error:", error.message);
            return res.status(401).json({ error: error.message });
        }
 
        console.log("✅ Login successful for:", email);
        res.json({ message: "Login successful", user: data.user });
    } catch (error) {
        console.error("❌ Internal Server Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
 
module.exports = { signupUser, loginUser };
 