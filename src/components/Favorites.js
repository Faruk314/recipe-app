import React from "react";
import { useGlobalContext } from "../context";
const Favorites = () => {
  const { favorites, removeFromFavorites, selectMeal } = useGlobalContext();

  return (
    <section className="favorites-section">
      {favorites.map((meal) => {
        const { strMealThumb: image, idMeal: id } = meal;

        return (
          <div key={id} className="favorites-content">
            <img
              onClick={() => selectMeal(id)}
              className="favorites-img"
              src={image}
              alt="food"
            />
            <button
              onClick={() => removeFromFavorites(id)}
              className="favorites-closeBtn"
            >
              Remove
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Favorites;
