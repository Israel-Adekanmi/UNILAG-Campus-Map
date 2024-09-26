import React, { useState } from "react";
import ReactFlow, { Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css"; // FontAwesome pin icon
import PopUp from "./Pop-up";
import { getLocationImage, MapLocation } from "../types/Location";
import AddDelete from "./AddDelete";
import AnimatedEdge from "../types/edge";

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: "hostel" | "bank" | "faculty" | "chapel" | "gate" | "medical_center" | "others";
}

// Define the props for the component
interface MapProps {
  locations: Location[];
  selectedPath: string[];
}

const Map: React.FC<MapProps> = ({ locations, selectedPath }) => {
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

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    setPopUp(true);
  };

  // const handleNodeClick = (node: Node) => {
  //   const location = locationsState.find((loc) => loc.name === node.id);
  //   if (location) {
  //     handleLocationClick(location);
  //   }
  // };

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

  const edges: Edge[] = selectedPath
    .map((locationId, index) => {
      if (index < selectedPath.length - 1) {
        return {
          id: `e${locationId}-${selectedPath[index + 1]}`,
          source: locationId,
          target: selectedPath[index + 1],
          label: "Distance",
        } as Edge;
      }
      return null;
    })
    .filter((edge): edge is Edge => edge !== null);

  const nodeTypes = { locationNode: CustomLocationNode };

  return (
    <div className="flex flex-col w-full h-[1000px] md:h-[1900px] lg:h-[1000px]"> {/* Increased height */}
      <div className="relative flex-1">
        <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
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
        </ReactFlow>

        {isPopupOpen && selectedLocation && (
          <PopUp location={selectedLocation} onClose={() => setPopUp(false)} />
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
