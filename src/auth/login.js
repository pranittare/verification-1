import React, { useState, useEffect } from 'react'
import { InputGroup, Input, Label, Button } from 'reactstrap'
import './auth.styles.css'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
function Login(props) {

  useEffect(()=>{
    console.log('redux',props)
  },[])

  let history = useHistory()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')


  const onHandleSubmit = ()=>{
    console.log(userId, password)
    setUserId('')
    setPassword('')
    history.push('/')
    
  }

  

  return (
    <div>
      Login
      <div className='pe-5 ps-5 w-50'>
          <Label id="basic-addon1">User Name</Label>
        <InputGroup className="mb-3">
          <Input
            placeholder="User Id"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputGroup>

          <Label id="basic-addon1">Password</Label>
        <InputGroup className="mb-3">
          <Input
            placeholder="Password"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button color='primary' onClick={()=>(onHandleSubmit())}>Submit</Button>
      </div>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    userData: state.data
  }
}
export default connect(mapStateToProps)(Login);
