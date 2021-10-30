import React, { useState, useEffect } from 'react'
import { Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const DropDownComp = ({ onHandleChange, formdata, dropDowmArry, handleOnChange, id, other }) => {

    const [addressConfirmedOpen, setAddressConfirmed] = useState(false);
    const addressConfirmedtoggle = () => setAddressConfirmed(prevState => !prevState);

    // const onHandleChange = (e) => {
    //     // name
    //     let form = formdata
    //     form[e.name] = e.value
    //     // console.log(e, form[e.name] )
    //     setFormdata(form)
    //     setRefresh(Math.random())
    //     // console.log(form)
    // }

    return (
        <div>
            <Dropdown isOpen={addressConfirmedOpen} toggle={addressConfirmedtoggle}>
                <DropdownToggle caret className='text-capitalize'>
                    {formdata[dropDowmArry[0].name] ? formdata[dropDowmArry[0].name] : 'None'}
                </DropdownToggle>
                <DropdownMenu>
                  {other ?
                  dropDowmArry.map(item => {
                    return <DropdownItem key={`${item.value}-${id}`} name={item.name} onClick={(e) => onHandleChange(e.currentTarget)} value={item.value}>{item.label}</DropdownItem>
                })
                  :
                  dropDowmArry.map(item => {
                    return <DropdownItem key={`${item.name}-${id}`} name={item.name} onClick={(e) => onHandleChange(e.currentTarget)} value={item.value}>{item.label}</DropdownItem>
                })
                  }
                 


                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default DropDownComp