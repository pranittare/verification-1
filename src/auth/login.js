import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import './auth.styles.css'


function Login() {
    return (
      <div>
        Login
        <div className='pe-4 ps-4'>
        <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
                        <FormControl
                            placeholder="User Id"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">abc.123</InputGroup.Text>
                        <FormControl
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
        </div>
      </div>
    );
  }
  
  export default Login;