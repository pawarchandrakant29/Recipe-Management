import React, { useState } from 'react';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import './Home.css'; // Import CSS file for styling

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const addRecipe = () => {
    const token = localStorage.getItem('token');
    if (token) navigate('/addRecipe');
    else setIsOpen(true);
  };

  return (
    <>
      <section className="home">
        <div className="home-left">
          <h1 className="main-heading">Discover, Cook & Share</h1>
          <h5 className="sub-heading">
            Unleash the chef within! Explore a world of culinary creations, share your favorite recipes, and join a community that loves to cook as much as you do.
          </h5>
          <button className="primary-btn" onClick={addRecipe}>
            Share Your Recipe
          </button>
        </div>
        <div className="home-right">
          <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="Delicious Food" className="hero-image" />
        </div>
      </section>

      <div className="wave-bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffeedc" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
        </svg>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <div className="recipe-section">
        <RecipeItems />
      </div>

     
    </>
  );
}
