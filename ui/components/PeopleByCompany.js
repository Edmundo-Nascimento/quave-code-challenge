import React, { useState, useEffect } from 'react';

export default function PeopleByCompany({ people }) {
  const InitialVisibleCompanies = 5;
  const [peopleByCompany, setPeopleByCompany] = useState([]);
  const [visibleCount, setVisibleCount] = useState(InitialVisibleCompanies); // Quantidade inicial de empresas visíveis

  useEffect(() => {
    setVisibleCount(InitialVisibleCompanies);
    
    const companies = people.reduce((acc, person) => {
      if (person && person.companyName) {
        acc[person.companyName] = (acc[person.companyName] || 0) + 1;
      } else {
        acc["No company"] = (acc["No company"] || 0) + 1;
      }

      return acc;
    }, {});

    const companyList = Object.entries(companies).map(([name, value]) => ({
      name,
      value,
    }));

    setPeopleByCompany(companyList);
  }, [people]);

  const toggleVisibleCount = () => {
    setVisibleCount(visibleCount === 5 ? peopleByCompany.length : 5);
  };

  return (
    <div className="col-span-10 lg:col-span-2 bg-white p-4">
      <h2>People By Company</h2>
      <div className="mt-4 flex flex-wrap gap-x-2">
        {peopleByCompany.slice(0, visibleCount).map((company, idx) => (
          <span
            key={`${idx}_${company.name}_(${company.value})`}
            className="bg-blue-300 mt-2 p-1 text-xs rounded-2xl"
          >
            {`${company.name} (${company.value})`}
          </span>
        ))}
      </div>
      {peopleByCompany.length > 5 && (
        <button
          onClick={toggleVisibleCount}
          className="mt-2 text-blue-500 underline"
        >
          {visibleCount === 5 ? 'Ver mais' : 'Ver menos'}
        </button>
      )}
    </div>
  );
}
