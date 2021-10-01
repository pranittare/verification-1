import React, { useState } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import './auth.styles.css'

function Login() {

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      Login
      <div className='pe-5 ps-5'>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
          <FormControl
            placeholder="User Id"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">abc.123</InputGroup.Text>
          <FormControl
            placeholder="Password"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default Login;