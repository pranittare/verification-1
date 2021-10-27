import React, { useState } from 'react'
import { InputGroup, Input, Button, Label } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { useHistory } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {

    let history = useHistory()
    const [dropdownOpen, setOpen] = useState(false);
    const auth = getAuth();
    const [refresh, setRefresh] = useState(0)
    const [formdata, setFormdata] = useState({
        agentId: '',
        agentPassword: '',
        primaryPincode: '',
        userId: '',
        name: '',
        userPassword: '',
        pincode: '',
        level: '1',
        branches: ''
    })

    const toggle = () => setOpen(!dropdownOpen);

    const onHandleChange = (e) => {
        // name
        console.log('e', e)
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name])
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }

    const onHandleSubmit = () => {
        const { agentId, agentPassword, primaryPincode, userId, name, userPassword, pincode, level, branches } = formdata
        if (agentId) {
            console.log(
                agentId,
                agentPassword,
                primaryPincode,
                )
                history.push('/')
            // createUserWithEmailAndPassword(auth, agentId, agentPassword)
            //     .then((userCredential) => {
            //         // Signed in 
            //         // Add user info to database everything
            //         const user = userCredential.user;
            //         // ...
            //     })
            //     .catch((error) => {
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         alert('Something went Wrong')
            //         console.log('err', errorCode, errorMessage)
            //         // ..
            //     });
       
        }
        else {
            console.log(
                userId,
                name,
                userPassword,
                pincode,
                level,
                branches,
                )
                // history.push('/')
            // createUserWithEmailAndPassword(auth, userId, userPassword)
            // .then((userCredential) => {
            //     // Signed in 
            //     // Add user info to database everything
            //     const user = userCredential.user;
            //     // ...
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     alert('Something went Wrong')
            //     console.log('err', errorCode, errorMessage)
            //     // ..
            // });
         
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
            <div className="d-flex justify-content-around">
                <div>
                    Agent
                    <Label id="basic-addon1">Username</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Agent Id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name='agentId'
                            value={formdata.agentId}
                            autoComplete='off'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>

                    <Label id="basic-addon1">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            type='password'
                            aria-describedby="basic-addon1"
                            name='agentPassword'
                            value={formdata.agentPassword}
                            autoComplete='off'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>

                    <Label id="basic-addon1">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Primary Pincode"
                            type='number'
                            aria-describedby="basic-addon1"
                            value={formdata.primaryPincode}
                            autoComplete='off'
                            name='primaryPincode'
                            onChange={(e) => onHandleChange(e.currentTarget)}
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
                            autoComplete='off'
                            name='userId'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Name</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.name}
                            autoComplete='off'
                            name='name'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.userPassword}
                            autoComplete='off'
                            name='userPassword'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>

                    <Label id="basic-addon2">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Pincode"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={formdata.pincode}
                            autoComplete='off'
                            name='pincode'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                        />
                    </InputGroup>
                    <div className='d-flex justify-content-between mb-2'>
                        <div>
                            <Label >Level</Label>
                            <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={level} />
                        </div>
                        <div>
                            <Label >Branch</Label>
                            <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={branches} />

                        </div>

                    </div>

                </div>
            </div>
            <div>
                <Button color='primary' onClick={() => (onHandleSubmit())}>Submit</Button>
            </div>
        </div>
    );
}

export default SignUp;