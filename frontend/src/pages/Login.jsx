import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
   
 
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = res.data; // 🔹 Extract user_id and token
 
    sessionStorage.setItem("user_token", token);  // 🔹 Store JWT token
    sessionStorage.setItem("user_id", user.id); 
    sessionStorage.setItem("user_email",user.email) // 🔹 Store user_id
 
    // console.log("JWT Token Stored:", sessionStorage.getItem("user_token"));
    console.log("User ID Stored:", sessionStorage.getItem("user_id"));
      setMessage(res.data.message);
      // console.log(message);
      navigate("/");
      window.location.reload();
     
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
 
  return (
    <div className="flex lg:flex-row flex-col gap-30 items-center h-screen bg-gray-100">
      <img src="https://cdn.dribbble.com/userupload/14672696/file/original-2e8d4c9aa547c3d34636dfc94717cbdd.gif"
       alt=""
       className="lg:h-screen items-start w-1/2 object-cover rounded-br-[400px]"/>
      <div className="w-full max-w-md  p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="submit" className="w-full bg-[#ff5200]  text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/signup" className="text-[#ff5200]  font-semibold">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
 