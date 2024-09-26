import React from 'react';
import ReactFlow, { Controls, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css'; // FontAwesome pin icon
import hostelImage from '../assets/hostel.jpg';
import bankImage from '../assets/bank 1.png';
import facultyImage from '../assets/faculty.jpg';
import churchImage from '../assets/church.jpeg';
import gateImage from '../assets/gate.png';
import hospitalImage from '../assets/hospital.avif';
import buildingImage from '../assets/building.jpg';

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'chapel' | 'gate' | 'medical center' | 'others';
}

// Define the props for the component
interface MapProps {
  locations: Location[];
  selectedPath: string[];
}

// Function to determine the image based on location type
const getLocationImage = (type: string) => {
  switch (type) {
    case 'hostel':
      return hostelImage;
    case 'bank':
      return bankImage;
    case 'faculty':
      return facultyImage;
    case 'chapel':
      return churchImage;
    case 'gate':
      return gateImage;
    case 'medical center':
      return hospitalImage;
    default:
      return buildingImage; // For other locations
  }
};

// Custom Node Component for rendering location with a custom image
const CustomLocationNode: React.FC<{ data: { label: string; type: string } }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Display the custom image based on location type */}
      <img
        src={getLocationImage(data.type)}
        alt={data.label}
        className="w-10 h-10 md:w-12 md:h-12" // Adjust the icon size here for responsiveness
      />
      <div className="text-lg mt-2 max-w-40 break-words text-center">
        {data.label}
      </div>
    </div>
  );
};

// Custom edge component for animation
const AnimatedEdge: React.FC<{
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  style?: React.CSSProperties;
}> = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  const length = Math.sqrt((targetX - sourceX) ** 2 + (targetY - sourceY) ** 2);

  return (
    <line
      id={id}
      x1={sourceX}
      y1={sourceY}
      x2={targetX}
      y2={targetY}
      style={{
        ...style,
        stroke: 'purple',
        strokeWidth: 3,
        markerEnd: 'url(#arrow)',
        transition: 'stroke-dashoffset 0.5s ease-in-out',
        strokeDasharray: length,
        strokeDashoffset: length,
      }}
    >
      <animate
        attributeName="stroke-dashoffset"
        from={length}
        to="0"
        dur="0.5s"
        fill="freeze"
      />
    </line>
  );
};

const Map: React.FC<MapProps> = ({ locations, selectedPath }) => {
  // Transform locations into nodes for React Flow
  const nodes: Node[] = locations.map((location) => ({
    id: location.name,
    data: { label: location.name, type: location.type },
    position: { x: location.lat, y: location.lng },
    type: 'locationNode', // Set the custom node type
  }));

  // Create edges based on selectedPath
  const edges: Edge[] = selectedPath
    .map((locationId, index) => {
      if (index < selectedPath.length - 1) {
        return {
          id: `e${locationId}-${selectedPath[index + 1]}`,
          source: locationId,
          target: selectedPath[index + 1],
          label: 'Distance',
        } as Edge;
      }
      return null;
    })
    .filter((edge): edge is Edge => edge !== null); // Type guard to filter null values

  // Define nodeTypes with the custom location node
  const nodeTypes = { locationNode: CustomLocationNode };

  return (
    <div className='relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex items-center justify-center'>
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {edges.map((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          const { x: sourceX, y: sourceY } = sourceNode.position;
          const { x: targetX, y: targetY } = targetNode.position;

          return (
            <AnimatedEdge
              key={edge.id}
              id={edge.id}
              sourceX={sourceX}
              sourceY={sourceY}
              targetX={targetX}
              targetY={targetY}
            />
          );
        })}
      </svg>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes} 
        style={{ background: '#fafafa' }} 
        className="w-full h-full"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Map;
