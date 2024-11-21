import React, { useEffect } from 'react';
import { Communities } from '../../communities/communities';
import { useTracker } from 'meteor/react-meteor-data';
import { useAppContext } from '../hooks/useAppContext';

export default function EventSelector() {
  const { selectedEvent, setSelectedEvent } = useAppContext();

  const communities = useTracker(() => {
    Meteor.subscribe('communities');
    return Communities.find().fetch();
  });

  return (
    <header className="fixed top-0 w-full pt-2 bg-gray-100 px-4">
      <h1 className="text-center text-xl font-semibold text-gray-800">
        Event Check-In Dashboard
      </h1>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 grid grid-cols-3 gap-4">
          <div>
            <label className="block w-full text-sm font-medium text-gray-700">
              Select an Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="mb-4 block rounded border p-2"
            >
              <option key={0} value="0">Select an event</option>
              {communities.map((community) => (
                <option key={community._id} value={community._id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
