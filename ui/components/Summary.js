import React, { useState } from 'react';
import { useEffect } from 'react';

export default function Summary({ people }) {
  const [peopleNotCheckedIn, setPeopleNotCheckedIn] = useState(0);
  const [peopleCheckedIn, setPeopleCheckedIn] = useState(0);

  useEffect(() => {
    if (people.length) {
      let countPeopleNotCheckedIn = 0;
      let countPeopleCheckedIn = 0;

      people.map((person) => {
        if (person && !person.checkInDate) {
          countPeopleNotCheckedIn++;
        }
        
        if (person && person.checkInDate) {
          countPeopleCheckedIn++;
        }
      });

      setPeopleNotCheckedIn(countPeopleNotCheckedIn);
      setPeopleCheckedIn(countPeopleCheckedIn);
    } else {
      setPeopleNotCheckedIn(0);
      setPeopleCheckedIn(0);
    }
  }, [people]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 mb-8 gap-4'>
      <div className="h-32 w-full rounded-lg bg-white p-4 text-center sm:text-left">
        <span className="text-5xl">{people.length || 0}</span>
        <p className="mt-5 text-sm">People in the event right now</p>
      </div>
      <div className="h-32 rounded-lg bg-white p-4 text-center sm:text-left">
        <span className="text-5xl">{peopleNotCheckedIn || 0}</span>
        <p className="mt-5 text-sm">People not checked in</p>
      </div>
      <div className="h-32 rounded-lg bg-white p-4 text-center sm:text-left">
        <span className="text-5xl">{peopleCheckedIn || 0}</span>
        <p className="mt-5 text-sm">People checked in</p>
      </div>
    </div>
  );
}
