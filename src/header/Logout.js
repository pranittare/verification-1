import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const Logout = (props) =>{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory()
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth).then(res => {
            props.dispatch({ type: 'AUTH', data: '' })
            history.push('/login')

        }).catch(err => {
            alert('Something went wrong try again')
            console.log('err', err)
        })
    }
    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {props.email}
                </DropdownToggle>
                <DropdownMenu>

                    <DropdownItem onClick={handleLogout}>logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Logout)
