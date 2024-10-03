import React, { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Controls,
  Edge,
  MarkerType,
  Node,
  ConnectionMode,
} from "reactflow";
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
import { Handle, Position } from "reactflow";

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

      {/* Define handles on each side of the node */}
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />

      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
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
      const nextIndex = index + 1;
      const targetNode =
        nextIndex < selectedPath.length
          ? nodes.find((node) => node.id === selectedPath[nextIndex])
          : null;

      if (!sourceNode || !targetNode) return [];

      const distance = calculateDistance(
        { x: sourceNode.position.x, y: sourceNode.position.y },
        { x: targetNode.position.x, y: targetNode.position.y }
      );

      return {
        id: `e${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        sourceHandle: "bottom", // Specify the source handle
        targetHandle: "top", // Specify the target handle
        type: "default",
        animated: true,
        label: `${distance.toFixed(2)} meters`,
        style: { stroke: "#000", strokeWidth: 4 },
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
    <div className="mt-12 flex flex-col items-center w-full px-4">
      <div className="flex flex-col lg:flex-row w-full mx-auto">
        <div className="flex-1 w-full lg:w-[1000px] mr-4 lg:mb-0 mb-6">
          <div className="relative h-96 md:h-[700px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              style={{ background: "#fafafa" }}
              className="w-full h-full rounded-3xl"
              connectionMode={ConnectionMode.Strict}
              onNodeClick={(_, node) => {
                const location = locationsState.find(
                  (loc) => loc.name === node.id
                );
                if (location) {
                  handleLocationClick(location);
                }
              }}
            >
              <Controls />
            </ReactFlow>

            {isPopupOpen && selectedLocation && (
              <PopUp
                location={selectedLocation}
                onClose={() => setPopUp(false)}
              />
            )}
          </div>
        </div>

        <div className="w-full text-xl my-auto items-center justify-center lg:w-[400px] lg:h-[500px] p-4 bg-blue-500 text-white rounded-lg ">
          <h2 className="text-2xl font-semibold">Follow these Directions:</h2>

          <div className="mt-4 mb-4 flex items-center justify-between text-black font-semibold my-2">
            {" "}
            <p>Current Location: {path[0]}</p>
            <p className="ml-2">Destination: {path[path.length - 1]}</p>
          </div>

          {path.length > 0 ? (
            <>
              {path.slice(0, path.length - 1).map((location, index) => (
                <p key={index}>📍
                  From {location} move to {path[index + 1]}
                </p>
              ))}
              <p>📍 You have arrived at your destination.</p>
              
            </>
          ) : (
            <p>📍 You are at your destination {}</p>
          )}
        </div>
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
