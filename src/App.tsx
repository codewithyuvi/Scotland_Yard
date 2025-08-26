import React, { useEffect, useRef, useState } from "react";
import { NODES, NodeType } from "./nodes";

const ResponsiveMap: React.FC = () => {
  const mapRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const updateDimensions = () => {
    if (mapRef.current) {
      setDimensions({
        width: mapRef.current.clientWidth,
        height: mapRef.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const nodeRadius = dimensions.width * 0.005;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "800px", maxWidth: "100%" }}
    >
      <img
        ref={mapRef}
        src="board.jpg"
        alt="Map"
        style={{ width: "100%", height: "auto", display: "block" }}
        onLoad={updateDimensions}
      />

      {NODES.map((node) => (
        <div
          key={node.id}
          style={{
            position: "absolute",
            backgroundColor: "red",
            border: "0.2px solid white",
            borderRadius: "50%",
            boxSizing: "border-box",
            pointerEvents: "auto",            // allow interaction to enable hover          
            cursor: "pointer", 
            transition: "width 0.3s, height 0.3s, left 0.3s, top 0.3s",
            width: `${2 * nodeRadius}px`,
            height: `${2 * nodeRadius}px`,
            left: `${node.x * dimensions.width - nodeRadius}px`,
            top: `${node.y * dimensions.height - nodeRadius}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ResponsiveMap;
