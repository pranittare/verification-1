import './App.css';
import Login from './auth/login'
import SignUp from './auth/signup'
import Forget from './auth/forget'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './header/navigation';
import Dashboard from './landing/dashboard';
import TotalAgents from './agents/TotalAgents';
import ActiveAgents from './agents/ActiveAgents';
import Billing from './clients/Billing';
import Office from './forms/Office';
import Resident from './forms/Resident';
import Multi from './forms/Multi';

function App() {
  return (
    <div className="App">
      <Router >
        <Navigation />
        <Switch>
          <div className='ps-2 pe-2'>
          <Route path='/' render={() => <Dashboard />} exact />
          <Route path='/login' render={() => <Login />} />
          <Route path='/signup' render={() => <SignUp />} />
          <Route path='/forget' render={() => <Forget />} />
          <Route path='/total-agents' render={() => <TotalAgents />} />
          <Route path='/active-agents' render={() => <ActiveAgents />} />
          <Route path='/clients' render={() => <Billing />} />
          <Route path='/new' render={() => <Multi />} />
          <Route path='/office' render={() => <Office />} />
          <Route path='/office/:form' render={() => <Office />} />
          <Route path='/resident' render={() => <Resident />} />
          </div>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
