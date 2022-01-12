import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { connect } from 'react-redux';

const ApplicantDetails = forwardRef((props, ref) => {
    const { applicantDetail, data, getData, vendor, agents, outerDetails, id } = props;

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
        type: '',
        emailList: [],
        selected: '',
        claimed: '',
        claimedAt: '',
        assigned: ''
    })
    const [refresh, setRefresh] = useState(0)
    const [dropdownBankNameOpen, setBankNameOpen] = useState(false);
    const toggleBankName = () => setBankNameOpen(!dropdownBankNameOpen);
    const [dropdownProductNameOpen, setProductNameOpen] = useState(false);
    const toggleProductName = () => setProductNameOpen(!dropdownProductNameOpen);
    const [productList, setProductList] = useState([]);
    const [agentsDropdown, setAgentsDropdown] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('');
    const [changeAgent, setChangeAgent] = useState(false);
    // const url = document.location.pathname.split('/').length > 1
    let office = false
    let resident = false
    let multi = false

    if (document.location.pathname.split('/')[1] === 'new') {
        multi = true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit', formdata)
        applicantDetail(formdata)
    }

    useImperativeHandle(ref, () => ({

        getData() {
            return formdata
            // applicantDetail(formdata)
        }

    }));

    const onHandleChange = (e) => {
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
    }
    useEffect(() => {
        
        if (data) {
            let form = formdata
            for (const key in data) {
                form[key] = data[key]
                if (key === 'bankNBFCname') {
                    form['bankNBFCname'] = data.bankNBFCname?.clientName ? data.bankNBFCname?.clientName : data.bankNBFCname
                }
                if (key === 'product') {
                    form['product'] = data.bankNBFCname?.productList[0]?.productName
                    form.emailList = data.bankNBFCname?.productList[0]?.emailList
                }
                if (key === 'form') {
                    form['type'] = data['form']
                }
            }
            // console.log('form', form)
            setFormdata(form)
            if (localStorage.getItem(id)) {
                let local = JSON.parse(localStorage.getItem(id))
                let temp = {}
                for (const key in data) {
                    if (local[key]) {
                        temp[key] = data[key]
                        if (key === 'bankNBFCname') {
                            temp['bankNBFCname'] = data.bankNBFCname?.clientName ? data.bankNBFCname?.clientName : data.bankNBFCname
                        }
                        if (key === 'product') {
                            temp['product'] = data.bankNBFCname?.productList[0]?.productName
                            temp.emailList = data.bankNBFCname?.productList[0]?.emailList
                        }          
                    }
                }
                setFormdata(temp)
            }
            // applicantDetail(form)
            setRefresh(Math.random());
            setRefresh(Math.random());
            outerDetailsData()
        }
        console.log('data', data)
    }, [data])
    useEffect(() => {
        if (getData) {
            // applicantDetail(formdata)
            document.getElementById('applicationDetails').click()
        }
    }, [getData])
    const outerDetailsData = () =>{
        if (outerDetails) {
            let formd = formdata
            for(const outer in outerDetails) {
                const element = outerDetails[outer]
                if (outer == 'selected') {
                    setSelectedAgent(element)
                }
            }
            setFormdata(formd);
            setRefresh(Math.random())
        }
    }

    const getAgents = () => {
        let pincodeWiseAgents = []
        if (formdata.pincode) {
            for (const key in agents) {
                if (Object.hasOwnProperty.call(agents, key)) {
                    const element = agents[key];
                    let pincode = []
                    pincode.push(JSON.stringify(element.pincode))
                    if (element.secondary && element.secondary.length > 0) {
                        for (let index = 0; index < element.secondary.length; index++) {
                            const element1 = element.secondary[index];
                            pincode.push(element1.pincodes)
                        }
                    }
                    if (pincode.includes(formdata.pincode)) {
                        pincodeWiseAgents.push(element)
                    }

                }
            }
        }
        // console.log('agents', pincodeWiseAgents)
        return pincodeWiseAgents;
    }
  
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
            {(refresh || true) && <div>
                <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit}>
                    <div >
                        <label>App.Id/Lead id</label>
                        <Input type="text" name='appid' value={formdata['appid']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
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
                                        let form = formdata
                                        form.bankNBFCname = item.clientName
                                        setFormdata(form)
                                        setProductList(item?.productList)
                                        // setFormdata({...formdata, bankNBFCname: item.clientName})
                                    }}
                                        value={item.clientName}
                                        name={item.clientName}>
                                        {item.clientName}
                                    </DropdownItem>
                                })}

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div >
                        <label>Product</label>
                        <Dropdown toggle={toggleProductName} isOpen={dropdownProductNameOpen}>
                            <DropdownToggle caret>
                                {formdata['product'] ? formdata['product'] : 'None'}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {productList?.map(item => {
                                    return <DropdownItem key={item.productName} onClick={() => {
                                        let form = formdata
                                        form.product = item.productName
                                        form.emailList = item.emailList
                                        setFormdata(form)
                                    }}
                                        value={item.productName}
                                    >
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
                        <div className='pt-4'>
                            <Dropdown toggle={() => setAgentsDropdown(!agentsDropdown)} isOpen={agentsDropdown}>
                                <DropdownToggle caret className='bg-transparent text-danger border-0'>
                                    {selectedAgent ? selectedAgent : getAgents().length > 0 ? `Agents - ${getAgents().length}` : 'None'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {getAgents()?.map((item, index) => {
                                        return <DropdownItem key={item.name} onClick={() => { setSelectedAgent(item.name) }}>
                                            {item.name}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    <div >
                        <label>Type {formdata['type']}</label>
                        <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={type} value={formdata['type']} />
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
                    {id &&
                        <>
                            <div >
                                <label>Mismatch Address</label>
                                <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={mismatchAddressField} value={formdata['mismatchAddress']} />
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
                        <Button color='primary' id='applicationDetails' type="submit" >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>}
        </div>
    )
})
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(ApplicantDetails)