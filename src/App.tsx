// In App.tsx
import React, { useState } from 'react';
import Map from './components/Map';
import Locationform from './components/Locationform';
import { unilaglocations } from './types/Location';
import "./App.css";

// Graph type definition
const graph: Record<string, Record<string, number>> = {
  'Faculty of Law': {'Faculty of Art': 2, 'Love Garden': 2, 'Faculty Of Mgt Sci': 4 },
  'Senate Building': { 'Faculty of Engineering': 5, 'Ecobank': 1, 'Faculty Of Mgt Sci': 3, 'Unilag Main Library': 4 },
  'Love Garden': { 'Faculty of Law': 2, 'Faculty Of Mgt Sci': 3, 'Faculty of Art': 3 },
  'Faculty Of Mgt Sci': { 'Faculty of Law': 4, 'Love Garden': 3, 'Senate Building': 3, 'Unilag Main Library': 2 },
  'Ecobank': { 'Faculty of Mass Com': 3, 'Faculty of Art': 2, 'Cab Car Park': 4 },
  'Faculty of Engineering': { 'Lagoon Front': 2, 'Senate Building': 5 },
  'Unilag Main Library': { 'Senate Building': 4, 'Faculty Of Mgt Sci': 2, 'Lagoon Front': 5 },
  'Lagoon Front': { 'Faculty of Engineering': 2, 'Unilag Main Library': 5 },
  'Faculty of Art': { 'Love Garden': 3, 'Faculty of Law': 2, 'Ecobank': 2, 'Fire Station': 4, },
  'Mariere Hostel': { 'Faculty of Engineering': 4, 'Cab Car Park': 2,},
  'GT Bank': { 'Cab Car Park': 2, 'Zenith Bank': 2, 'DSA Office': 2 },
  'Zenith Bank': { 'GT Bank': 2, 'Jaja Hostel': 1 },
  'Jaja Hostel': { 'Zenith Bank': 1, 'Faculty of Science': 3, 'Staff School': 3 },
  'Faculty of Science': { 'Jaja Hostel': 3, 'Unilag Medical Center': 5 },
  'Faculty of Mass Com': { 'Moremi Hostel': 4, 'CITS': 3, 'Ecobank': 3, 'Fire Station': 2 },
  'Moremi Hostel': { 'Cab Car Park': 2, 'DSA Office': 2, 'Faculty of Mass Com': 4, },
  'Unilag Medical Center': { 'Staff School': 3, 'Faculty of Science': 5, 'Scholar Suite': 2 },
  'Scholar Suite': { 'Honours Hostel': 3, 'Unilag Medical Center': 2 },
  'CITS': { 'Faculty of Mass Com': 3, 'Shuttle Car Park': 1, 'Fire Station': 2 },
  'Eni Njoku Hostel': { 'Shuttle Car Park': 2, 'Sodeinde Hostel': 3, 'Makama Hostel': 4, 'Fire Station': 3 },
  'Sodeinde Hostel': { 'Eni Njoku Hostel': 3, 'Makama Hostel': 3 },
  'Makama Hostel': { 'Sodeinde Hostel': 3, 'New Hall': 2, 'Unilag Chapel': 4 },
  'New Hall': { 'Makama Hostel': 2, 'Access Bank': 1, 'Shuttle Car Park': 3 },
  'Access Bank': { 'New Hall': 1, 'Unilag DLI': 10, 'New Hall Filling Station': 1 },
  'New Hall Filling Station': { 'Access Bank': 1, 'Nithub Unilag': 3, 'Amphitheater': 1 },
  'Unilag DLI': { 'Honours Hostel': 3, 'Access Bank': 10, 'Women Society Hostel': 3, 'First Bank': 2, 'ISL Unilag': 4 },
  'First Bank': { 'Staff Quarters': 4, 'Unilag DLI': 2, 'Unilag Second Gate': 6, 'Faculty of Social Science': 3 },
  'Nithub Unilag': { 'New Hall Filling Station': 3, 'Faculty of Social Science': 3 },
  'Faculty of Social Science': { 'First Bank': 3, 'Nithub Unilag': 3 },
  'Unilag Sport Center': { 'Wema Bank': 3, 'Amphitheater': 1 },
  'Amphitheater': { 'Unilag Sport Center': 1, 'Unilag Chapel': 3, 'New Hall Filling Station': 1 },
  'Unilag Chapel': { 'Faculty of Environmental Science': 5, 'Amphitheater': 3, 'Makama Hostel': 4 },
  'Faculty of Environmental Science': { 'Unilag Gate': 5, 'Wema Bank': 3, 'Unilag Chapel': 5 },
  'Wema Bank': { 'Faculty of Environmental Science': 3, 'Unilag Sport Center': 3, 'Faculty of Education': 3 },
  'Biobaku Hostel': { 'Kofo Hostel': 3, 'Staff Quarters': 4 },
  'Faculty of Education': { 'Femi Gbaj Hostel': 3, 'Wema Bank':3, 'Unilag Gate': 4, 'Education Garden': 6 },
  'Education Garden': { 'Faculty of Education': 6, 'Kofo Hostel': 3 },
  'Kofo Hostel': { 'Education Garden': 3, 'Amina Hostel': 2, 'Biobaku Hostel': 3 },
  'Amina Hostel': { 'Kofo Hostel': 2 },
  'Unilag Gate': { 'Faculty of Education': 4, 'Faculty of Environmental Science': 5 },
  'Femi Gbaj Hostel': { 'Elkanemi Hostel': 3, 'Faculty of Education': 3 },
  'Elkanemi Hostel': { 'Femi Gbaj Hostel': 3 },
  'ISL Unilag': { 'Unilag DLI': 4, 'Unilag Second Gate': 6 },
  'Unilag Second Gate': { 'ISL Unilag': 6, 'First Bank': 6 },
  'Honours Hostel': { 'Scholar Suite': 3, 'Unilag DLI': 3 },
  'Staff Quarters': {'Biobaku Hostel': 4, 'First Bank': 4},


  'Fire Station': { 'Faculty of Art': 4, 'Eni Njoku Hostel': 3, 'CITS': 2, 'Faculty of Mass Com': 2 },
  'Cab Car Park': { 'Moremi Hostel': 2, 'Mariere Hostel': 2, 'GT Bank': 2, 'Ecobank': 4 },
  'Shuttle Car Park': { 'CITS': 1, 'Eni Njoku Hostel': 2, 'New Hall': 3 },
  'Staff School': { 'DSA Office': 3, 'Jaja Hostel': 3, 'Unilag Medical Center': 3 },
  'DSA Office': { 'Staff School': 3, 'GT Bank': 2, 'Moremi Hostel': 2 },
};

