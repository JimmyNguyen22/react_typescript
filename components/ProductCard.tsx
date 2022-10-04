import React from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../redux/reducers/productReducer";

type Props = {
  prod: Product;
};

export default function ProductCard({ prod }: Props) {
  return (
    <div className="card">
      <img src={prod.image} alt={prod.name} />
      <div className=" bg-dark text-white card-body">
        <p>{prod.name}</p>
        <p>{prod.price}</p>
        <NavLink to={`/detail/${prod.id}`} className="btn btn-success">
          Buy now <i className="fa fa-cart-plus"></i>{" "}
        </NavLink>
      </div>
    </div>
  );
}
