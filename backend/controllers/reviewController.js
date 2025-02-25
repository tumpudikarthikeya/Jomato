const { supabase } = require('../config/db');
 
const submitReview = async (req, res) => {
  const { user_id, restaurant_id, rating, comment,email } = req.body;
 console.log(req.body);
 
  // Validation: Ensure all fields are provided
  if (!user_id || !restaurant_id || !rating || !comment) {
    return res.status(400).json({ message: "Missing required fields" });
  }
 
  try {
    // Insert the review into the database
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ user_id, restaurant_id, rating, comment,email }])
      .single();
 
    if (error) {
      console.error("Error during insert:", error);
      return res.status(500).json({ message: "Error saving the review" });
    }
 
    // Fetch all reviews for the restaurant to calculate the new average rating
    const { data: reviews, error: fetchError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('restaurant_id', restaurant_id);
 
    if (fetchError) {
      console.error("Error fetching reviews:", fetchError);
      return res.status(500).json({ message: "Error fetching reviews" });
    }
 
    // Calculate the average rating
    const averageRating =
      (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
 
    // Update the restaurant's rating field with the calculated average
    const { error: updateError } = await supabase
      .from('restaurants')
      .update({ rating: averageRating })
      .eq('restaurant_id', restaurant_id);
 
    if (updateError) {
      console.error("Error updating restaurant rating:", updateError);
      return res.status(500).json({ message: "Error updating restaurant rating" });
    }
    return res.status(201).json({
      message: "Review submitted successfully, and restaurant rating updated",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Error saving the review" });
  }
};
 
// GET method to retrieve reviews by a specific restaurant
const getReviewsByRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;
 
  try {
    // Fetch reviews for the specified restaurant
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('created_at', { ascending: false });  // Filter reviews by restaurant_id
 
    if (error) {
      console.error("Error fetching reviews:", error);  // Log database error
      throw error;
    }
 
    if (data.length === 0) {
      return res.status(404).json({ message: "No reviews found for this restaurant" });
    }
 
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    return res.status(500).json({ message: "Error retrieving reviews" });
  }
};
 
module.exports = {
  submitReview,
  getReviewsByRestaurant
};
 