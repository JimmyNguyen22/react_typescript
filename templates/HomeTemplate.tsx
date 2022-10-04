import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

type Props = {};

export default function ({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const action = {
      type: "navigate",
      payload: navigate,
    };
    dispatch(action);
  }, []);

  return (
    <>
      <Header></Header>
      <div style={{ minHeight: 600 }}>
        <Outlet></Outlet>
      </div>
      <footer className="bg-dark text-white p-5 text-center">Footer</footer>
    </>
  );
}
