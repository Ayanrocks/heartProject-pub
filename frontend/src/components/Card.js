import React from "react";

const Card = ({ img, body }) => {
  return (
    <div className="card">
      <div className="card__img">
        <img src={img} alt="Heart logo" />
      </div>
      <div className="card__body">
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Card;
