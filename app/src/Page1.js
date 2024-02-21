import React, { useState, useEffect } from 'react';
import './Page1.css';

const Page1 = () => {
  const [locations, setLocations] = useState([]);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationDosages, setNewLocationDosages] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:5000/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const response = await fetch('http://localhost:5000/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newLocationName, dosages: newLocationDosages }),
      });
      if (!response.ok) {
        throw new Error('Failed to add location');
      }
      // Refresh locations after adding
      fetchLocations();
      // Clear input fields
      setNewLocationName('');
      setNewLocationDosages('');
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/locations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete location');
      }
      // Refresh locations after deleting
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add New Location</h2>
      <div className="add-location-form">
        <input
          type="text"
          placeholder="Location Name"
          value={newLocationName}
          onChange={(e) => setNewLocationName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Dosages Available"
          value={newLocationDosages}
          onChange={(e) => setNewLocationDosages(e.target.value)}
        />
        <button onClick={handleAddLocation}>Add</button>
      </div>
      <h2 className="page-title">Locations</h2>
      <table className="locations-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Dosages Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.dosages}</td>
              <td>
                <button onClick={() => handleDeleteLocation(location.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page1;
