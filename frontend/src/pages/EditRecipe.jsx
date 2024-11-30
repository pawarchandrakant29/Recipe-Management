import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipe.css';  // Make sure you import the updated CSS file.

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`);
                const res = response.data;
                setRecipeData({
                    title: res.title,
                    ingredients: res.ingredients.join(","),
                    instructions: res.instructions,
                    time: res.time,
                });
            } catch (error) {
                console.error('Error fetching recipe data', error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    const onHandleChange = (e) => {
        const val = (e.target.name === "ingredients") ? e.target.value.split(",") : 
                    (e.target.name === "file") ? e.target.files[0] : e.target.value;
        setRecipeData((prev) => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/recipe/${id}`, recipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            navigate("/myRecipe");
        } catch (error) {
            console.error('Error updating recipe', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-recipe-container">
            <h2>Edit Recipe</h2>
            {loading ? <div className="loading-spinner">Loading...</div> : (
                <form className="edit-recipe-form" onSubmit={onHandleSubmit}>

                     {/* Recipe Image */}
                     <div className="form-group">
                        <label>Recipe Image</label>
                        <input
                            type="file"
                            className="input-file"
                            name="file"
                            onChange={onHandleChange}
                        />
                    </div>

                    {/* Title */}
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="input"
                            name="title"
                            onChange={onHandleChange}
                            value={recipeData.title || ''}
                            required
                        />
                    </div>

                    {/* Time */}
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="text"
                            className="input"
                            name="time"
                            onChange={onHandleChange}
                            value={recipeData.time || ''}
                            required
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="form-group">
                        <label>Ingredients</label>
                        <textarea
                            className="input-textarea"
                            name="ingredients"
                            rows="5"
                            onChange={onHandleChange}
                            value={recipeData.ingredients || ''}
                            required
                        ></textarea>
                    </div>

                    {/* Instructions */}
                    <div className="form-group">
                        <label>Instructions</label>
                        <textarea
                            className="input-textarea"
                            name="instructions"
                            rows="5"
                            onChange={onHandleChange}
                            value={recipeData.instructions || ''}
                            required
                        ></textarea>
                    </div>

                   

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        {loading ? 'Updating...' : 'Edit Recipe'}
                    </button>
                </form>
            )}
        </div>
    );
}
