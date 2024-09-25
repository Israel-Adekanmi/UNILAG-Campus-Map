import React from 'react';

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
<div className="app-logo">   
      {/* Single parent container */}
      {/* Header Section */}
      <header className="app-header">
        <div className="header-left">
          <img 
            src={"src/assets/WhatsApp Image 2024-09-24 at 23.49.07_693ff67c.jpg"} 
            alt="Unilag Logo" 
            style={{ width: '50px', height: '50px' }}
            className="header-logo"
          />
          <h1>Unilag Locator</h1>
        </div>
      </header>
<br></br><br></br>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
  <div>
  <label>Where are you you?</label>
          <select value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)}>
            <option value="">Enter your location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
  </div>
  <br></br>


        <div>
          <label>Where are you going?</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select your destination</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <br/><br/>

        <button id='btn' type="submit">Get Directions</button>
      </form>
    </div> // Closing the single parent div
  );
};

export default Locationform;
