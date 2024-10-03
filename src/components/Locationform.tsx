import React from 'react';
import logo from '../assets/unilag-logo.jpg';


const Locationform: React.FC<{ locations: string[]; onSubmit: (current: string, destination: string) => void }> = ({ locations, onSubmit }) => {
  const [currentLocation, setCurrentLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLocation && destination) {
        onSubmit(currentLocation, destination);
    }
};

  return (
    <div className="flex flex-col items-center px-8 justify-center pt-8">
      <div className="flex items-center justify-center w-full mb-4">
        <img 
          src={logo} 
          alt="Unilag Logo" 
          className="w-18 h-12 md:h-16"
        />
        <h1 className="ml-4 text-xl md:text-2xl font-semibold text-center">UNILAG EXPLORER</h1>
      </div>

      {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
      
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          <label className="text-sm md:text-base font-medium">Where are you?</label>
          <select 
            value={currentLocation} 
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Enter your location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
  
        <div className="flex flex-col w-full mt-5">
          <label className="text-sm md:text-base font-medium">Where are you going?</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select your destination</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
        <button 
          id="btn" 
          type="submit" 
          className="w-full px-4 py-2 my-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
          Get Directions
        </button>
        </div>
      </form>
    </div>
  );
};

export default Locationform;
