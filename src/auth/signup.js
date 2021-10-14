import React, { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form, FormGroup, Label, FormText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './auth.styles.css'
import DropDownComp from '../components/DropDownComp';
import {useHistory} from 'react-router-dom'


function SignUp() {

    let history = useHistory()

    // const [agentId, setAgentId] = useState('')
    // const [agentPassword, setAgentPassword] = useState('')
    // const [primaryPincode, setPrimaryPincode] = useState('')
    // const [userId, setUserId] = useState('')
    // const [name, setName] = useState('')
    // const [userPassword, setUserPassword] = useState('')
    // const [pincode, setPincode] = useState('')
    // const [level, setLevel] = useState(1)
    const [dropdownOpen, setOpen] = useState(false);

    const [refresh, setRefresh] = useState(0)
    const [formdata, setFormdata] = useState({
        agentId:'',
        agentPassword:'',
        primaryPincode:'',
        userId:'',
        name:'',
        userPassword:'',
        pincode:'',
        level:'1',
        branches:''
    })

    const toggle = () => setOpen(!dropdownOpen);

    const onHandleChange = (e) => {
        // name
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name])
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }

    const onHandleSubmit = () => {
        if (formdata.agentId) {
            console.log(
                formdata.agentId,
                formdata.agentPassword,
                formdata.primaryPincode,
                history.push('/')
                )
        }
        else {
            console.log(
                formdata.userId,
                formdata.name,
                formdata.userPassword,
                formdata.pincode,
                formdata.level,
                history.push('/')
                )
        }
    }

    let level = [
        { name: 'level', value: '1', label: '1' },
        { name: 'level', value: '2', label: '2' },
        { name: 'level', value: '3', label: '3' },
        { name: 'level', value: '4', label: '4' },
        { name: 'level', value: '5', label: '5' },
    ]

    let branches = [
        { name: 'branches', value: 'branch-1', label: 'Branch-1' },
        { name: 'branches', value: 'nashik', label: 'Nashik' },
        { name: 'branches', value: 'pune', label: 'Pune' },
    ]

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
                            value={formdata.agentId}
                            onChange={(e) => formdata.setAgentId(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon1">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            type='password'
                            aria-describedby="basic-addon1"
                            value={formdata.agentPassword}
                            onChange={(e) => formdata.setAgentPassword(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon1">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Primary Pincode"
                            type='number'
                            aria-describedby="basic-addon1"
                            value={formdata.primaryPincode}
                            onChange={(e) => formdata.setPrimaryPincode(e.target.value)}
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
                            value={formdata.userId}
                            onChange={(e) => formdata.setUserId(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Name</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.name}
                            onChange={(e) => formdata.setName(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.userPassword}
                            onChange={(e) => formdata.setUserPassword(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Pincode"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.pincode}
                            onChange={(e) => formdata.setPincode(e.target.value)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Level</Label>
                    {/* <InputGroup className="mb-3"> */}
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={level} />

                    <Label id="basic-addon2">Branch</Label>
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={branches} />
                    {/* <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
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
                      </ButtonDropdown> */}
                    {/* </InputGroup> */}
                    <div>
                    <Button color='primary' onClick={() => (onHandleSubmit())}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;