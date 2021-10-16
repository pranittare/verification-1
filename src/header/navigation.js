import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

export default function Navigation({ onHandleSidebar }) {
    const [sidebar, setSidebar] = useState(false)
    const toggle = () => setSidebar(!sidebar)
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                     <Dropdown isOpen={sidebar} toggle={toggle}>
                        <DropdownToggle >
                            ...
                        </DropdownToggle>
                        {sidebar && <DropdownMenu>
                            <DropdownItem>Some Action</DropdownItem>
                           
                        </DropdownMenu>}
                    </Dropdown>
                    {/* <button className='btn' onClick={toggle}>exp</button> */}
                    <a className="navbar-brand" href="#">Prahar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/signup'>Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/new'>New</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/office'>Office</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/resident'>Resident</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/ActiveCases'>Active Cases</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/SubmittedCases'>Submitted Cases</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/oldCases'>Old Cases</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/active-agents'>Active Agents</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/total-agents'>Total Agents</Link>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>

        </>
    )
}


