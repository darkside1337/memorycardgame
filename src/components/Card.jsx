import React from "react";

const Card = ({ name, id, imageUrl = "", onClick }) => {
  return (
    <div className="card" id={id} onClick={onClick}>
      <img src={imageUrl} alt={`picture of ${name}`} className="card__img" />
      <h3 className="pokemon__name">{name}</h3>
    </div>
  );
};

export default Card;
