import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div
      className="position-fixed d-flex justify-content-center align-items-center"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        fontSize: "4rem",
      }}
    >
      <div>Loading ...</div>
    </div>
  );
}
