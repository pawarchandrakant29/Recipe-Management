# Recipe Management Application

## Overview
The Recipe Management Application helps users organize, store, and share their favorite recipes in one place. It offers advanced features like ingredient search, meal planning, and nutritional analysis to make cooking simpler and more enjoyable.

---

## Features

- **User Authentication**: Secure user registration and login.
- **Recipe Management**:
  - Add, edit, and delete recipes.
  - Organize recipes by categories (e.g., appetizers, main courses, desserts).
  - Upload images for each recipe.
- **Ingredient Search**: Find recipes by ingredients you have.
- **Meal Planning**: Create weekly meal plans with a calendar view.
- **Nutritional Analysis**: Get nutritional information for each recipe.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

---

## Technology Stack

- **Frontend**:
  - Framework: React.js
  - Styling: Material-UI

- **Backend**:
  - Framework: Node.js with Express.js
  - Database: Mongodb

- **Other Tools**:
  - Authentication: JWT
  - Version Control: Git

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pawarchandrakant29/Recipe-Management.git
   cd Recipe-Management
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Include the following variables:
     ```env
     PORT=3000
     DATABASE_URL=your_connection_string
     JWT_SECERT=your_seceret_key
     ```

4. Run the application:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

5. Open the app in your browser at `http://localhost:5173`.

---
