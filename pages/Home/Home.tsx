import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getAllProductApi, Product } from "../../redux/reducers/productReducer";

type Props = {};

export default function Home({}: Props) {
  const { arrProduct } = useSelector(
    (state: RootState) => state.productReducer
  );

  const dispatch: AppDispatch = useDispatch();
  console.log({ arrProduct });
  useEffect(() => {
    // gọi api
    const action = getAllProductApi();
    dispatch(action);
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">Product list</h3>
      <div className="row">
        {arrProduct.map((item: Product, index: number) => {
          if (index < 4) {
            return (
              <div className="col-4" key={index}>
                <ProductCard prod={item}></ProductCard>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
