import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type Props = {};

export default function useRoutes() {
  const navigate = useNavigate();
  const params = useParams();
  return {
    navigate,
    params,
  };
}
