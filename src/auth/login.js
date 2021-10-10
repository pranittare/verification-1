import React, { useState } from 'react'
import { InputGroup, Input, Label } from 'reactstrap'
import './auth.styles.css'

function Login() {

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      Login
      <div className='pe-5 ps-5'>
        <InputGroup className="mb-3">
          <Label id="basic-addon1">@example.com</Label>
          <Input
            placeholder="User Id"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Label id="basic-addon1">abc.123</Label>
          <Input
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