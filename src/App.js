//import logo from './logo.svg';
import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState("dev");
  const showEmployees = true;
  
  return (
    <div className="App">
      {showEmployees ? 
        <>
          <input type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
          }}/>

          <Employee name="Steve" role="Intern"/>
          <Employee name="Roger" role={ role }/>
          <Employee name="Erin"/>
          <Employee name="Mary"/>
        </>
        : 
        <p>You cannot see the employess</p>}

    </div>
  );
}

export default App;
