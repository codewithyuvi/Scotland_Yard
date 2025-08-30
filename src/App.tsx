import React from "react";
import ResponsiveMap from "./components/ResponsiveMap";

const App: React.FC = () => {
  return (
    <div style={{ padding: "1rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Scotland Yard Board Demo</h1>
      <ResponsiveMap />
    </div>
  );
};

export default App;


// import React, { useEffect, useRef, useState } from "react";
// import { NODES } from "./nodes";

// // adjacency list (update with real Scotland Yard edges)
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
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
//     width: 0,
//     height: 0,
//   });

//   const [pawnPosition, setPawnPosition] = useState<number>(1); // default position at node 1
//   const [selectedNode, setSelectedNode] = useState<number | null>(1); // start with pawn's node as selected
//   const [neighborNodes, setNeighborNodes] = useState<number[]>(EDGES[1] || []);

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
//     return () => {
//       window.removeEventListener("resize", updateDimensions);
//     };
//   }, []);

//   const handleClick = (id: number) => {
//     if (pawnPosition === id) {
//       // clicked the pawn's current position → show neighbors
//       setSelectedNode(id);
//       setNeighborNodes(EDGES[id] || []);
//     } else if (neighborNodes.includes(id)) {
//       // clicked a valid neighbor → move pawn there
//       setPawnPosition(id);
//       setSelectedNode(id);
//       setNeighborNodes(EDGES[id] || []);
//     }
//   };

//   const nodeRadius = dimensions.width * 0.005;
//   const pawnSize = nodeRadius * 2.5;

//   return (
//     <div
//       ref={containerRef}
//       style={{ position: "relative", width: "800px", maxWidth: "100%" }}
//     >
//       <img
//         ref={mapRef}
//         src="board.jpg"
//         alt="Map"
//         style={{ width: "100%", height: "auto", display: "block" }}
//         onLoad={updateDimensions}
//       />

//       {NODES.map((node) => {
//         let color = "red"; // default
//         if (pawnPosition === node.id) color = "green"; // pawn's position
//         else if (neighborNodes.includes(node.id)) color = "yellow"; // neighbors

//         return (
//           <div
//             key={node.id}
//             onClick={() => handleClick(node.id)}
//             style={{
//               position: "absolute",
//               backgroundColor: color,
//               border: "1px solid white",
//               borderRadius: "50%",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               width: `${2 * nodeRadius}px`,
//               height: `${2 * nodeRadius}px`,
//               left: `${node.x * dimensions.width - nodeRadius}px`,
//               top: `${node.y * dimensions.height - nodeRadius}px`,
//               zIndex: 1,
//             }}
//             title={`Node ${node.id}`}
//           />
//         );
//       })}

//       {/* Pawn rendering */}
//       {pawnPosition && (
//         <div
//           style={{
//             position: "absolute",
//             background: "radial-gradient(circle at 30% 30%, skyblue, deepskyblue, dodgerblue)", // glossy pawn look
//             border: "2px solid navy",
//             borderRadius: "50%",
//             width: `${pawnSize}px`,
//             height: `${pawnSize}px`,
//             left: `${
//               NODES.find((n) => n.id === pawnPosition)!.x * dimensions.width -
//               pawnSize / 2
//             }px`,
//             top: `${
//               NODES.find((n) => n.id === pawnPosition)!.y * dimensions.height -
//               pawnSize / 2
//             }px`,
//             boxShadow: "0 0 12px rgba(0,0,255,0.6)",
//             zIndex: 2,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ResponsiveMap;
