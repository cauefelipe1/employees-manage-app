//import logo from './logo.svg';
import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState("dev");
  const showEmployees = true;
  const dummyImgUrl = "https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg"
  
  return (
    <div className="App">
      {showEmployees ? 
        <>
          <input type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
          }}/>

          <div className="flex flex-wrap jusify-center">
            <Employee name="Steve" role="Intern" img={ dummyImgUrl }/>
            <Employee name="Roger" role={ role } img={ dummyImgUrl }/>
            <Employee name="Erin" img={ dummyImgUrl }/>
            <Employee name="Mary" img={ dummyImgUrl }/>
            <Employee name="Steve" role="Intern" img={ dummyImgUrl }/>
            <Employee name="Roger" role={ role } img={ dummyImgUrl }/>
            <Employee name="Erin" img={ dummyImgUrl }/>
            <Employee name="Mary" img={ dummyImgUrl }/>
            <Employee name="Steve" role="Intern" img={ dummyImgUrl }/>
          </div>
        </>
        : 
        <p>You cannot see the employess</p>}

    </div>
  );
}

export default App;
