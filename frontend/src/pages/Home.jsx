import React, { useState, useEffect } from "react";
import DetailSection from "../components/Home/DetailSection";
import RestaurantCard from "../components/Home/RestaurantCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Skeleton, // Import Skeleton
} from "@mui/material";
import Hero2 from "../components/Home/HeroSection";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const pageSize = 9;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants/", {
          params: {
            page,
            pageSize,
            search: searchTerm,
            rating: ratingFilter,
          },
        });
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [page, searchTerm, ratingFilter]);

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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full px-4 md:px-40 mb-20" id="search">
        {/* Search Field */}
        <div className="flex w-full lg:w-2/3 items-center py-4 gap-1 bg-white lg:px-2 border border-gray-400 rounded-xl">
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
          {loading ? (
 Array.from(new Array(pageSize)).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={350} height={300} className="restaurant-skeleton" />
            ))
          ) : restaurants.length > 0 ? (
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
            <div>No restaurants available</div>
          )}
        </div>

        {/* Pagination */}
        <div className="w-full flex place-content-center">
          <Stack spacing={2} className="pagination mb-10">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
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