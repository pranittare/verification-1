import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  branch: 'branch-1',
  user: 'user profile',
  agents: [],
  forms: [],
  users: [],
  fagents: [],
  fforms: [],
  fusers: [],
  vendors: [],
  oldcases: null,

}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BRANCH':
      return {
        ...state,
        branch: action.data
      }
    case 'USER':
      return {
        ...state,
        user: action.data
      }
    case 'USERS':
      return {
        ...state,
        users: action.data
      }
    case 'FORM':
      return {
        ...state,
        forms: action.data
      }
    case 'AGENTS':
      return {
        ...state,
        agents: action.data
      }
    case 'FAGENTS':
      return {
        ...state,
        fagents: action.data
      }
    case 'FFORMS':
      return {
        ...state,
        fforms: action.data
      }
    case 'FUSERS':
      return {
        ...state,
        fusers: action.data
      }
    case 'OLDCASES':
      return {
        ...state,
        oldcases: action.data
      }
    case 'AUTH':
      return {
        ...state,
        auth: action.data
      }
    case 'FVENDORS' : 
      return {
        ...state,
        vendors: action.data
      }
    default:
      return state
  }
}

const composeEnhancers = composeWithDevTools({
  // actionCreators,
  trace: true,
  traceLimit: 25,
});
export const store = createStore(reducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
