import React, { useState } from 'react';
import EventSelector from './EventSelector';
import PeopleTable from './PeopleTable';

export default function EventCheckInDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <EventSelector />
      <PeopleTable />
    </div>
  );
}
