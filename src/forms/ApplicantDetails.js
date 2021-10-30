import React, { useState, useEffect } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import {useHistory} from 'react-router-dom'

export default function ApplicantDetails({ applicantDetails, getData, test }) {
    const [formdata, setFormdata] = useState({
        appid: '',
        srNo: '',
        month: '',
        initiationDate: '',
        customerName: '',
        bankNBFCname: '',
        product: '',
        loaction: '',
        pincode: '',
        contactNo: '',
        mobileNo: '',
        officeAddressProvided: '',
        residenceAddressProvided: '',
        mismatchAddress: '',
        visitedOfficeAddress: '',
        visitedresidentAddress: '',
        remarks: '',
        type: ''
    })
    const [refresh, setRefresh] = useState(0)
    const url = document.location.pathname.split('/').length > 1
    let id;
    let office = false
    let resident = false
    let multi = false

    if (document.location.pathname.split('/')[1] === 'new') {
        multi = true
    }
    if (url) {
        if (document.location.pathname.split('/')[1] === 'office') {
            office = true
            resident = false
        } else {
            office = false
            resident = true
        }
        id = document.location.pathname.split('/')[2]
    }

    let history = useHistory()

    const onHandleSubmit = ()=>{
        history.push('/')
    }

    const handleSubmit = (e) => {
        // const formData = new FormData(e.currentTarget);
        e.preventDefault()
        applicantDetails(formdata)
    }
    useEffect(() => {
        if (test) {
            console.log('test', test)
            onHandleChange({ name: test[0], value: test[1] })
        }
    }, [test])
    const onHandleChange = (e) => {
        // name
        console.log(e)
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
        console.log(form)
    }
    useEffect(() => {
        if (getData) {
            document.getElementById('applicationDetails').click()
        }
        // console.log('getdata',getData)
    }, [getData])
    let mismatchAddress = true

    let type = [
        { name: 'type', value: 'resident', label: 'Resident' },
        { name: 'type', value: 'office', label: 'Office' },
    ]

    return (
        <div>
            <h1>Applicant Details</h1>
            {(refresh > 0 || true) && <div>
                <form className='d-flex justify-content-between flex-wrap' id='myform' onSubmit={handleSubmit}>
                    <div >
                        <label>App.Id/Lead id</label>
                        <Input type="text" name='appid' value={formdata['appid']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {id &&
                        <div className='pt-4'>
                            <Button color='success'>Check</Button>
                        </div>
                    }

                    <div >
                        <label>Sr.No</label>
                        <Input type="text" name='srNo' value={formdata['srNo']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Month</label>
                        <Input type="text" name='month' value={formdata['month']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Initiation Date</label>
                        <Input type="text" name='initiationDate' value={formdata['initiationDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Customer Name</label>
                        <Input type="text" name='customerName' value={formdata['customerName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Bank/ NBFC name</label>
                        <Input type="text" name='bankNBFCname' value={formdata['bankNBFCname']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Product</label>
                        <Input type="text" name='product' value={formdata['product']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Location</label>
                        <Input type="text" name='loaction' value={formdata['loaction']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Pincode</label>
                        <Input type="text" name='pincode' value={formdata['pincode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {!id &&
                        <div className='pt-4'>
                            <Button>Get Agents</Button>
                        </div>
                    }
                    <div >
                        <label>Type</label>
                        <DropDownComp id='applicantDetail' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={type}  />
                        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret className='text-capitalize'>
                                    {formdata.type ? formdata.type : 'Type'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name='type' onClick={(e) => onHandleChange(e.currentTarget)} value='resident'>Resident</DropdownItem>
                                    <DropdownItem name='type' onClick={(e) => onHandleChange(e.currentTarget)} value='office'>Office</DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown> */}
                    </div>
                    <div >
                        <label>Contact No.</label>
                        <Input type="text" name='contactNo' value={formdata['contactNo']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Mobile No.</label>
                        <Input type="text" name='mobileNo' value={formdata['mobileNo']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Office Address Provided</label>
                        <Input type="text" name='officeAddressProvided' value={formdata['officeAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Resident Address Provided</label>
                        <Input type="text" name='residenceAddressProvided' value={formdata['residenceAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {id &&
                        <>
                            <div >
                                <label>Mismatch Address</label>
                                <Input type="text" name='mismatchAddress' value={formdata['mismatchAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            {mismatchAddress &&
                                <>
                                    {office && <div >
                                        <label>Visited Office Address</label>
                                        <Input type="text" name='visitedOfficeAddress' value={formdata['visitedOfficeAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                                    </div>}
                                    {resident && <div >
                                        <label>Visited Resident Address</label>
                                        <Input type="text" name='visitedresidentAddress' value={formdata['visitedresidentAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                                    </div>}
                                </>
                            }
                        </>
                    }

                    <div >
                        <label>Remarks If any</label>
                        <Input type="text" name='remarks' value={formdata['remarks']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='pt-4'>
                        <Button color='primary' id='applicationDetails' type="submit" onClick={()=>(onHandleSubmit())} >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
