import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("fav") || [])
  );
  console.log(favorites);

  const addMealToFavorites = (id) => {
    let meal = fetchedMeals.find((meal) => meal.idMeal === id);
    let foundInFav = favorites.find((meal) => meal.idMeal === id);
    if (!foundInFav) {
      let updatedFav = [...favorites, meal];
      setFavorites(updatedFav);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
    } else {
      return;
    }
  };

  const removeFromFavorites = (id) => {
    console.log(id);
    let filtered = favorites.filter((meal) => meal.idMeal !== id);
    setFavorites(filtered);
    localStorage.setItem("fav", JSON.stringify(filtered));
  };

  const selectMeal = (id, favId) => {
    console.log(id);
    let meal = fetchedMeals.find((meal) => meal.idMeal === id);
    let favMeal = favorites.find((meal) => meal.idMeal === favId);

    if (meal) {
      setSelectedMeal(meal);
    }

    if (favMeal) {
      setSelectedMeal(favMeal);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchRandomMeal = async () => {
    setIsLoading(true);
    const response = await fetch(randomMealUrl);
    const data = await response.json();

    if (data) {
      setFetchedMeals(data.meals);
    } else {
      setFetchedMeals([]);
    }
    setIsLoading(false);
  };

  const fetchMeals = async (url) => {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    if (data && data?.meals != null) {
      setFetchedMeals(data.meals);
    } else {
      setFetchedMeals([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        fetchedMeals,
        setSearchTerm,
        isLoading,
        fetchRandomMeal,
        selectMeal,
        showModal,
        selectedMeal,
        closeModal,
        addMealToFavorites,
        favorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
