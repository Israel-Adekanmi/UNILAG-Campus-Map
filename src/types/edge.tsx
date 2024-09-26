import React from 'react';

interface AnimatedEdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  
  const AnimatedEdge: React.FC<AnimatedEdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
  }) => {
    return (
      <line
        id={id}
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        stroke="black"
        strokeWidth="2"
        strokeDasharray="5"
        className="animated-line"
      />
    );
  };
  
  export default AnimatedEdge;