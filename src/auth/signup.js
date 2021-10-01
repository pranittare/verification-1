import React, { useState } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import './auth.styles.css'


function SignUp() {

const [agentId, setAgentId] = useState('')
const [agentPassword, setAgentPassword] = useState('')
const [primaryPincode, setPrimaryPincode] = useState('')
const [userId, setUserId] = useState('')
const [name, setName] = useState('')
const [userPassword, setUserPassword] = useState('')
const [pincode, setPincode] = useState('')
const [level, setLevel] = useState('')

    return (
        <div>
            SignUp
            <div className="sagar">
                <div>
                    Agent
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
                        <FormControl
                            placeholder="Agent Id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value = {agentId}
                            onChange={(e)=>setAgentId(e.target.value)}
                        />
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">abc@123</InputGroup.Text>
                        <FormControl
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={agentPassword}
                            onChange={(e)=>setAgentPassword(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">123456</InputGroup.Text>
                        <FormControl
                            placeholder="Primary Pincode"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={primaryPincode}
                            onChange={(e)=>setPrimaryPincode(e.target.value)}
                        />
                    </InputGroup>
                    
                </div>
                <div>
                    User
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        <FormControl
                            placeholder="User Id"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={userId}
                            onChange={(e)=>setUserId(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">abc</InputGroup.Text>
                        <FormControl
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">abc@123</InputGroup.Text>
                        <FormControl
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value = {userPassword}
                            onChange={(e)=>setUserPassword(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">123456</InputGroup.Text>
                        <FormControl
                            placeholder="Pincode"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={pincode}
                            onChange={(e)=>setPincode(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                        <FormControl
                            placeholder="Level"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={level}
                            onChange={(e)=>setLevel(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default SignUp;