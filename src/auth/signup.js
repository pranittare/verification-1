import React, { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form, FormGroup, Label,  FormText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './auth.styles.css'


function SignUp() {

    const [agentId, setAgentId] = useState('')
    const [agentPassword, setAgentPassword] = useState('')
    const [primaryPincode, setPrimaryPincode] = useState('')
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [pincode, setPincode] = useState('')
    const [level, setLevel] = useState(1)
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    return (
        <div>
            SignUp
            <div className="sagar">
                <div>
                    Agent
                        <Label id="basic-addon1">Username</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Agent Id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={agentId}
                            onChange={(e) => setAgentId(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon1">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            type='password'
                            aria-describedby="basic-addon1"
                            value={agentPassword}
                            onChange={(e) => setAgentPassword(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon1">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Primary Pincode"
                            type='number'
                            aria-describedby="basic-addon1"
                            value={primaryPincode}
                            onChange={(e) => setPrimaryPincode(e.target.value)}
                        />
                    </InputGroup>

                </div>
                <div>
                    User
                        <Label id="basic-addon2">User Id</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="User Id"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon2">Name</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon2">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon2">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Pincode"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </InputGroup>

                        <Label id="basic-addon2">Level</Label>
                    {/* <InputGroup className="mb-3"> */}
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle variant="success" id="dropdown-basic">
                                {level}
                            </DropdownToggle>

                            <DropdownMenu >
                                <DropdownItem onClick={(e) => setLevel(e.target.value)} value={1}>1</DropdownItem>
                                <DropdownItem onClick={(e) => setLevel(e.target.value)} value={2}>2</DropdownItem>
                                <DropdownItem onClick={(e) => setLevel(e.target.value)} value={3}>3</DropdownItem>
                                <DropdownItem onClick={(e) => setLevel(e.target.value)} value={4}>4</DropdownItem>
                                <DropdownItem onClick={(e) => setLevel(e.target.value)} value={5}>5</DropdownItem>
                            </DropdownMenu>
                      </ButtonDropdown>
                    {/* </InputGroup> */}
                </div>
            </div>
        </div>
    );
}

export default SignUp;