import { useState } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to the signup API
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message); // Show success message
      navigate("/signin"); // Redirect to login page
    } catch (error) {
      // Handle errors
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start items-center gap-20 bg-gray-100">
      {/* Left side image */}
      <img 
        src="https://cdn.dribbble.com/userupload/30073771/file/original-af08795f94a5da3e11f8aa2800607106.gif" 
        alt="Signup Illustration" 
        className="lg:h-screen w-full lg:w-1/2 object-cover rounded-br-[400px]" 
      />
      
      {/* Right side form container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Logo and title */}
        <div className="flex items-center gap-2 mb-6 justify-center cursor-pointer">
          <img src="/logo.svg" alt="Logo" className="h-12 w-12 p-2 bg-[#ff5200] rounded-2xl" />
          <p className="text-3xl text-[#ff5200] font-bold">Jomato</p>
        </div>

        {/* Registration form */}
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
          <button 
            type="submit" 
            className="w-full p-3 bg-[#ff5200] text-white rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to login page */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-[#ff5200] font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
}