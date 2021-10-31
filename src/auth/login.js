import React, { useState, useEffect } from 'react'
import { InputGroup, Input, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { signInUser } from '../utils/signInUser';

function Login(props) {

  useEffect(() => {
    console.log('redux', props)
  }, [])

  let history = useHistory()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [branch, setBranch] = useState('branch-1')
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const onHandleSubmit = () => {
    signInUser(userId, password).then(res => {
      // console.log(res.user.email)
      props.dispatch({type: 'BRANCH', data: branch})
      setUserId('')
      setPassword('')
      setTimeout(()=> {
        history.push('/')

      },200)
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    })
  }
  let branches = [
    { name: 'branches', value: 'branch-1', label: 'Branch-1' },
    { name: 'branches', value: 'nashik', label: 'Nashik' },
    { name: 'branches', value: 'pune', label: 'Pune' },
  ]

  return (
    <div className='text-center container'>
      Login
      <div className='container'>
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
        <br />
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret className='text-capitalize'>
            {branch ? branch : 'None'}
          </DropdownToggle>
          <DropdownMenu>
            {branches.map(item => {
              return <DropdownItem key={item.value} name={item.name} onClick={(e) => setBranch(e.currentTarget.value)} value={item.value}>{item.label}</DropdownItem>
            })}


          </DropdownMenu>
        </Dropdown>
        <br />

        <Button color='primary' type='button' onClick={() => (onHandleSubmit())}>Submit</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.data
  }
}
export default connect(mapStateToProps)(Login);
