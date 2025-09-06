// import React, { useEffect, useRef, useState } from "react";
// import { NODES } from "../nodes";
// import NodeMarker from "./NodeMarker";
// import Pawn from "./Pawn";

// // adjacency list
// const EDGES: Record<number, number[]> = {
//   1: [2, 9],
//   2: [1, 3],
//   3: [2, 4, 10],
//   4: [3, 5],
//   5: [4, 6],
//   6: [5, 7],
//   7: [6],
//   8: [9, 18],
//   9: [1, 8, 19],
//   10: [3, 11],
//   11: [10, 12],
//   12: [11, 13],
//   13: [12, 14],
//   14: [13, 15],
//   15: [14, 16],
//   16: [15, 17],
//   17: [16],
//   18: [8, 19],
//   19: [9, 18, 20],
//   20: [19],

// };

// const ResponsiveMap: React.FC = () => {
//   const mapRef = useRef<HTMLImageElement | null>(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   const [pawnPosition, setPawnPosition] = useState(1);
//   const [neighborNodes, setNeighborNodes] = useState(EDGES[1] || []);

//   const updateDimensions = () => {
//     if (mapRef.current) {
//       setDimensions({
//         width: mapRef.current.clientWidth,
//         height: mapRef.current.clientHeight,
//       });
//     }
//   };

//   useEffect(() => {
//     updateDimensions();
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   const handleClick = (id: number) => {
//     if (pawnPosition === id) {
//       setNeighborNodes(EDGES[id] || []);
//     } else if (neighborNodes.includes(id)) {
//       setPawnPosition(id);
//       setNeighborNodes(EDGES[id] || []);
//     }
//   };

//   const nodeRadius = dimensions.width * 0.005;
//   const pawnSize = nodeRadius * 2.5;

//   return (
//     <div style={{ position: "relative", width: "800px", maxWidth: "100%", margin: "0 auto" }}>
//       <img
//         ref={mapRef}
//         src="/board.jpg"
//         alt="Map"
//         style={{ width: "100%", height: "auto", display: "block" }}
//         onLoad={updateDimensions}
//       />

//       {NODES.map((node) => {
//         let color = "red";
//         if (pawnPosition === node.id) color = "green";
//         else if (neighborNodes.includes(node.id)) color = "yellow";

//         return (
//           <NodeMarker
//             key={node.id}
//             id={node.id}
//             x={node.x * dimensions.width}
//             y={node.y * dimensions.height}
//             color={color}
//             radius={nodeRadius}
//             onClick={handleClick}
//           />
//         );
//       })}

//       {pawnPosition && (
//         <Pawn
//           x={NODES.find((n) => n.id === pawnPosition)!.x * dimensions.width}
//           y={NODES.find((n) => n.id === pawnPosition)!.y * dimensions.height}
//           size={pawnSize}
//         />
//       )}
//     </div>
//   );
// };

// export default ResponsiveMap;
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

// initial pawn states (different colors, all starting at node 1 for simplicity)
const INITIAL_PAWNS = [
  { id: 0, position: 1, color: "red" },
  { id: 1, position: 2, color: "blue" },
  { id: 2, position: 3, color: "green" },
  { id: 3, position: 4, color: "orange" },
  { id: 4, position: 5, color: "purple" },
  { id: 5, position: 6, color: "yellow" },
];

const ResponsiveMap: React.FC = () => {
  const mapRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [pawns, setPawns] = useState(INITIAL_PAWNS);
  const [currentTurn, setCurrentTurn] = useState(0); // whose turn it is
  const [neighborNodes, setNeighborNodes] = useState<number[]>(
    EDGES[INITIAL_PAWNS[0].position] || []
  );

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
    const activePawn = pawns[currentTurn];

    if (activePawn.position === id) {
      // highlight neighbors
      setNeighborNodes(EDGES[id] || []);
    } else if (neighborNodes.includes(id)) {
      // move pawn
      setPawns((prev) =>
        prev.map((p, idx) =>
          idx === currentTurn ? { ...p, position: id } : p
        )
      );

      // update neighbors for the new position
      setNeighborNodes(EDGES[id] || []);

      // move to next player's turn
      setCurrentTurn((prev) => (prev + 1) % pawns.length);
    }
  };

  const nodeRadius = dimensions.width * 0.005;
  const pawnSize = nodeRadius * 2.5;

  return (
    <div
      style={{ position: "relative", width: "800px", maxWidth: "100%", margin: "0 auto" }}
    >
      <img
        ref={mapRef}
        src="/board.jpg"
        alt="Map"
        style={{ width: "100%", height: "auto", display: "block" }}
        onLoad={updateDimensions}
      />

      {NODES.map((node) => {
        let color = "red";

        // check if the active pawn is here
        const activePawn = pawns[currentTurn];
        if (activePawn.position === node.id) color = "green";
        else if (neighborNodes.includes(node.id)) color = "yellow";
        else color = "gray";

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

      {/* render all pawns */}
      {pawns.map((pawn) => (
        <Pawn
          key={pawn.id}
          x={NODES.find((n) => n.id === pawn.position)!.x * dimensions.width}
          y={NODES.find((n) => n.id === pawn.position)!.y * dimensions.height}
          size={pawnSize}
          color={pawn.color}
        />
      ))}

      {/* turn indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "white",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      >
        🎲 Player {currentTurn + 1}'s Turn ({pawns[currentTurn].color})
      </div>
    </div>
  );
};

export default ResponsiveMap;
