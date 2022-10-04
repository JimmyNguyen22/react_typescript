import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useRoutes from "../../hooks/useRoutes";

type Props = {};

export default function Detail({}: Props) {
  // const [state, setState] = useState<string>("string");
  const { navigate, params } = useRoutes();
  const data: any = useLoaderData();
  return <div>Detail: {data?.name}</div>;
}
