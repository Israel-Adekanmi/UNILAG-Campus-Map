import React from 'react';
import ReactFlow, { Controls, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // FontAwesome pin icon

// Define the Location type
interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'others';
}

// Define the props for the component
interface MapProps {
  locations: Location[];
  selectedPath: string[];
}

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

// Custom Node Component for rendering location with a pin icon
const CustomLocationNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'red', fontSize: '24px' }} />
      <div style={{ fontSize: '12px', marginTop: '4px' }}>{data.label}</div>
    </div>
  );
};

const Map: React.FC<MapProps> = ({ locations, selectedPath }) => {
  // Transform locations into nodes for React Flow
  const nodes: Node[] = locations.map((location) => ({
    id: location.name,
    data: { label: location.name },
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
    <div style={{ height: '500px', width: '100%' }}>
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
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} style={{ background: '#fafafa' }}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Map;