const App: React.FC = () => {
  const [route, setRoute] = useState<{ path: string[]; distance: number }>({ path: [], distance: 0 });

  const dijkstra = (start: string, end: string) => {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const queue: { node: string; priority: number }[] = [];

    for (const node in graph) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[start] = 0;
    queue.push({ node: start, priority: 0 });

    while (queue.length) {
      queue.sort((a, b) => a.priority - b.priority);
      const { node: currentNode } = queue.shift()!;

      if (currentNode === end) {
        const path = [];
        let temp: string | null = end;
        while (temp) {
          path.push(temp);
          temp = previous[temp];
        }
        return { path: path.reverse(), distance: distances[end] };
      }

      for (const neighbor in graph[currentNode]) {
        const alt = distances[currentNode] + graph[currentNode][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = currentNode;
          queue.push({ node: neighbor, priority: alt });
        }
      }
    }

    return { path: [], distance: Infinity };
  };

  const handleFormSubmit = (current: string, destination: string) => {
    const result = dijkstra(current, destination);
    setRoute(result);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        {/* Location form section */}
        <Locationform
          locations={unilaglocations.map((loc) => loc.name)}
          onSubmit={handleFormSubmit}
        />
      </div>

      <div className="w-full">
        {/* Conditionally render Map */}
        {route.path.length > 0 && (
          <Map locations={unilaglocations} selectedPath={route.path} path={route.path} distance={route.distance} />
        )}
      </div>
    </div>
  );
};

export default App;
