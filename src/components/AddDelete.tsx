// LocationForm.tsx
import React, { useState } from 'react';

interface NewLocation {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'chapel' | 'gate' | 'medical_center' | 'bus_stop' | 'others';
}

interface LocationFormProps {
  newLocation: NewLocation;
  setNewLocation: React.Dispatch<React.SetStateAction<NewLocation>>;
  addLocation: (e: React.FormEvent<HTMLFormElement>) => void;
  locationsState: NewLocation[];
  deleteLocation: (locationName: string) => void;
}

const AddDelete: React.FC<LocationFormProps> = ({ newLocation, setNewLocation, addLocation, locationsState, deleteLocation }) => {
  const [locationToDelete, setLocationToDelete] = useState<string>('');

  return (
    <div className="flex flex-col lg:flex-row mt-4">
      {/* Add Location Form */}
      <form onSubmit={addLocation} className="mb-4 mr-4 mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">Add Location</h2>
        <input
          type="text"
          placeholder="Name"
          value={newLocation.name}
          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
          required
          className="border p-1 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Latitude"
          value={newLocation.lat}
          onChange={(e) => setNewLocation({ ...newLocation, lat: parseFloat(e.target.value) })}
          required
          className="border p-1 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={newLocation.lng}
          onChange={(e) => setNewLocation({ ...newLocation, lng: parseFloat(e.target.value) })}
          required
          className="border p-1 mb-2 w-full"
        />
        <select
          value={newLocation.type}
          onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value as 'hostel' | 'bank' | 'faculty' | 'chapel' | 'gate' | 'medical_center' | 'others' })}
          className="border p-1 mb-2 w-full"
        >
          <option value="hostel">Hostel</option>
          <option value="bank">Bank</option>
          <option value="faculty">Faculty</option>
          <option value="chapel">Chapel</option>
          <option value="gate">Gate</option>
          <option value="medical_center">Medical Center</option>
          <option value="others">Others</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add Location</button>
      </form>

      {/* Dropdown for selecting location to delete */}
      <div className="mt-4 mb-4 p-4 bg-white rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Delete Location</h2>
        <select
          value={locationToDelete}
          onChange={(e) => setLocationToDelete(e.target.value)}
          className="border p-1 mb-2 w-full"
        >
          <option value="">Select Location</option>
          {locationsState.map(location => (
            <option key={location.name} value={location.name}>{location.name}</option>
          ))}
        </select>
        <button onClick={() => deleteLocation(locationToDelete)} className="bg-red-500 text-white p-2 rounded w-full" disabled={!locationToDelete}>
          Delete Location
        </button>
      </div>
    </div>
  );
};

export default AddDelete;
