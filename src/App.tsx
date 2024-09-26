// In App.tsx
import React, { useState } from 'react';
import Map from './components/Map';
import Locationform from './components/Locationform';
import { unilaglocations } from './types/Location';
import "./App.css";

// Dijkstra's Algorithm logic here or import from utils file
const dijkstra = (graph: Record<string, Record<string, number>>, start: string, target: string) => {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue = new Set(Object.keys(graph));

  Object.keys(graph).forEach((location) => {
    distances[location] = Infinity;
    previous[location] = null;
  });
  distances[start] = 0;

  while (queue.size) {
    let closest = [...queue].reduce((min, loc) => (distances[loc] < distances[min] ? loc : min), [...queue][0]);

    if (closest === target) break;

    queue.delete(closest);

    for (let neighbor in graph[closest]) {
      let alt = distances[closest] + graph[closest][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = closest;
      }
    }
  }

  let path: string[] = [];
  let at: string | null = target;
  
  while (at !== null) {
    path.push(at);
    at = previous[at] || null; 
  }
  
  return path.reverse();
};

const App: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  

  const graph = {
    'Jaja Hostel': { 'Mariere Hostel': 10, 'Moremi Hostel': 15 },
    'Mariere Hostel': { 'Jaja Hostel': 10, 'Moremi Hostel': 5 },
    'Moremi Hostel': { 'Jaja Hostel': 15, 'Mariere Hostel': 5 },
  };

  const handleGetDirections = (from: string, to: string) => {
    const path = dijkstra(graph, from, to);
    setSelectedPath(path); // set path to show on the map
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
    <div className="w-full">
      {/* Location form section */}
      <Locationform
        locations={unilaglocations.map((loc) => loc.name)}
        onGetDirections={handleGetDirections}
      />
    </div>

    <div className="w-full">
      {/* Map section */}
      <Map locations={unilaglocations} selectedPath={selectedPath} />
    </div>
  </div>
  );
};

export default App;
