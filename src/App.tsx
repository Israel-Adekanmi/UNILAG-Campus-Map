// In App.tsx
import React, { useState } from 'react';
import Map from './components/Map';
import Locationform from './components/Locationform';
import { Location } from './types/Location';
import "./App.css"

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

  // const locations: Location[] = [
  //   { name: 'Jaja Hostel', lat: 100, lng: 200, type: 'hostel' },
  //   { name: 'Mariere Hostel', lat: 50, lng: 20, type: 'hostel' },
  //   { name: 'Moremi Hostel', lat: 600, lng: 300, type: 'hostel' },
  // ];

  const locations: Location[] = [
    // Top Row
    { name: 'Faculty of Law', lat: 150, lng: -627, type: 'bank' },
    { name: 'Senate Building', lat: 380, lng: -727, type: 'bank' },
    { name: 'Love Garden', lat: 245, lng: -647, type: 'bank' },
    { name: 'Faculty Of Mgt Sci', lat: 195, lng: -750, type: 'bank' },
    { name: 'Ecobank', lat: 420, lng: -700, type: 'bank' },
    { name: 'Faculty of Engineering', lat: 1150, lng: -780, type: 'bank' },
    { name: 'Unilag Main Library', lat: 245, lng: -780, type: 'bank' },
    { name: 'Lagoon Front', lat: 1000, lng: -830, type: 'bank' },
    


    { name: 'Faculty of Art', lat: 200, lng: -527, type: 'bank' },
    { name: 'Mariere Hostel', lat: 1150, lng: -587, type: 'bank' },
    { name: 'GT Bank', lat: 1300, lng: -587, type: 'bank' },
    { name: 'Zenith Bank', lat: 1500, lng: -587, type: 'bank' },
    { name: 'Jaja Hostel', lat: 1550, lng: -647, type: 'bank' },
    { name: 'Faculty of Science', lat: 1700, lng: -747, type: 'bank' },


    { name: 'Faculty of Mass Com', lat: 380, lng: -327, type: 'bank' },
    { name: 'Moremi Hostel', lat: 1300, lng: -387, type: 'bank' },
    { name: 'Unilag Medical Center', lat: 2000, lng: -277, type: 'bank' },
    { name: 'Scholar Suite', lat: 2250, lng: -237, type: 'bank' },


    { name: 'CITS', lat: 410, lng: -127, type: 'bank' },
    
  
    // Third Row
    { name: 'Eni Njoku Hostel', lat: 200, lng: -27, type: 'hostel' },
    { name: 'Honours Hostel', lat: 2400, lng: -27, type: 'bank' },
    { name: 'Unilag Printing Press', lat: 2250, lng: -87, type: 'bank' },
    { name: 'Sodeinde Hostel', lat: 150, lng: 8, type: 'hostel' },
    { name: 'Women Society Hostel', lat: 2350, lng: 10, type: 'bank' },
  
    // Fourth Row
    { name: 'New Hall', lat: 380, lng: 17, type: 'others' },
    { name: 'Makama Hostel', lat: 200, lng: 20, type: 'others' },
    { name: 'Access Bank', lat: 410, lng: 75, type: 'others' },
    { name: 'Unilag DLI', lat: 2350, lng: 75, type: 'others' },
    { name: 'ISL Unilag', lat: 2550, lng: 75, type: 'bank' },
  
    // Fifth Row
    { name: 'Nithub Unilag', lat: 1200, lng: 125, type: 'faculty' },
    { name: 'Faculty of Social Science', lat: 1700, lng: 125, type: 'bank' },
  
    // Sixth Row
    { name: 'New Hall Filling Station', lat: 400, lng: 200, type: 'others' },
    { name: 'First Bank', lat: 2250, lng: 200, type: 'others' },
    
  
    // Seventh Row
    { name: 'Unilag Sport Center', lat: 400, lng: 325, type: 'hostel' },
    { name: 'Amphitheater', lat: 450, lng: 270, type: 'hostel' },
    { name: 'Unilag Chapel', lat: 200, lng: 270, type: 'hostel' },
    { name: 'Staff Quarters', lat: 2000, lng: 335, type: 'hostel' },
    { name: 'Unilag Second Gate', lat: 2800, lng: 325, type: 'bank' },
  
    // Eighth Row
    { name: 'Faculty of Environmental Science', lat: 200, lng: 425, type: 'others' },
    { name: 'Wema Bank', lat: 400, lng: 450, type: 'hostel' },
    { name: 'Biobaku Hostel', lat: 1600, lng: 450, type: 'hostel' },
  
    // Ninth Row
    { name: 'Faculty of Education', lat: 450, lng: 500, type: 'hostel' },
    { name: 'Education Garden', lat: 1200, lng: 500, type: 'others' },
    { name: 'Kofo Hostel', lat: 1550, lng: 500, type: 'others' },
    { name: 'Amina Hostel', lat: 1750, lng: 500, type: 'others' },
  
    // Tenth Row
    { name: 'Unilag Gate', lat: 250, lng: 600, type: 'others' },
    { name: 'Femi Gbaj Hostel', lat: 750, lng: 600, type: 'others' },
    { name: 'Elkanemi Hostel', lat: 1000, lng: 600, type: 'others' },
  ];

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
    <div className="app-container">    
      <Locationform
        locations={locations.map((loc) => loc.name)}
        onGetDirections={handleGetDirections}  // Called when form is submitted
      />
      <Map locations={locations} selectedPath={selectedPath} />
    </div>
  );
};

export default App;
