import React, { useState, useEffect } from 'react'
import { InputGroup, Input, Button, Label, FormGroup } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { createUser } from '../utils/createUser'
import { getDatabase, ref, set } from "firebase/database";

function SignUp({ agentsTotal, agentsActive, usersTotal }) {
    const db = getDatabase();
    let history = useHistory()
    const [dropdownOpen, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [selector, setSelector] = useState('agent')
    const [formdata, setFormdata] = useState({
        agentId: '',
        agentPassword: '',
        agentName: '',
        primaryPincode: '',
        secondaryPincode: [],
        userId: '',
        name: '',
        userPassword: '',
        pincode: '',
        level: '1',
        branches: '',
        agentBranches: ''
    })

    const toggle = () => setOpen(!dropdownOpen);

    const onHandleChange = (e) => {
        // name
        // console.log('e', e)
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name])
        if (selector === 'agent') {
            if (e.name === 'agentId') {
                duplicateAgents(e.value)
            }
        } else {
            if (e.name === 'userId') {
                duplicateUsers(e.value)
            }
        }
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }

    const onHandleSubmit = () => {
        const { agentId, agentPassword, primaryPincode, userId, name, userPassword, pincode, level, branches, agentName, secondaryPincode } = formdata
        if (!branches) {
            alert('Please Select branch')
        }
        if (selector === 'agent') {
            // console.log(
            //     agentId,
            //     agentPassword,
            //     primaryPincode,
            // )
            // history.push('/')
            // createUserWithEmailAndPassword(auth, agentId, agentPassword)
            //     .then((userCredential) => {
            //         // Signed in 
            //         // Add user info to database everything
            //         const user = userCredential.user;
            let data = {
                userId: agentId,
                password: agentPassword,
                pincode: primaryPincode,
                name: agentName,
                created: new Date().toDateString(),
                lastUpdated: '',
                branch: branches,
                secondary: secondaryPincode
            }
            console.log('data', data)
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
            // console.log(
            //     userId,
            //     name,
            //     userPassword,
            //     pincode,
            //     level,
            //     branches,
            // )
            // history.push('/')
            // createUserWithEmailAndPassword(auth, userId, userPassword)
            // .then((userCredential) => {
            //     // Signed in 
            //     // Add user info to database everything
            //     const user = userCredential.user;
            createUser(userId, userPassword).then(res => {
                alert(`User created ${res.user.email}`)
                let data = {
                    userId: userId,
                    password: userPassword,
                    created: new Date().toDateString(),
                    name: name,
                    lastUpdated: '',
                    level: level,
                    branch: branches,
                    // branch: this.form.value.branch
                }

                set(ref(db, 'users/'), data).then(res => {
                    alert('Real time Database Updated')
                }).catch(err => {
                    alert('Something went Wrong check log and database')
                    console.log('err create user', err)
                })
            }).catch(err => {
                alert('User registration Error')
                console.log('user Registration', err)
            })


            // console.log('data', data)

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

    const duplicateAgents = (value) => {
        if (agentsTotal?.length > 0) {
            for (let index = 0; index < agentsTotal.length; index++) {
                const element = agentsTotal[index];
                if (element.userId === value) {
                    alert(`Agent Name found ${element.name}`)
                    if (element.secondaryPincodes?.length > 0) {
                        console.log('element', element)
                        let form = formdata
                        form.agentName = element.name
                        console.log('form', form)
                        form.secondaryPincode = element.secondaryPincodes
                        setFormdata(form)
                    }
                }
                // console.log('total', element)
            }
        }
        if (agentsActive) {
            const agentKeys = Object.keys(agentsActive)
            for (let j = 0; j < agentKeys.length; j++) {
                const element1 = agentKeys[j];
                let agent = agentsActive[element1]
                if (agent.userId === value) {
                    alert(`Douplicate entry found in Active Agents: Agent Name ${agent.name}`)
                }
            }
        }
    }
    const duplicateUsers = (value) => {
        if (usersTotal) {
            const userKeys = Object.keys(usersTotal)
            for (let j = 0; j < userKeys.length; j++) {
                const element1 = userKeys[j];
                let user = usersTotal[element1]
                if (user.userId === value) {
                    alert(`Douplicate entry found in Users: User Name ${user.name} : Level ${user.level}`)
                }
            }
        }
    }
    // const 

    return (
        <div>
            SignUp
            <div className='d-flex justify-content-around'>
                <FormGroup check>
                    <Input
                        type="radio"
                        onChange={() => setSelector('agent')}
                        checked={selector === 'agent'}
                    />
                    {' '}
                    <Label check>
                        Agent
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        onChange={() => setSelector('user')}
                        checked={selector === 'user'}
                        type="radio"
                    />
                    {' '}
                    <Label check>
                        User
                    </Label>
                </FormGroup>
            </div>
            <div className="d-flex justify-content-around">
                <div>
                    <Label id="basic-addon1">Agent Id</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Agent Id"
                            name='agentId'
                            value={formdata.agentId}
                            autoComplete='off'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                            disabled={selector !== 'agent'}
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
                            disabled={selector !== 'agent'}
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
                            disabled={selector !== 'agent'}
                        />
                    </InputGroup>

                </div>
                <div>
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
                            disabled={selector !== 'user'}

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
                            disabled={selector !== 'user'}

                        />
                    </InputGroup>

                    <Label id="basic-addon2">Password</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Password"
                            type='password'
                            value={formdata.userPassword}
                            autoComplete='off'
                            name='userPassword'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                            disabled={selector !== 'user'}

                        />
                    </InputGroup>

                    <Label id="basic-addon2">Pincode</Label>
                    <InputGroup className="mb-3">
                        <Input
                            placeholder="Pincode"
                            type='number'
                            value={formdata.pincode}
                            autoComplete='off'
                            name='pincode'
                            onChange={(e) => onHandleChange(e.currentTarget)}
                            disabled={selector !== 'user'}

                        />
                    </InputGroup>
                    <div className='d-flex justify-content-center mb-2'>
                        <div>
                            <Label >Level</Label>
                            <DropDownComp id='signup' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={level} />
                        </div>


                    </div>

                </div>

            </div>
            <div className='mb-2'>
                <Label >Branch</Label>
                <DropDownComp id='signup' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={branches} />

            </div>
            <div>
                <Button color='primary' onClick={() => (onHandleSubmit())}>Submit</Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        agentsTotal: state.fagents,
        agentsActive: state.agents,
        usersTotal: state.users
    }
}
export default connect(mapStateToProps)(SignUp);