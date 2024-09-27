import React, { useState, useMemo, useEffect } from "react";
import ReactFlow, { Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css"; // FontAwesome pin icon
import PopUp from "./Pop-up";
import { getLocationImage, MapLocation, unilaglocations } from "../types/Location";
import AddDelete from "./AddDelete";

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: "hostel" | "bank" | "faculty" | "chapel" | "gate" | "medical_center" | "others";
}

// Define the props for the component
interface MapProps {
  locations: typeof unilaglocations;
  selectedPath: string[];
  path: string[];
  distance: number;
}

// CustomLocationNode component defined outside of the Map component
const CustomLocationNode: React.FC<{ data: { label: string; type: string } }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <img
        src={getLocationImage(data.type)}
        alt={data.label}
        className="w-10 h-10 md:w-12 md:h-12"
      />
      <div className="text-lg mt-2 max-w-40 break-words text-center">
        {data.label}
      </div>
    </div>
  );
};

const Map: React.FC<MapProps> = ({ locations, selectedPath, path, distance }) => {
  console.log("Selected Path:", selectedPath);
  const [isPopupOpen, setPopUp] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [newLocation, setNewLocation] = useState<Location>({
    name: "",
    lat: 0,
    lng: 0,
    type: "others",
  });

  const [locationsState, setLocationsState] = useState<Location[]>(locations);
  const [locationToDelete, setLocationToDelete] = useState<string>("");


  useEffect(() => {
    // Ensure the map renders on page load
    setLocationsState(locations);
  }, [locations]);

  
  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    setPopUp(true);
  };

  const addLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newLocation.name && newLocation.lat && newLocation.lng) {
      setLocationsState((prev) => [...prev, newLocation]);
      setNewLocation({ name: "", lat: 0, lng: 0, type: "others" });
    }
  };

  const deleteLocation = () => {
    setLocationsState((prev) => prev.filter((location) => location.name !== locationToDelete));
    setLocationToDelete("");
  };

  const nodes: Node[] = locationsState.map((location) => ({
    id: location.name,
    data: { label: location.name, type: location.type },
    position: { x: location.lat, y: location.lng },
    type: "locationNode",
  }));

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < selectedPath.length - 1; i++) {
      const sourceNode = nodes.find((node) => node.id === selectedPath[i]);
      const targetNode = nodes.find((node) => node.id === selectedPath[i + 1]);
  
      if (sourceNode && targetNode) {
        const { x: x1, y: y1 } = sourceNode.position;
        const { x: x2, y: y2 } = targetNode.position;
  
        console.log(`Source: (${x1}, ${y1}), Target: (${x2}, ${y2})`);
  
        lines.push(
          <line
            key={`${sourceNode.id}-${targetNode.id}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5,5" // Dashed line (optional)
          />
        );
      }
    }
    return lines;
  };
  

  const edges: Edge[] = selectedPath.flatMap((locationId, index) => {
    if (index < selectedPath.length - 1) {
      return {
        id: `e${locationId}-${selectedPath[index + 1]}`,
        source: locationId,
        target: selectedPath[index + 1],
        label: "Distance",
        type: "default", // Add a type if necessary
        animated: true, // or false based on your requirement
        style: { stroke: '#000' }, // Add style if needed
      } as Edge; // Type assertion to Edge
    }
    return []; // Return an empty array instead of null
  });

  // Memoizing nodeTypes
  const nodeTypes = useMemo(() => ({
    locationNode: CustomLocationNode,
  }), []);

  return (
    <div className="flex flex-col w-full h-[1000px] md:h-[1900px] lg:h-[1000px]"> {/* Increased height */}
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          style={{ background: "#fafafa" }}
          className="w-full h-full"
          onNodeClick={(_, node) => {
            const location = locationsState.find((loc) => loc.name === node.id);
            if (location) {
              handleLocationClick(location);
            }
          }}
        >
          <Controls />

          <svg
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1, // Ensure this is above the ReactFlow component
    pointerEvents: "none", // Allow clicks to pass through
  }}
>
  {renderLines()}
  </svg>
  
        </ReactFlow>

       

        {isPopupOpen && selectedLocation && (
          <PopUp location={selectedLocation} onClose={() => setPopUp(false)} />
        )}
      </div>

      <div>
        <h2>Fastest Route:</h2>
        {path.length > 0 ? (
          <>
            <p>Path: {path.join(' -> ')}</p>
            <p>Total Distance: {distance}</p>
          </>
        ) : (
          <p>No path found.</p>
        )}
      </div>

      {/* AddDelete component below the map */}
      <AddDelete
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        addLocation={addLocation}
        locationsState={locationsState}
        deleteLocation={deleteLocation}
      />
    </div>
  );
};

export default Map;
