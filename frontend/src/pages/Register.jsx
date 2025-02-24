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
    <div className="flex lg:flex-row flex-col justify-start items-center gap-20 h-screen">
      <img src="https://img.freepik.com/free-photo/beyti-kebab-served-with-ayran-pickles_141793-1868.jpg?t=st=1740390106~exp=1740393706~hmac=b101d8868ff8d211c0e1e7484732e004a4ddb19b1748d2fd8dd8424300642b67&w=900"
       alt=""
       className="lg:h-screen items-start rounded-br-[400px]"/>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="w-full p-2 border rounded"/>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
}