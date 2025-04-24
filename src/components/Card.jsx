import React from "react";

const Card = ({ product, onEdit, onDelete }) => {
  if (!product) return null;

  return (
    <div className="card p-3 shadow-sm my-3 h-100 d-flex flex-column justify-content-between">
      <img
        src={product.Img_url}
        className="card-img-top"
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.des}</p>
      </div>

      <div
        className="d-flex justify-content-between mt-auto"
        style={{ gap: "15px" }}
      >
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
