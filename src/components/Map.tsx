import React, { useState, useMemo, useEffect } from "react";
import ReactFlow, { Controls, Edge, MarkerType, Node } from "reactflow";
import "reactflow/dist/style.css"; // FontAwesome pin icon
import PopUp from "./Pop-up";
import {
  getLocationImage,
  MapLocation,
  unilaglocations,
} from "../types/Location";
import AddDelete from "./AddDelete";

interface Location {
  name: string;
  lat: number;
  lng: number;
  type:
    | "hostel"
    | "bank"
    | "faculty"
    | "chapel"
    | "gate"
    | "medical_center"
    | "bus_stop"
    | "others";
}

// Define the props for the component
interface MapProps {
  locations: typeof unilaglocations;
  selectedPath: string[];
  path: string[];
  distance: number;
}

// CustomLocationNode component defined outside of the Map component
const CustomLocationNode: React.FC<{
  data: { label: string; type: string };
}> = ({ data }) => {
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

// Utility function to calculate distance between two points
const calculateDistance = (
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
) => {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
};

const Map: React.FC<MapProps> = ({
  locations,
  selectedPath,
  path,
  distance,
}) => {
  const [isPopupOpen, setPopUp] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );
  const [newLocation, setNewLocation] = useState<Location>({
    name: "",
    lat: 0,
    lng: 0,
    type: "others",
  });

  const [locationsState, setLocationsState] = useState<Location[]>(locations);
  const [locationToDelete, setLocationToDelete] = useState<string>("");

  useEffect(() => {
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
    setLocationsState((prev) =>
      prev.filter((location) => location.name !== locationToDelete)
    );
    setLocationToDelete("");
  };

  const nodes: Node[] = locationsState.map((location) => ({
    id: location.name,
    data: { label: location.name, type: location.type },
    position: { x: location.lat, y: location.lng },
    type: "locationNode",
  }));

  const edges: Edge[] = selectedPath
    .flatMap((locationId, index) => {
      const sourceNode = nodes.find((node) => node.id === locationId);
      // Check if there is a next node
      const nextIndex = index + 1;
      const targetNode =
        nextIndex < selectedPath.length
          ? nodes.find((node) => node.id === selectedPath[nextIndex])
          : null; // Set to null if next index is out of bounds

      // Log errors if source or target nodes are not found
      if (!sourceNode) {
        console.error(`Source node not found for ID: ${locationId}`);
        return []; // Skip this iteration
      }

      if (!targetNode) {
        console.log(
          `No target node for ID: ${locationId}. Skipping edge creation.`
        );
        return []; // Skip edge creation if target is not found
      }

      const distance = calculateDistance(
        { x: sourceNode.position.x, y: sourceNode.position.y },
        { x: targetNode.position.x, y: targetNode.position.y }
      );

      return {
        id: `e${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        type: "default",
        animated: true,
        label: `${distance.toFixed(2)} meters`,
        style: { stroke: "#000", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      };
    })
    .filter((edge) => edge.target);

  console.log("Edges:", edges);

  // Memoizing nodeTypes
  const nodeTypes = useMemo(
    () => ({
      locationNode: CustomLocationNode,
    }),
    []
  );

  return (
    <div className="flex flex-col w-full h-[1000px] md:h-[1900px] lg:h-[1000px]">
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
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
      <div>
        <h2>Fastest Route:</h2>
        {path.length > 0 ? (
          <>
            <p>Path: {path.join(" -> ")}</p>
            <p>Total Distance: {distance} meters</p>
          </>
        ) : (
          <p>No path found.</p>
        )}
      </div>
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
