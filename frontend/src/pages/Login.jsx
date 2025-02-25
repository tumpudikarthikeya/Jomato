import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  // State to hold form data
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to hold error messages
  const [message, setMessage] = useState(""); // State to hold success messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error state
    setMessage(""); // Reset message state

    try {
      // Send POST request to the login API
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = res.data; // Extract token and user data

      // Store JWT token and user information in session storage
      sessionStorage.setItem("user_token", token);
      sessionStorage.setItem("user_id", user.id);
      sessionStorage.setItem("user_email", user.email);

      console.log("User  ID Stored:", sessionStorage.getItem("user_id"));
      setMessage(res.data.message); // Set success message
      navigate("/"); // Redirect to home page
      window.location.reload(); // Reload the page
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center h-screen bg-gray-100">
      {/* Left side image */}
      <img
        src="https://cdn.dribbble.com/userupload/14672696/file/original-2e8d4c9aa547c3d34636dfc94717cbdd.gif"
        alt="Login Illustration"
        className="lg:h-screen w-full lg:w-1/2 object-cover rounded-br-[400px]"
      />
      
      {/* Right side form container */}
      <div className="flex flex-col gap-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        {/* Logo and title */}
        <div className="flex items-center gap-2 justify-center cursor-pointer">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-12 w-12 p-2 bg-[#ff5200] rounded-2xl"
          />
          <p className="text-3xl text-[#ff5200] font-bold">Jomato</p>
        </div>

        {/* Login form */}
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
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#ff5200] text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Link to signup page */}
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#ff5200] font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}