import React from "react";

interface PawnProps {
  x: number;
  y: number;
  size: number;
}

const Pawn: React.FC<PawnProps> = ({ x, y, size }) => {
  return (
    <div
      style={{
        position: "absolute",
        background: "radial-gradient(circle at 30% 30%, skyblue, deepskyblue, dodgerblue)",
        border: "2px solid navy",
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        boxShadow: "0 0 12px rgba(0,0,255,0.6)",
        zIndex: 2,
        transition: "left 0.4s ease, top 0.4s ease", // smooth pawn movement
      }}
    />
  );
};

export default Pawn;
