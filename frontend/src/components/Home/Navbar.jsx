import { Link } from "react-router-dom";

const Navbar = () => {
    return(
    <nav className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="text-xl font-bold">OnDelivery</h1>

    <div className="relative">
    <button className="flex items-center space-x-2 bg-white text-orange-500 p-2 rounded-lg shadow-md hover:bg-orange-100 transition duration-200">
        <span className="text-2xl">
            <Link to="/checkout">🛒</Link>
        </span>
    </button>
    </div>
    </nav>
)};

export default Navbar