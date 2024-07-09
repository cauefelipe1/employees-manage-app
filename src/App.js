//import logo from './logo.svg';
import './App.css';
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';
import { useState } from 'react';

function App() {
  const showEmployees = true;

  const [employees, setEmployees] = useState(
    [
      { id: 1, name: "Julie", role: "Intern", img: "https://images.pexels.com/photos/2092474/pexels-photo-2092474.jpeg" },
      { id: 2, name: "Kate", role: "Developer", img: "https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg" },
      { id: 3, name: "Jack", role: "Scrum Master", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" },
      { id: 4, name: "Clarie", role: "HR Coordinator", img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" },
      { id: 5, name: "Hugo", role: "Quality", img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg" },
      { id: 6, name: "Michael", role: "DevOps Engineer", img: "https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg" },
      { id: 7, name: "Sarah", role: "CFO", img: "https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg" },
      { id: 8, name: "Jane", role: "CTO", img: "https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg" },
      { id: 9, name: "James", role: "Supervisor", img: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg" }
    ]);

  function onUpdateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return {...employee, name: newName, role: newRole};
      }

      return employee;
    });

    setEmployees(updateEmployees);
  }

  return (
    <div className="App">
      {showEmployees ? 
        <>
          <div className="flex flex-wrap jusify-center">

            {employees.map((employee) => {
              
              return (
                <Employee 
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  onUpdateEmployee={onUpdateEmployee}/>
              );
            })} 
            
          </div>

          <AddEmployee />
          
        </>
        : 
        <p>You cannot see the employess</p>}

    </div>
  );
}

export default App;
