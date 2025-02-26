import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@mui/material"; // Import Skeleton from MUI
import { TbMeat } from "react-icons/tb";
import { FaLeaf, FaUtensils } from "react-icons/fa"; // Import React Icons
import MenuItem from "../components/RestaurantDetails/MenuItem"; // Import the MenuItem component

const RestaurantDetail = () => {
  const { id: restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [filter, setFilter] = useState("all"); // Filter state

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurantsDetails/${restaurantId}`
        );
          
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.restaurant) {
          setRestaurant(data.restaurant);
          setMenuItems(data.menuItems);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [restaurantId]);

  const getCartFromSessionStorage = () =>
    JSON.parse(sessionStorage.getItem("cart")) || [];

  const updateCartInSessionStorage = (updatedCart) => {
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (item) => {
    const cart = getCartFromSessionStorage();
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (cartItem) => cartItem.item_id === item.item_id
    );
    if (index !== -1) {
      updatedCart[index].qty += 1;
    } else {
      updatedCart.push({ ...item, qty: 1 });
    }
    updateCartInSessionStorage(updatedCart);
  };

  // Filter menu items based on the selected filter
  const filteredMenuItems = menuItems.filter((item) => {
    if (filter === "veg") return item.is_veg === true;
    if (filter === "non-veg") return item.is_veg === false;
    return true; // For "all"
  });

  return (
    <div className="bg-gray-100 min-h-screen" id="top">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-4">
        {loading ? (
          <div className="mb-4 flex justify-between bg-white rounded-lg shadow-md">
            <div className="w-2/3 p-4 text-center">
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={200} />
            </div>
          </div>
        ) : (
          restaurant && (
            <div className="mb-4 flex flex-col lg:flex-row justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition relative overflow-hidden">
              <div className="w-full lg:w-2/3 p-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  Your favorite destination for fresh and tasty food. <br />
                  Open {restaurant.opening_time} - {restaurant.closing_time}.
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-semibold text-lg">
                    📍 Location: {restaurant.address}
                  </p>
                  <p className="text-gray-800 font-semibold text-lg">
                    📞 Contact: {restaurant.phone}
                  </p>
                </div>
                <Link to={`/reviews/${restaurantId}`}>
                  <button className="mt-4 px-4 py-2 bg-[#3A7D44] text-white font-semibold rounded-lg transition duration-200 cursor-pointer">
                    Write a Review
                  </button>
                </Link>
              </div>
              <div className="w-full lg:w-1/3">
                <img
                  src={restaurant.image_url}
                  className="w-full lg:h-full object-cover rounded-lg shadow-md"
                  alt="Restaurant"
                />
              </div>
            </div>
          )
        )}

        <div className="mt-6">
          <div className="flex mb-4 gap-3 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg cursor-pointer ${filter === "all" ? "bg-[#3A7D44] text-white" : "bg-white text-gray-800"}`}
              onClick={() => setFilter("all")}
            >
              <FaUtensils className="inline mr-2" /> All
            </button>
            <button
              className={`px-4 py-2 rounded-lg cursor-pointer ${filter === "veg" ? "bg-[#3A7D44] text-white" : "bg-white text-gray-800"}`}
              onClick={() => setFilter("veg")}
            >
              <FaLeaf className="inline mr-2" /> Veg
            </button>
            <button
              className={`px-4 py-2 rounded-lg cursor-pointer ${filter === "non-veg" ? "bg-[#3A7D44] text-white" : "bg-white text-gray-800"}`}
              onClick={() => setFilter("non-veg")}
            >
              <TbMeat className="inline mr-2" /> Non-Veg
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from(new Array(6)).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <Skeleton variant="rectangular" width="100%" height={240} />
                  <div className="p-3">
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="30%" height={20} />
                  </div>
                </div>
              ))
            ) : filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <MenuItem
                  key={item.item_id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;