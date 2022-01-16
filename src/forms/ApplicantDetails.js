import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { connect } from 'react-redux';
import { getDatabase, set, update, remove, ref } from "firebase/database";
import axios from 'axios';

const ApplicantDetails = forwardRef((props, ref) => {
    const { applicantDetail, data, getData, vendor, agents, outerDetails, id, branch } = props;
    const db = getDatabase();
    console.log('outer', outerDetails)
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
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const months1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const thisMonth = months[now.getMonth()];
    const thisMonth1 = months1[now.getMonth()];
    const srNumber = `${thisMonth1}-${now.getFullYear()}-${now.getTime()}`

    const [formdata, setFormdata] = useState({
        appid: '',
        srNo: srNumber,
        month: thisMonth,
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
        // selected: '',
        // claimed: '',
        // claimedAt: '',
        // assigned: ''
    })
    const [refresh, setRefresh] = useState(0)
    const [dropdownBankNameOpen, setBankNameOpen] = useState(false);
    const toggleBankName = () => setBankNameOpen(!dropdownBankNameOpen);
    const [dropdownProductNameOpen, setProductNameOpen] = useState(false);
    const toggleProductName = () => setProductNameOpen(!dropdownProductNameOpen);
    const [productList, setProductList] = useState([]);
    const [agentsDropdown, setAgentsDropdown] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('');
    const [selectedAgentId, setSelectedAgentId] = useState('');
    const [changeAgent, setChangeAgent] = useState(false);
    // const url = document.location.pathname.split('/').length > 1
    let office = false
    let resident = false
    let multi = false

    if (document.location.pathname.split('/')[1] === 'new') {
        multi = true
    }
    const handleSubmit = (e) => {
        let newDate = new Date().getTime()
        e.preventDefault()
        applicantDetail(formdata)
        let datatoSubmit = {
            [formdata.type]: { applicantDetails: formdata },
            completed: false,
            submitted: false,
            status: true,
            allocated: true,
            claimed: false,
            appid: formdata.appid,
            tat: new Date().toString(),
            emailList: formdata.emailList,
            branch: branch
        }
        if (outerDetails.selected || outerDetails?.agenDetails?.email) {
            datatoSubmit['selected'] = selectedAgentId ? selectedAgentId : outerDetails.selected ? outerDetails.selected : outerDetails.agenDetails.email
            datatoSubmit['claimed'] = true;
            datatoSubmit['claimedAt'] = new Date().toDateString();
            datatoSubmit['assigned'] = true;
        }
        const path = `form/${formdata.pincode}/${newDate}-${Math.round(Math.random() * 100)}`;
        update(ref(db, path), datatoSubmit).then(res => {
            handleToken(datatoSubmit.selected)
            alert('Forms Sent')
        }).catch(err => {
            alert('Something went Wrong check and try again')
            console.log('Form initiation', err)
        })
        console.log('submit', datatoSubmit, formdata)
        // return datatoSubmit
    }
    const handleUpdateForm = () => {
        let datatoSubmit = {
            [formdata.type]: { applicantDetails: formdata },
            completed: false,
            submitted: false,
            status: true,
            allocated: true,
            claimed: false,
            appid: formdata.appid,
            tat: new Date().toString(),
            emailList: formdata.emailList,
            branch: branch
        }
        if (outerDetails.selected || outerDetails?.agenDetails?.email) {
            datatoSubmit['selected'] = selectedAgentId ? selectedAgentId : outerDetails.selected ? outerDetails.selected : outerDetails.agenDetails.email
            datatoSubmit['claimed'] = true;
            datatoSubmit['claimedAt'] = new Date().toDateString();
            datatoSubmit['assigned'] = true;
        }
        const path = `form/${formdata.pincode}/${id}}`;
        update(ref(db, path), datatoSubmit).then(res => {
            alert('Forms Sent')
        }).catch(err => {
            alert('Something went Wrong check and try again')
            console.log('Form update', err)
        })
        console.log('update', datatoSubmit, formdata)
    }
    const notificationSend = (fcm) => {
        let body = {
            "notification": {
                "title": "Hey there",
                "body": "You have a new Form"
            },
            "to": `${fcm}`
        }
        let token = 'AAAAAWZbGdE:APA91bFdoZVr9OHKs6ApB8fZIZ0kkCQLiJVdj-geB6ya18M-E77BmnjUN5XKRBZNLAlpO9KADcHTweFgmzlK74C06XHRtafMPiE1_HJxRPIUfYdd9TjLVZMbNaP1KdWm062heFQDhM2j'
        axios.post('https://fcm.googleapis.com/fcm/send', body, { 'Authorization': `key=${token}` }).then(res => {
            console.log('notification', res)
        }, err => {
            console.log('notification err', err)
        })
    }
    const handleToken = (agent) => {
        if (formdata.pincode) {
            for (const key in agents) {
                if (Object.hasOwnProperty.call(agents, key)) {
                    const element = agents[key];
                    if (!agent) {
                        if (element.pincode == formdata.pincode) {
                            notificationSend(element.fcmToken)
                        }
                        if (element.secondary && element.secondary.length > 0) {
                            for (let index = 0; index < element.secondary.length; index++) {
                                const second = element.secondary[index];
                                if (second.pincodes == formdata.pincode) {
                                    notificationSend(element.fcmToken)
                                }
                            }
                        }

                    } else if(agent == element.userId) {
                        notificationSend(element.fcmToken)
                    }
                }
            }
        }
    }
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
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
                    form['bankNBFCname'] = data.bankNBFCname
                }
                if (key === 'product') {
                    form['product'] = data.product;
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
                            temp['bankNBFCname'] = data.bankNBFCname;
                        }
                        if (key === 'product') {
                            temp['product'] = data.product;
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
    const outerDetailsData = () => {
        if (outerDetails) {
            let formd = formdata
            for (const outer in outerDetails) {
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
                                {formdata['bankNBFCname'].clientName ? formdata['bankNBFCname'].clientName : 'None'}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {vendor.map(item => {
                                    return <DropdownItem key={item.clientName} onClick={() => {
                                        let form = formdata
                                        form.bankNBFCname = item
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
                                {formdata['product'].productName ? formdata['product'].productName : 'None'}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {productList?.map(item => {
                                    return <DropdownItem key={item.productName} onClick={() => {
                                        let form = formdata
                                        form.product = item
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
                                {selectedAgent ? selectedAgent : outerDetails?.agenDetails?.email ? outerDetails?.agenDetails?.email : getAgents().length > 0 ? `Agents - ${getAgents().length}` : 'None'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {getAgents()?.map((item, index) => {

                                    return <DropdownItem key={item.name} onClick={() => { setSelectedAgent(item.name); setSelectedAgentId(item.userId) }}>
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
                    {id ? <div className='pt-4'>
                        <Button color='warning' id='applicationDetails' type="button" onClick={handleUpdateForm} >
                            Update
                        </Button>
                    </div>
                        :
                        <div className='pt-4'>
                            <Button color='primary' id='applicationDetails' type="submit" >
                                Submit
                            </Button>
                        </div>}
                </form>
            </div>}
        </div>
    )
})
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors,
        agents: state.agents,
        branch: state.branch
    }
}
export default connect(mapStateToProps)(ApplicantDetails)