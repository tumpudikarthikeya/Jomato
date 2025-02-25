// src/Home.js
import React, { useState, useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import DetailSection from "../components/Home/DetailSection";
import RestaurantCard from "../components/Home/RestaurantCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // You can install react-icons to get the icon
 
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Hero2 from "../components/Home/Hero2";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
 
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [searchTerm, setSearchTerm] = useState(""); // Search term for restaurant name
  const [ratingFilter, setRatingFilter] = useState(0); // Rating filter (default is 0, meaning no filter)
  const pageSize = 9; // Number of items per page
 
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page number when the user changes the page
  };
 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term
  };
 
  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value); // Update the rating filter
  };
 
  // Fetch data on component mount or when the page, search term, or rating filter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data with pagination, search, and rating filter
        const res = await axios.get("http://localhost:5000/api/restaurants/", {
          params: {
            page,
            pageSize,
            search: searchTerm, // Passing search term for restaurant name
            rating: ratingFilter, // Passing rating filter
          },
        });
 
        console.log(res.data); // Check the data structure in the console
        setRestaurants(res.data.restaurants); // Store the fetched data in state
        setTotalPages(res.data.totalPages); // Set the total pages from the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData(); // Call the async function
  }, [page, searchTerm, ratingFilter]); // Re-fetch data whenever page, search term, or rating changes
 
  return (
    <div>
      <Nav />
      <Hero2 />
      {/* <HeroSection /> */}
      <DetailSection
        img_url={
          "https://img.freepik.com/free-photo/stewed-white-beans-sliced-pumpkin-tomato-sauce_2829-19775.jpg?t=st=1740359704~exp=1740363304~hmac=9118c386592072242d7be605b2cc1bdeebf80f56225af32c3422d9677d898b41&w=996"
        }
        heading={'Pasta, Sushi, Steaks, Tacos Everything you want in just{" "}'}
        highlight={"1 order."}
        body={
          "No more waiting for separate deliveries, get all the different foods together.*"
        }
      />
 
      {/* Search and Filter Section */}
      {/* <div className="search-filter-section justify-center flex items-center gap-4 w-full px-40 mb-20"> */}
        {/* Search Field */}
        {/* Input field */}
        {/* <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Restaurant Name"
            variant="outlined"
            className="w-3/5"
          /> */}
 
        {/* Rating Filter */}
        {/* <FormControl className=" w-1/4">
          <InputLabel>Filter by Rating</InputLabel>
          <Select
            value={ratingFilter}
            onChange={handleRatingChange}
            label="Filter by Rating"
            className="rating-filter"
          >
            <MenuItem value={0}>All Ratings</MenuItem>
            <MenuItem value={1}>1 Star and above</MenuItem>
            <MenuItem value={2}>2 Stars and above</MenuItem>
            <MenuItem value={3}>3 Stars and above</MenuItem>
            <MenuItem value={4}>4 Stars and above</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
      </div> */}
 
      <div className="flex flex-col items-center gap-20 w-full">
        {/* Restaurant Cards */}
        <div className="flex flex-wrap gap-10 px-30 place-content-center w-full">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                res_id = {restaurant.restaurant_id}
                name={restaurant.name}
                img_url={restaurant.image_url}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
              />
            ))
          ) : (
            <div>No restaurants available</div> // Fallback message if no data
          )}
        </div>
 
        {/* Pagination */}
        <Stack spacing={2} className="pagination">
          <Pagination
            count={totalPages} // Total number of pages
            page={page} // Current page number
            onChange={handlePageChange} // Handle page change
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      <Footer />
    </div>
  );
};
 
export default Home;
 
 

 

 
 