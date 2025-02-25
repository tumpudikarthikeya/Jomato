import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
 
const RestaurantCard = ({ res_id, name, img_url, rating, cuisine }) => {
  return (
    <Link to={`/restaurants/${res_id}`} className=" bg-white rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg transition">
      <div>
        <img src={img_url} alt={name} className="h-70 w-100 object-cover rounded-t-md" />
        <div className="mt-3 p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500 text-sm">{cuisine}</p>
          <div className="flex items-center mt-2">
            <Rating value={rating} precision={0.5} readOnly />
            <span className="ml-2 text-gray-600 text-sm">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
 
export default RestaurantCard;