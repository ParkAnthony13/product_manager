import './App.css';
import Forms from './components/Forms'
import SingleProduct from './components/SingleProduct'
import React,{useState} from 'react';
import {Router} from '@reach/router'


function App() {
  const[callToggle,setCallToggle] = useState(true)
  return (
    <div className="App">
      <Router>
        <Forms path="/" callToggle={callToggle} setCallToggle={setCallToggle}/>
        <SingleProduct path="/product/:id" callToggle={callToggle} setCallToggle={setCallToggle}/>
      </Router>
    </div>
  );
}

export default App;