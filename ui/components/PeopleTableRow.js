import React, { useEffect, useState } from 'react';

export default function PeopleTableRow({ person }) {
  const [now] = useState(new Date());
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        alert(`Erro no check-in: ${error.message}`);
        
      } else {
          setTimeout(() => {
            setHasCheckedIn(true);
          }, 5000);
          alert('Check-in realizado com sucesso');
        }
      });
  };

  const handleCheckOut = (personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        alert(`Erro no check-out: ${error.message}`);
      } else {
        alert('Check-out realizado com sucesso');
      }
    });
  };

  useEffect(() => {
    if (person.checkInDate || person.checkOutDate) {
      setHasCheckedIn(true)
    }
  }, []);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="max-w-[150px] truncate whitespace-nowrap px-6 py-3 text-left">
        {person.firstName} {person.lastName}
      </td>
      <td className="max-w-[150px] truncate whitespace-nowrap px-6 py-3 text-left">
        {person.companyName}
      </td>
      <td className="max-w-[150px] truncate whitespace-nowrap px-6 py-3 text-left">
        {person.title}
      </td>
      <td className="max-w-[120px] border px-4 py-2">
        <span className="block truncate text-xs">
          {person.checkInDate ? person.checkInDate.toLocaleString() : 'N/A'}
        </span>
      </td>
      <td className="max-w-[100px] border px-4 py-2">
        <span className="block truncate text-xs">
          {person.checkOutDate ? person.checkOutDate.toLocaleString() : 'N/A'}
        </span>
      </td>
      <td className="max-w-[100px] border px-4 py-2">
   

      {}
      
        {!person.checkInDate && (
          <button
            className="text-blue-500"
            onClick={() => handleCheckIn(person._id)}
          >
            Check-in
          </button>
        )}
        
        {
        (person.checkInDate && !person.checkOutDate && hasCheckedIn) && (
          <button
            className="text-red-500"
            onClick={() => handleCheckOut(person._id)}
          >
            Check-out
          </button>
        )} 
        
        {
          (person.checkInDate && person.checkOutDate) && 'Checked in'
        }
      </td>
    </tr>
  );
}
