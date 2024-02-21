import React, { useState, useEffect } from 'react';
import './Page.css';

const Page = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSlotBooking = async (locationId) => {
    try {
      const response = await fetch(`http://localhost:5000/locations/${locationId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to book slot');
      }
      alert('Slot booked successfully');
      // Decrease dosage count locally
      setLocations(prevLocations => {
        return prevLocations.map(location => {
          if (location.id === locationId && location.dosages > 0) {
            return { ...location, dosages: location.dosages - 1 };
          }
          return location;
        });
      });
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <h2 className="page-title">Available Slots</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search locations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="locations-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Dosages Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map(location => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.dosages}</td>
              <td>
                <button onClick={() => handleSlotBooking(location.id)} disabled={location.dosages === 0}>Book Slot</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
