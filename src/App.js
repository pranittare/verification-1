import { Button } from 'react-bootstrap';
import './App.css';
import Login from './auth/login'
import SignUp from './auth/signup'
import Forget from './auth/forget'

function App() {
  return (
    <div className="App">
      sagar
      <Button variant="primary">abc</Button>
      <div>
        <Login/>
        <SignUp/>
        <Forget/>
      </div>

    </div>
  );
}

export default App;
