import React, { useState, useEffect } from "react";
import DetailSection from "../components/Home/DetailSection";
import RestaurantCard from "../components/Home/RestaurantCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";

import { FaSearch } from "react-icons/fa"; // You can install react-icons to get the icon
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Hero2 from "../components/Home/HeroSection";

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

        // console.log(res.data); // Check the data structure in the console
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
      <Hero2 />
      <DetailSection
        img_url={"image1.jpg"}
        heading={"Your Favorite Dishes, All in One Place!"}
        highlight={"at Jomato"}
        body={
          "No more waiting for deliveries, get all the different foods together.*"
        }
      />

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full px-4 md:px-40 mb-20" id="search" >
        {/* Search Field */}
        <div className="flex w-2/3 items-center py-4 gap-1 bg-white px-2 border border-gray-400 rounded-xl">
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search for restaurants and food"
            className="bg-white w-full px-2 outline-none"
          />
          <IoIosSearch className="text-3xl pr-1 text-gray-500" />
        </div>

        {/* Rating Filter */}
        <FormControl className="w-full md:w-1/4">
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
      </div>

      <div className="flex flex-col lg:px-40 items-center gap-10 w-full">
        {/* Restaurant Cards */}
        <div className="flex flex-wrap gap-10 px-4 place-content-center w-full">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.restaurant_id}
                res_id={restaurant.restaurant_id}
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
        <div className="w-full flex place-content-center">
          <Stack spacing={2} className="pagination mb-10">
            <Pagination
              count={totalPages} // Total number of pages
              page={page} // Current page number
              onChange={handlePageChange} // Handle page change
              size="large"
              color="secondary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Home;
