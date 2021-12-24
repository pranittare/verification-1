import React, { useState, useEffect } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { connect } from 'react-redux';

const ApplicantDetails = ({ applicantDetails, data, vendor, getData }) => {
    const initalData = {
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
    }
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
    const [dropdownBankNameOpen, setBankNameOpen] = useState(false);
    const toggleBankName = () => setBankNameOpen(!dropdownBankNameOpen);
    const [dropdownProductNameOpen, setProductNameOpen] = useState(false);
    const toggleProductName = () => setProductNameOpen(!dropdownProductNameOpen);
    const [productList, setProductList] = useState([]);
    // const url = document.location.pathname.split('/').length > 1
    let office = false
    let resident = false
    let multi = false

    if (document.location.pathname.split('/')[1] === 'new') {
        multi = true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        applicantDetails(formdata)
    }
    useEffect(() => {
        if (data) {
            let form = formdata
            console.log('data', data)
            for (const key in data) {
                form[key] = data[key]

                if (key === 'bankNBFCname') {
                    form['bankNBFCname'] = data.bankNBFCname.clientName
                }
                if (key === 'product') {
                    form['product'] = data.bankNBFCname.productList[0].productName
                    form.emailList = data.bankNBFCname.productList[0].emailList
                }
                if (key === 'form') {
                    form['type'] = data['form']
                }
            }
            setFormdata(form)
            setRefresh(Math.random())
        }

    }, [data])
    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    useEffect(() => {
        setRefresh(Math.random())
    }, [])
    useEffect(() => {
        if (getData) {
            document.getElementById('applicationDetails').click()
        }
        // console.log('getdata',getData)
    }, [getData])

    let mismatchAddressField = [
        { name: 'mismatchAddress', value: 'yes', label: 'Yes' },
        { name: 'mismatchAddress', value: 'no', label: 'No' }
    ]

    let type = [
        { name: 'type', value: 'resident', label: 'Resident' },
        { name: 'type', value: 'office', label: 'Office' },
    ]

    return (
        <div>
            <h1>Applicant Details</h1>
            {refresh && <div>
                <form className='d-flex justify-content-between flex-wrap' id='myform' onSubmit={handleSubmit}>
                    <div >
                        <label>App.Id/Lead id</label>
                        <Input type="text" name='appid' value={formdata['appid']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {(office || resident) &&
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
                        <Dropdown toggle={toggleBankName} isOpen={dropdownBankNameOpen}>
                            <DropdownToggle caret>
                                {formdata['bankNBFCname'] ? formdata['bankNBFCname'] : 'None'}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {vendor.map(item => {
                                    return <DropdownItem key={item.clientName} onClick={() => {
                                        setProductList(item?.productList)
                                        setFormdata({...formdata, bankNBFCname: item.clientName})
                                        }}>
                                        {item.clientName}
                                    </DropdownItem>
                                })}

                            </DropdownMenu>
                        </Dropdown>
                        {/* <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={vendor.map(item => {
                            item.name = 'bankNBFCname'
                            item.value = item.clientName
                            return item.label = item.clientName
                        })} value={formdata['bankNBFCname']} /> */}
                        {/* <Input type="text" name='bankNBFCname' value={formdata['bankNBFCname']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    </div>
                    <div >
                        <label>Product</label>

                        {/* <Input type="text" name='product' value={formdata['product']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                        {/* <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={vendor.map(item => {
                            item.name = 'product'
                            item.value = JSON.stringify(item)
                            return item.label = item.clientName
                        })} value={formdata['product']} /> */}
                        <Dropdown toggle={toggleProductName} isOpen={dropdownProductNameOpen}>
                            <DropdownToggle caret>
                                {formdata['product'] ? formdata['product'] : 'None'}
                                {/* None */}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {productList?.map(item => {
                                    return <DropdownItem key={item.productName} onClick={() => {
                                        setFormdata({...formdata, product: item.productName, emailList: item.emailList})
                                    }}>
                                        {item.productName}
                                    </DropdownItem>
                                })}

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div >
                        <label>Location</label>
                        <Input type="text" name='loaction' value={formdata['loaction']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Pincode</label>
                        <Input type="text" name='pincode' value={formdata['pincode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {!(formdata['type'] === 'office' || formdata['type'] === 'resident') &&
                        <div className='pt-4'>
                            <Button>Get Agents</Button>
                        </div>
                    }
                    <div >
                        <label>Type {formdata['type']}</label>

                        <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={type} value={formdata['type']} />
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
                    {formdata['type'] === 'office' && <div >
                        <label>Office Address Provided</label>
                        <Input type="text" name='officeAddressProvided' value={formdata['officeAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    {formdata['type'] === 'resident' && <div >
                        <label>Resident Address Provided</label>
                        <Input type="text" name='residenceAddressProvided' value={formdata['residenceAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    {(formdata['type'] === 'office' || formdata['type'] === 'resident') &&
                        <>
                            <div >
                                <label>Mismatch Address</label>
                                <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={mismatchAddressField} value={formdata['mismatchAddress']} />
                                {/* <Input type="text" name='mismatchAddress' value={formdata['mismatchAddress']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            {formdata['mismatchAddress'] &&
                                <>
                                    {formdata['type'] === 'office' && <div >
                                        <label>Visited Office Address</label>
                                        <Input type="text" name='visitedOfficeAddress' value={formdata['visitedOfficeAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                                    </div>}
                                    {formdata['type'] === 'resident' && <div >
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
                        <Button color='primary' id='applicationDetails' type="submit" 
                        // onClick={() => (onHandleSubmit())}
                         >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors
    }
}
export default connect(mapStateToProps)(ApplicantDetails)