import React, { MouseEventHandler, useEffect, useState } from "react";
import type * as CSS from "csstype";

type Props = {
  children: string;
  onPress: MouseEventHandler;
  position: number;
  style: any;
};
const stylesObject: CSS.Properties = {
  flexWrap: "wrap",
  padding: "25px",
  border: "3px solid white",
  borderRadius: "30px",
  backgroundColor: "transparent",
  fontSize: "1.2em",
  boxShadow: "inset 0 0 15px grey, 0 0 15px grey",
  color: "white",
  // background: "linear-gradient(180deg, rgba(2,0,36,0.3) 13%, rgba(9,18,121,0.3) 57%, rgba(47,3,187,0.3) 83%, rgba(70,0,255,0.3) 100%)", 
  background: "linear-gradient(0deg, rgba(29,52,77,0.7) 0%, rgba(31,31,57,0.7) 35%, rgba(6,20,22,0.7) 100%)",
  width: "400px",
  fontFamily: "Swansea-q3pd",
  cursor: "pointer",
  marginBottom: "40px",
};

export const ButtonQuizz = (props: Props) => {
  
  return (
    <button
      style={{ ...stylesObject, ...props.style }}
      onClick={props.onPress}
      value={props.position.toString()}
    >
      {props.children}
    </button>
  );
};
