import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import Logout from './Logout';

const Navigation = ({ auth }) => {
    const [sidebar, setSidebar] = useState(false)
    const toggle = () => setSidebar(!sidebar)
    return (
        <div className='d-flex justify-content-between mx-2'>
            <Dropdown isOpen={sidebar} toggle={toggle} className='me-4'>
                <DropdownToggle >
                    Menu
                </DropdownToggle>
                {sidebar && <DropdownMenu>
                    <DropdownItem><Link className="nav-link" to='/ActiveCases'>Active Cases</Link></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/SubmittedCases'>Submitted Cases</Link></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/oldCases'>Old Cases</Link></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/active-agents'>Active Agents</Link></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/total-agents'>Total Agents</Link></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/clients'>Clients</Link></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem><Link className="nav-link" to='/Cleanup'>Cleanup</Link></DropdownItem>
                </DropdownMenu>}
            </Dropdown>
            {/* <button className='btn' onClick={toggle}>exp</button> */}
            <div className='d-flex'>
                <Link to='/' className="nav-link active" aria-current="page">Prahar</Link>
            </div>
                {!auth && <Link className="nav-link" to='/login'>Login</Link>}
            {auth && <div className='d-flex'>
                <Link className="nav-link" to='/signup'>Signup</Link>
                <Link className="nav-link" to='/new'>New</Link>
                <Logout email={auth?.email} />

            </div>}

        </div>
    )
}

export default Navigation;

