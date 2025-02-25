import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
 
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };
 
  return (
    <div className="flex lg:flex-row flex-col justify-start items-center gap-20 h-screen bg-gray-100">
      <img src="https://cdn.dribbble.com/userupload/30073771/file/original-af08795f94a5da3e11f8aa2800607106.gif"
       alt=""
       className="lg:h-screen w-1/2 object-cover items-start rounded-br-[400px]"/>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="submit" className="w-full p-3 bg-[#ff5200]  text-white rounded-lg hover:bg-orange-600 transition duration-200">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="/login" className="text-[#ff5200]  font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}