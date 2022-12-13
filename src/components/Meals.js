import React from "react";
import { useGlobalContext } from "../context";

const Meals = () => {
  const {
    fetchedMeals: meals,
    isLoading,
    selectMeal,
    addMealToFavorites,
    favorites,
  } = useGlobalContext();

  return (
    <section className="meals-section">
      {isLoading && <p>Loading...</p>}

      {meals.length < 1 ? <p>No meals Found.Try Again!</p> : ""}

      {meals.map((meal) => {
        let { idMeal: id, strMealThumb: image, strMeal } = meal;

        return (
          <div key={id} className="meal-card">
            <img
              onClick={() => selectMeal(id)}
              className="meal-card__image"
              src={image}
              alt={strMeal}
            />
            <div className="meal-card__content">
              <h3 className="meal-card__title">{strMeal}</h3>
              <button
                onClick={() => addMealToFavorites(id)}
                className="meal-card__btn"
              >
                Add Fav
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Meals;
