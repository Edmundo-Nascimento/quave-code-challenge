import React, { useState } from 'react';
import PeopleTableRow from './PeopleTableRow';
import { People } from '../../people/people';
import { useTracker } from 'meteor/react-meteor-data';
import Summary from './Summary';
import PeopleByCompany from './PeopleByCompany';
import { useAppContext } from '../hooks/useAppContext';

export default function PeopleTable() {
  const { selectedEvent, setIsLoading } = useAppContext();

  const [currentPage, setCurrentPage] = useState(0);

  const { loading, people, totalPeople, peopleNotCheckedOut } =
    useTracker(() => {
      if (!selectedEvent) return { people: [], totalPeople: 0 };

      const handle = Meteor.subscribe('people', selectedEvent);

      if (!handle.ready()) {
        return { people: [], totalPeople: 0 };
      }

      const loading = !handle.ready();

      const people = loading
        ? []
        : People.find({ communityId: selectedEvent }).fetch();

      const totalPeople = loading
        ? []
        : People.find({ communityId: selectedEvent }).count();
      const peopleNotCheckedOut = loading
        ? 0
        : People.find({
            $or: [{ checkOutDate: { $exists: false } }, { checkOutDate: null }],
          }).fetch();

      return { loading, people, totalPeople, peopleNotCheckedOut };
    }, [selectedEvent, currentPage]);

  return (
    <>
      <main className="px-4 pt-16">
        <div className="grid grid-cols-10 gap-4">
          <div className="order-last col-span-10 lg:order-first lg:col-span-8">
            <Summary people={people} />
            <div className="col-span-3 bg-white p-4">
              <div className="overflow-x-auto">
                {people.length > 0 ? (
                  <table className="w-full rounded-md bg-white">
                    <thead>
                      <tr className="text-sm uppercase leading-normal text-gray-600">
                        <th className="w-[150px] px-6 py-3 text-left">Name</th>
                        <th className="w-[150px] px-6 py-3 text-left">
                          Company
                        </th>
                        <th className="w-[150px] px-6 py-3 text-left">Role</th>
                        <th className="w-[120px] px-6 py-3 text-left">
                          Check-in
                        </th>
                        <th className="w-[120px] px-6 py-3 text-left">
                          Check-out
                        </th>
                        <th className="w-[100px] px-6 py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-700">
                      {people.map((person) => {
                        return (
                          <PeopleTableRow key={person._id} person={person} />
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className='text-center h-screen pt-40'>
                    {(selectedEvent === '0' && people.length === 0)? (
                      <p>Selecione um evento para ver os convidados</p>
                    ) : (
                      <p>Nenhum convidado encontrado</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <PeopleByCompany people={people} />
        </div>
      </main>
    </>
  );
}
