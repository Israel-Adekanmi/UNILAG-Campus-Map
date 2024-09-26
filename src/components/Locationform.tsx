import React from 'react';
import logo from '../assets/unilag-logo.jpg'


interface LocationFormProps {
  locations: string[];
  onGetDirections: (from: string, to: string) => void;
}

const Locationform: React.FC<LocationFormProps> = ({ locations, onGetDirections }) => {
  const [currentLocation, setCurrentLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetDirections(currentLocation, destination);
  };

  return (
    <div className="flex flex-col items-center px-8 justify-center pt-8"> {/* Added pt-4 to reduce top space */}
      <div className="flex items-center justify-center w-full mb-4"> {/* Added mb-4 for spacing below the logo */}
        <img 
          src={logo} 
          alt="Unilag Logo" 
          className="w-18 h-12 md:h-16" // Responsive size for the logo
        />
        <h1 className="ml-4 text-xl md:text-2xl font-semibold text-center">Unilag Explorer</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-6 md:space-y-0 md:flex-row md:space-x-4"> {/* Adjusted spacing */}
        <div className="flex flex-col w-full"> {/* Added md:w-1/2 for width on larger screens */}
          <label className="text-sm md:text-base font-medium">Where are you?</label>
          <select 
            value={currentLocation} 
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full" // Responsive form field
          >
            <option value="">Enter your location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
  
        <div className="flex flex-col w-full"> {/* Added md:w-1/2 for width on larger screens */}
          <label className="text-sm md:text-base font-medium">Where are you going?</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full" // Responsive form field
          >
            <option value="">Select your destination</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
  
        
      </form>

      <button 
          id="btn" 
          type="submit" 
          className="w-full px-4 py-2 my-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Get Directions
        </button>
    </div>
  );
  

};

export default Locationform;
