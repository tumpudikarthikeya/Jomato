import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { CiStar } from "react-icons/ci";
import { MdCheckCircle } from "react-icons/md"; // Import checkmark icon

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
  const { restaurantId } = useParams(); // Extract the restaurant_id from the URL params
  const [foodRating, setFoodRating] = useState(4);
  const [foodHover, setFoodHover] = useState(-1);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [showSuccessIcon, setShowSuccessIcon] = useState(false); // State to control the success icon visibility

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/${restaurantId}`
        );
        const data = await response.json();

        if (response.ok) {
          setReviews(data); // Set the fetched reviews
        } else {
          console.error("Error fetching reviews:", data.message);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, ); // Add restaurantId as a dependency

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const user_id = sessionStorage.getItem("user_id");
    const user_email = sessionStorage.getItem("user_email");

    const reviewData = {
      user_id,
      restaurant_id: restaurantId,
      rating: foodRating,
      comment: reviewComment,
      email: user_email,
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
        setReviewComment("");
        setFoodRating(4);
        setShowSuccessIcon(true); // Show the success icon
        // Optionally, refetch reviews after submitting a new one
        setTimeout(() => {
          setShowSuccessIcon(false);
        }, 2000);
        fetchReviews();

        // Hide the success icon after 3 seconds
        
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="tracking-wide m-5">
      <h1 className="text-4xl p-4 font-bold">Write a Review</h1>

      {/* Feedback and Reviews Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Feedback Section */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Customer Feedback:</h1>
          <div className="flex flex-col mt-4">
            <div className="flex flex-col">
              <h1 className="text-xl pb-2">How would you rate the food?</h1>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="food-rating"
                  value={foodRating}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => setFoodRating(newValue)}
                  onChangeActive={(event, newHover) => setFoodHover(newHover)}
                  emptyIcon={
                    <CiStar style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {foodRating !== null && (
                  <Box sx={{ ml: 2 }} className="text-xl">
                    {labels[foodHover !== -1 ? foodHover : foodRating]}
                  </Box>
                )}
              </Box>
            </div>
            <textarea
              rows="7"
              className="w-full min-h-50 border rounded-xl p-2 mt-4"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <div className="rounded-xl mt-4 p-3">
              <button
                className="bg-[#ff5200] text-white px-6 py-3 text-lg font-semibold shadow-md hover:bg-[#ff5200] transition-all flex items-center gap-2 rounded-lg"
                onClick={handleReviewSubmit}
              >
                Submit Food Review
              </button>
            </div>
            {showSuccessIcon && (
              <div className="mt-2 text-green-500 flex items-center">
                <MdCheckCircle size={24} />
                <span className="ml-2">Review submitted successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* List of Reviews Section */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Reviews:</h1>
          {reviews.length > 0 ? (
            <div className="mt-4 overflow-y-auto max-h-[600px]">
              <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between">
                      <div>
                        <Rating value={review.rating} readOnly />
                        <p className="font-semibold">{review.comment}</p>
                        <p className="text-gray-600">{review.email}</p>
                      </div>
                      <span className="text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No reviews available for this restaurant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;