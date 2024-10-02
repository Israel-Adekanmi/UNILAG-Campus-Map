// PopUp.tsx
import React from 'react';
import { getLocationImage } from '../types/Location';

interface PopUpProps {
  location: {
    name: string;
    type: string;
    lat: number;
    lng: number;
    // Include any other properties you need
  };
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ location, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md md:w-100 flex"> {/* Use flex for the main container */}
        <img 
          src={getLocationImage(location.type)} 
          alt={`${location.name} icon`} className='w-25 h-32' // Set size for the image and add margin
        />
        <div className='flex flex-col justify-center'> {/* Text container */}
          <h2 className="text-xl font-bold mb-2 uppercase">{location.name}</h2>
          <p className="mb-4 ">Type: {location.type}</p>
          <p className="mb-4 ">Latitude: {location.lat}</p>
          <p className="mb-4 ">Longitude: {location.lng}</p>
          {/* Add more details as needed */}
          <button 
            onClick={onClose} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
