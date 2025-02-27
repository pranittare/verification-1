import React, { useState, useEffect } from 'react';
import Login from './auth/Login'
import SignUp from './auth/Signup'
import Forget from './auth/Forget'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './header/Navigation';
import Dashboard from './landing/Dashboard';
import TotalAgents from './agents/TotalAgents'
import ActiveAgents from './agents/ActiveAgents';
import Vendor from './clients/Vendor';
import Office from './forms/Office';
import Resident from './forms/Resident';
import Multi from './forms/Multi';
import ActiveCases from './Cases/ActiveCases'
import SubmittedCases from './Cases/SubmittedCases';
import OldCases from './Cases/OldCases';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, setPersistence, inMemoryPersistence } from "firebase/auth";
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Cleanup from './Cleanup/Cleanup'
import './App.css';
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
export const db = getFirestore(app)
const realtime = getDatabase(app);

function App(props) {
  const auth = getAuth();
  // console.log('auth', auth)
  const [isUser, setIsUser] = useState(false)
  const [top, setTop] = useState(false)
  const realtimedb = (update) => {
    const getDetails = ref(realtime, `${update}/`);
    onValue(getDetails, (snapshot) => {
      const data = snapshot.val();
      // console.log(`${update}`, data)
      let val = update.toString().toUpperCase()
      props.dispatch({ type: val, data: data })
      // console.log(`${update}`, data)
      // updateStarCount(postElement, data);
    });
  }
  const databaseUpdate = async (update) => {
    let value = []
    const getDetails = collection(db, `${update}`);
    const snapshot = await getDocs(getDetails);
    snapshot.forEach(snap => {
      let data = snap.data()
      data.key = snap.id
      value.push(data)
    })
    console.log(`${update}`, value)
    // console.log('snap', value);
    // console.log('val', value)
    let val = update.toString().toUpperCase()
    props.dispatch({ type: `F${val}`, data: value })
  }
  const scrollToBottom = () => {
    let bottom = document.getElementById('app').clientHeight
    if (top) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, bottom)
    }
    setTop(!top)
  }

  useEffect(() => {
    realtimedb('agents')
    realtimedb('form')
    realtimedb('users')
    realtimedb('casestoday')
    databaseUpdate('agents')
    databaseUpdate('vendors')
    databaseUpdate('backup')
  }, [])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `email=${user.email}`
        setIsUser(true)
      } else {
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsUser(false)
      }
    })
  }, []);

  const isAuth = () => {
    // console.log('auth', auth)
    if (auth?.currentUser) {
      return <>

        <Route path='/' render={() => <Dashboard />} exact />
        <Route path='/signup' render={() => <SignUp />} />
        <Route path='/forget' render={() => <Forget />} />
        <Route path='/total-agents' render={() => <TotalAgents />} />
        <Route path='/active-agents' render={() => <ActiveAgents />} />
        <Route path='/clients' render={() => <Vendor />} />
        <Route path='/new' render={() => <Multi />} />
        <Route path='/office' exact render={() => <Office />} />
        <Route path='/office/:pincode/:id' render={() => <Office />} />
        <Route path='/resident' exact render={() => <Resident />} />
        <Route path='/resident/:pincode/:id' render={() => <Resident />} />
        <Route path='/ActiveCases' render={() => <ActiveCases />} />
        <Route path='/SubmittedCases' render={() => <SubmittedCases />} />
        <Route path='/oldCases' render={() => <OldCases />} />
        <Route path={'/Cleanup'} render={() => <Cleanup />}/>
        {/* <Redirect from="/login" to="/" /> */}
      </>
    }
    return <>
      <Route path='/login' render={() => <Login />} />
      {/* <Redirect from="/" to="/login" /> */}
    </>
}

return (
  <div className="text-center w-100" id='app'>
    <Button className='fixed-bottom1' onClick={scrollToBottom}>{top ? 'Top' : 'Bottom'}</Button>
    <Router >
      <Navigation auth={auth?.currentUser} />
      <Switch>
          {isAuth()}
      </Switch>

    </Router>
  </div>
);
}
const mapStateToProps = (state) => {

  return {
    query: state.data
  }

}

export default connect(mapStateToProps)(App);
