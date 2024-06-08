// import React from 'react';
import Dashboard from './components/Dashboard';
 import { DataProvider } from './components/DataProvider';
import './App.css';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <DataProvider>
//         <Dashboard />
//       </DataProvider>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faCheck, faEdit, faComments, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
//import './Dashboard.css';

// Define the Employee type
interface Employee {
  name: string;
  prOpen: number;
  prMerged: number;
  commits: number;
  prReviewed: number;
  prComments: number;
  incidentAlerts: number;
  incidentsResolved: number;
  photo: string;
}

// List of random names
const names = [
  'Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Evans', 'Edward Harris',
  'Fiona Clark', 'George Wright', 'Hannah Scott', 'Ian Thompson', 'Jane Walker',
  'Kevin Martinez', 'Laura Young', 'Michael Lewis', 'Nancy Hall', 'Oliver King',
  'Patricia Green', 'Quincy Baker', 'Rachel Adams', 'Samuel Nelson', 'Tina Hill',
  'Ulysses Campbell', 'Victoria Roberts', 'Walter Perez', 'Xena Collins', 'Yvonne Stewart',
  'Zachary Turner', 'Aaron Phillips', 'Brenda Parker', 'Cameron Cox', 'Donna Richardson'
];

// Function to generate random data
const generateRandomData = (): Employee[] => {
  const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomPhoto = () => `https://source.unsplash.com/random/300x200?sig=${Math.random()}`;

  const data: Employee[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      name: names[randomInt(0, names.length - 1)],
      prOpen: randomInt(0, 5),
      prMerged: randomInt(0, 5),
      commits: randomInt(0, 20),
      prReviewed: randomInt(0, 10),
      prComments: randomInt(0, 15),
      incidentAlerts: randomInt(0, 3),
      incidentsResolved: randomInt(0, 3),
      photo: randomPhoto(),
    });
  }
  return data;
};

const App: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployeeData(generateRandomData());
  }, []);

  return (
    <DataProvider>
    <div className="dashboard">
      <h1>Developer Activity Dashboard</h1>
      <div className="cards-container">
        {employeeData.map((employee, index) => (
          <div className="card" key={index}>
            <img src={"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"} alt={employee.name} />
            <div className="card-content">
              <h2>{employee.name}</h2>
              <div className="data-item">
                <FontAwesomeIcon icon={faCodeBranch} className="icon" />
                <span>PR Open: {employee.prOpen}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faCheck} className="icon" />
                <span>PR Merged: {employee.prMerged}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faEdit} className="icon" />
                <span>Commits: {employee.commits}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                <span>PR Reviewed: {employee.prReviewed}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faComments} className="icon" />
                <span>PR Comments: {employee.prComments}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faExclamationCircle} className="icon" />
                <span>Incident Alerts: {employee.incidentAlerts}</span>
              </div>
              <div className="data-item">
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                <span>Incidents Resolved: {employee.incidentsResolved}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Dashboard />
    </DataProvider>
  );
};

export default App;
