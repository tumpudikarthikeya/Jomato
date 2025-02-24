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
 
      setMessage(res.data.message);
      // console.log(message);
      navigate("/");
     
     
 
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
 
  return (
    <div className="flex lg:flex-row flex-col lg:gap-80 items-center h-screen bg-gray-100">
      <img src="https://img.freepik.com/free-photo/young-woman-enjoying-taste-healthy-bruschetta-with-her-eyes-closed-kitchen_637285-3126.jpg?t=st=1740390803~exp=1740394403~hmac=172f7efcf68e35a140f00577ab2e9f35f0d0123e3d25e8aef6428fda7380d8a0&w=740"
       alt=""
       className="lg:h-screen items-start rounded-br-[400px]"/>
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
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
 