import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './auth/login'
import SignUp from './auth/signup'
import Forget from './auth/forget'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './header/navigation';
import Dashboard from './landing/dashboard';
import TotalAgents from './agents/TotalAgents'
import ActiveAgents from './agents/ActiveAgents';
import Billing from './clients/Billing';
import Office from './forms/Office';
import Resident from './forms/Resident';
import Multi from './forms/Multi';
import ActiveCases from './Cases/ActiveCases'
import SubmittedCases from './Cases/SubmittedCases';
import OldCases from './Cases/OldCases';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, onValue, get } from "firebase/database";
import { connect } from 'react-redux';

const firebaseConfig = {
  apiKey: "AIzaSyB9c5BdRrl55U04wioeaP5uMTclzu9trgM",
  authDomain: "verification-43844.firebaseapp.com",
  databaseURL: "https://verification-43844.firebaseio.com",
  projectId: "verification-43844",
  storageBucket: "verification-43844.appspot.com",
  messagingSenderId: "6012213713",
  appId: "1:6012213713:web:84698986ce43c1bc3268f0",
  measurementId: "G-C3G7LZQEGT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const realtime = getDatabase(app);

function App(props) {

  const realtimedb = (update) => {
    const getDetails = ref(realtime, `${update}/`);
    onValue(getDetails, (snapshot) => {
      const data = snapshot.val();
      // console.log(`${update}`, data)
      let val = update.toString().toUpperCase()
      props.dispatch({ type: val, data: data })
      // updateStarCount(postElement, data);
    });
  }
  const databaseUpdate = async (update) => {
    let value = []
    const getDetails = collection(db, `${update}`);
    const snapshot = await getDocs(getDetails);
    snapshot.forEach(snap => {
      value.push(snap.data())
    })
    // console.log('val', value)
    let val = update.toString().toUpperCase()
    props.dispatch({ type: `F${val}`, data: value })
  }
  useEffect(() => {
    realtimedb('agents')
    realtimedb('form')
    realtimedb('users')
    databaseUpdate('agents')
    // setTimeout(() => {
    //   console.log('props', props)
    // }, 1000)
  }, [])
  // const starCountRef = ref(db, 'agents');
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log('data', data)
  // });
  const onHandleSidebar = () => {
    console.log('clicked')
  }
  return (
    <div className="App">
      <Router >
        <Navigation />
        <Switch>
     
          <div className={'ps-2 pe-2'}>
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
            <Route path='/ActiveCases' render={() => <ActiveCases />} />
            <Route path='/SubmittedCases' render={() => <SubmittedCases />} />
            <Route path='/oldCases' render={() => <OldCases />} />
          </div>
        </Switch>

      </Router>
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log('state', state)
  return {}

}

export default connect(mapStateToProps)(App);
