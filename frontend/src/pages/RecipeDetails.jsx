import React from 'react';
import profileImg from '../assets/profile.png';
import { useLoaderData } from 'react-router-dom';
import './RecipeDetails.css'; // Import the new CSS file for styling

export default function RecipeDetails() {
    const recipe = useLoaderData();
    console.log(recipe);

    return (
        <div className="recipe-details-container">
            {/* Profile Section */}
            <div className="profile-container">
                <img src={profileImg} alt="Profile" className="profile-img" />
                <h5 className="user-email">{recipe.email}</h5>
            </div>

            {/* Recipe Title and Cuisine */}
            <div className="recipe-header">
                <h3 className="recipe-title">{recipe.title}</h3>
                <h4 className="recipe-cuisine">{recipe.cuisine}</h4>
            </div>

            {/* Recipe Image */}
            <div className="recipe-image-container">
                <img
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    alt={recipe.title}
                    className="recipe-img"
                />
            </div>

            {/* Recipe Ingredients and Instructions */}
            <div className="recipe-details">
                {/* Ingredients Section */}
                <div className="ingredients-section">
                    <h4 className="section-title">Ingredients</h4>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-index">{index + 1}.</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions Section */}
                <div className="instructions-section">
                    <h4 className="section-title">Instructions</h4>
                    <p className="instructions-text">{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
}
