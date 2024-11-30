import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import './RecipeItems.css';

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const path = window.location.pathname === '/myRecipe';
  let favItems = JSON.parse(localStorage.getItem('fav')) ?? [];
  
  useEffect(() => {
    setAllRecipes(recipes);
    setFilteredRecipes(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`).then(() => {
      setAllRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      setFilteredRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      let updatedFavItems = favItems.filter((recipe) => recipe._id !== id);
      localStorage.setItem('fav', JSON.stringify(updatedFavItems));
    });
  };

  const favRecipe = (item) => {
    const updatedFavItems = favItems.some((recipe) => recipe._id === item._id)
      ? favItems.filter((recipe) => recipe._id !== item._id)
      : [...favItems, item];
    localStorage.setItem('fav', JSON.stringify(updatedFavItems));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allRecipes.filter((recipe) =>
      recipe.cuisine.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="recipe-items-container">
      {/* Search Bar Section */}
      <div className="search-container">
        <h2 className="section-heading">Explore Your Favorite Recipes</h2>
        <p className="section-subheading">
          Use the search bar to find recipes by cuisine. Let your taste buds lead the way!
        </p>
        <input
          type="text"
          className="food-search-input"
          placeholder="Search by Cuisine (e.g., Italian, Chinese)"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Recipe Cards Section */}
      <div className="card-container">
        {filteredRecipes?.length > 0 ? (
          filteredRecipes.map((item) => (
            <div key={item._id} className="card" onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
              <img
                src={`http://localhost:5000/images/${item.coverImage}`}
                alt={item.title}
                className="recipe-image"
              />
              <div className="card-body">
                <div className="recipe-title">{item.title}</div>
                <div className="recipe-icons">
                  <div className="recipe-timer">
                    <BsStopwatchFill />&nbsp;
                    {item.time} mins
                  </div>
                  {!path ? (
                    <FaHeart
                      className="recipe-fav-icon"
                      onClick={() => favRecipe(item)}
                      style={{
                        color: favItems.some((res) => res._id === item._id) ? 'red' : 'gray',
                      }}
                    />
                  ) : (
                    <div className="recipe-actions">
                      <Link to={`/editRecipe/${item._id}`} className="edit-icon">
                        <FaEdit />
                      </Link>
                      <MdDelete
                        onClick={() => onDelete(item._id)}
                        className="delete-icon"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-message">No recipes found for this cuisine. Try another search!</p>
        )}
      </div>
    </div>
  );
}
