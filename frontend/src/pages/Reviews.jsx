import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { CiStar } from "react-icons/ci";
import { MdOutlineReviews } from "react-icons/md";
 
const labels = {
  0.5: "Worst",
  1: "Worst+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Average",
  3: "Average+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
 
const Reviews = () => {
  const { restaurantId } = useParams();  // Extract the restaurant_id from the URL params
  const [foodRating, setFoodRating] = useState(4);
  const [foodHover, setFoodHover] = useState(-1);
  const [reviewComment, setReviewComment] = useState("");
  const [message, setMessage] = useState("");
 
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
   const user_id = sessionStorage.getItem("user_id");
    const reviewData = {
      user_id: user_id,  // Replace with actual user ID if available
      restaurant_id: restaurantId,  // This should come from useParams
      rating: foodRating,
      comment: reviewComment,
    };
 
    try {
      const response = await fetch("http://localhost:5000/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
 
      const result = await response.json();
 
      if (response.ok) {
        setMessage("Review submitted successfully!");
        alert(result.message);
 
      // // Redirect to the restaurant's page (you can modify the URL to your needs)
      // window.location.href = `/restaurant/${restaurant_id}`;
        setReviewComment("");
        setFoodRating(4);
      } else {
        setMessage(result.message || "Failed to submit review. Please try again.");
        console.error("Error:", result);
      }
    } catch (error) {
      setMessage("Error submitting review.");
      console.error("Error:", error);
    }
  };
 
  return (
    <div className="tracking-wide m-5">
      <h1 className="text-4xl p-4 font-bold">Write a review</h1>
 
      {/* Dish Info */}
    
 
      {/* Feedback Section */}
      <div className="p-4 flex gap-8">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">Customer feedback:</h1>
          <div className="flex flex-col">
            <div className="flex ">
              {/* Food Rating System */}
              <div className="pt-5">
                <h1 className="text-xl pb-2">How would you rate the food?</h1>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="food-rating"
                    value={foodRating}
                    precision={0.5}
                    size="large"
                    onChange={(event, newValue) => setFoodRating(newValue)}
                    onChangeActive={(event, newHover) => setFoodHover(newHover)}
                    emptyIcon={<CiStar style={{ opacity: 5.55 }} fontSize="inherit" />}
                  />
                  {foodRating !== null && (
                    <Box sx={{ ml: 2 }} className="text-xl">
                      {labels[foodHover !== -1 ? foodHover : foodRating]}
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
 
      <div className="p-4 grid grid-cols-3 gap-8">
        {/* Food Review Section */}
        <div className="col-span-2">
          <h1 className="text-xl font-bold pb-2">Food review:</h1>
          <textarea
            rows="7"
            className="w-full h-32 border-2 border-dotted rounded-xl p-2"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          ></textarea>
          <div className=" rounded-xl m-4 p-3">
            <button
              className="bg-orange-500 text-white px-6 py-3 text-lg font-semibold shadow-md hover:bg-[#ff5200]  transition-all flex items-center gap-2 rounded-lg"
              onClick={handleReviewSubmit}
            >
              <MdOutlineReviews className="text-2xl" />
              Submit food review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Reviews;