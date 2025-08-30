import React, { useEffect, useRef, useState } from "react";
import { NODES } from "../nodes";
import NodeMarker from "./NodeMarker";
import Pawn from "./Pawn";

// adjacency list
const EDGES: Record<number, number[]> = {
  1: [2, 9],
  2: [1, 3],
  3: [2, 4, 10],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6],
  8: [9, 18],
  9: [1, 8, 19],
  10: [3, 11],
  11: [10, 12],
  12: [11, 13],
  13: [12, 14],
  14: [13, 15],
  15: [14, 16],
  16: [15, 17],
  17: [16],
  18: [8, 19],
  19: [9, 18, 20],
  20: [19],
};

const ResponsiveMap: React.FC = () => {
  const mapRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [pawnPosition, setPawnPosition] = useState(1);
  const [neighborNodes, setNeighborNodes] = useState(EDGES[1] || []);

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
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleClick = (id: number) => {
    if (pawnPosition === id) {
      setNeighborNodes(EDGES[id] || []);
    } else if (neighborNodes.includes(id)) {
      setPawnPosition(id);
      setNeighborNodes(EDGES[id] || []);
    }
  };

  const nodeRadius = dimensions.width * 0.005;
  const pawnSize = nodeRadius * 2.5;

  return (
    <div style={{ position: "relative", width: "800px", maxWidth: "100%", margin: "0 auto" }}>
      <img
        ref={mapRef}
        src="/board.jpg"
        alt="Map"
        style={{ width: "100%", height: "auto", display: "block" }}
        onLoad={updateDimensions}
      />

      {NODES.map((node) => {
        let color = "red";
        if (pawnPosition === node.id) color = "green";
        else if (neighborNodes.includes(node.id)) color = "yellow";

        return (
          <NodeMarker
            key={node.id}
            id={node.id}
            x={node.x * dimensions.width}
            y={node.y * dimensions.height}
            color={color}
            radius={nodeRadius}
            onClick={handleClick}
          />
        );
      })}

      {pawnPosition && (
        <Pawn
          x={NODES.find((n) => n.id === pawnPosition)!.x * dimensions.width}
          y={NODES.find((n) => n.id === pawnPosition)!.y * dimensions.height}
          size={pawnSize}
        />
      )}
    </div>
  );
};

export default ResponsiveMap;
