import React from "react";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();
  const { strMeal: name, strMealThumb: image, strInstructions } = selectedMeal;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img className="modal-img" src={image} alt="food" />
        <div className="modal-info">
          <h2>{name}</h2>
          <p>{strInstructions}</p>
          <button onClick={closeModal} className="modal-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
