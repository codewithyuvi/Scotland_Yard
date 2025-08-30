import React from "react";

interface NodeMarkerProps {
  id: number;
  x: number;
  y: number;
  color: string;
  radius: number;
  onClick: (id: number) => void;
}

const NodeMarker: React.FC<NodeMarkerProps> = ({ id, x, y, color, radius, onClick }) => {
  return (
    <div
      onClick={() => onClick(id)}
      style={{
        position: "absolute",
        backgroundColor: color,
        border: "1px solid white",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        left: `${x - radius}px`,
        top: `${y - radius}px`,
        zIndex: 1,
      }}
      title={`Node ${id}`}
    />
  );
};

export default NodeMarker;
