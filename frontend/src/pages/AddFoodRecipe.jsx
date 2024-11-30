import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddFoodRecipe.css"; // Import the CSS file

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeData);
    await axios
      .post("http://localhost:5000/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-heading">Create Your Culinary Masterpiece</h2>
        <p className="form-subheading">
          Share your favorite recipe with the world!
        </p>
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <label className="form-label">Upload Recipe Image</label>
            <input
              type="file"
              className="form-input"
              name="file"
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="form-label">Recipe Title</label>
            <input
              type="text"
              className="form-input"
              name="title"
              placeholder="E.g., Spaghetti Carbonara"
              onChange={onHandleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="form-label">Preparation Time (in minutes)</label>
            <input
              type="text"
              className="form-input"
              name="time"
              placeholder="E.g., 30"
              onChange={onHandleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="form-label">Cuisine Type</label>
            <input
              type="text"
              className="form-input"
              name="cuisine"
              placeholder="E.g., Italian"
              onChange={onHandleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="form-label">Ingredients (comma-separated)</label>
            <textarea
              className="form-textarea"
              name="ingredients"
              rows="5"
              placeholder="E.g., pasta, eggs, pancetta, Parmesan"
              onChange={onHandleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="form-label">Cooking Instructions</label>
            <textarea
              className="form-textarea"
              name="instructions"
              rows="5"
              placeholder="Step-by-step guide to cooking your recipe..."
              onChange={onHandleChange}
              required
            />
          </div>

          <button className="form-button" type="submit">
            Submit Recipe
          </button>
        </form>
      </div>
    </>
  );
}
