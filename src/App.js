//import logo from './logo.svg';
import './App.css';
import Employee from './components/Employee';

function App() {
  const showEmployees = true;
  
  return (
    <div className="App">
      {console.log("We are about to list employees.")}
      {showEmployees ? 
        <>
          <Employee name="Steve" role="Intern"/>
          <Employee name="Roger"/>
          <Employee name="Erin"/>
          <Employee name="Mary"/>
        </>
        : 
        <p>You cannot see the employess</p>}

    </div>
  );
}

export default App;
