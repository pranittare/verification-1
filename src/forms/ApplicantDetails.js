import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import { useSelector } from 'react-redux';
import { getDatabase, update, ref as rtRef, set } from "firebase/database";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

const ApplicantDetails = forwardRef(({ applicantDetail, data, getData, outerDetails, id }, ref) => {
    const db = getDatabase();
    const history = useHistory();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const months1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const iniDate = new Date().toString()
    const thisMonth = months[now.getMonth()];
    const thisMonth1 = months1[now.getMonth()];
    // const srNumber = `${thisMonth1}-${now.getFullYear()}-${now.getTime()}`
    const initalData = {
        appid: '',
        srNo: '',
        month: thisMonth,
        initiationDate: iniDate,
        customerName: '',
        bankNBFCname: '',
        product: '',
        loaction: '',
        pincode: '',
        contactNo: '',
        mobileNo: '',
        officeAddressProvided: '',
        residenceAddressProvided: '',
        mismatchAddress: 'no',
        visitedOfficeAddress: '',
        visitedresidentAddress: '',
        remarks: '',
        type: '',
        form: '',
        emailList: [],
    }
    const [formdata, setFormdata] = useState(initalData)
    const [refresh, setRefresh] = useState(0)
    const [dropdownBankNameOpen, setBankNameOpen] = useState(false);
    const toggleBankName = () => setBankNameOpen(!dropdownBankNameOpen);
    const [dropdownProductNameOpen, setProductNameOpen] = useState(false);
    const toggleProductName = () => setProductNameOpen(!dropdownProductNameOpen);
    const [productList, setProductList] = useState([]);
    const [agentsDropdown, setAgentsDropdown] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('');
    const [selectedAgentId, setSelectedAgentId] = useState('');
    const vendor = useSelector(state => state.vendors);
    const agents = useSelector(state => state.agents);
    const branch = useSelector(state => state.branch);
    const casestoday = useSelector(state => state.casestoday);
    const [mismatchDropdown, setMismatchDropdown] = useState(false);
    const mismatchToggle = () => {
        setMismatchDropdown(!mismatchDropdown)
    }
    const [alertMessage, setAlertMessage] = useState('');
    const [oldTat, setoldTat] = useState('');
    const [loading, setLoading] = useState(false);

    const prevCasesCount = () => {
        let date = new Date().getDate()
        if (casestoday[date]) {
            return { [date]: casestoday[date] + 1 }
        }
    }
    const handleCasesToday = () => {
        const path = `casestoday`;
        update(rtRef(db, path), prevCasesCount()).then()
    }
    const formValidation = () => {
        const { mobileNo, loaction, pincode, appid, officeAddressProvided, residenceAddressProvided, customerName, type, product } = formdata
        let submission = {
            mobileNo: false,
            loaction: false,
            pincode: false,
            appid: false,
            customerName: false,
            type: false,
            addressProvided: false,
            product: false
        };
        if (mobileNo.length === 10) {
            submission.mobileNo = true
        }
        if (loaction) {
            submission.loaction = true
        }
        if (pincode) {
            submission.pincode = true
        }
        if (appid) {
            submission.appid = true
        }
        if (customerName) {
            submission.customerName = true
        }
        if (type === 'office') {
            submission.type = true
        }
        if (type === 'resident') {
            submission.type = true
        }
        if (officeAddressProvided) {
            submission.addressProvided = true

        }
        if (residenceAddressProvided) {
            submission.addressProvided = true

        }
        if (product) {
            submission.product = true

        }
        let stirngObj = JSON.stringify(submission)
        if (stirngObj.includes('false')) {
            return false
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('valid', formValidation())
        if (formValidation()) {
            setLoading(true)
            let newDate = new Date().getTime()
            let formdat = formdata
            formdat.form = formdat.type
            const srNumber = `${thisMonth1}-${now.getFullYear()}-${new Date().getTime()}`
            if (!formdat.srNo) {
                formdat.srNo = srNumber
            }
            // if (id) {
            //     applicantDetail(formdat)
            // }
            let datatoSubmit = {
                [formdat.type]: { applicantDetails: formdat },
                completed: false,
                submitted: false,
                status: true,
                allocated: true,
                claimed: false,
                appid: formdat.appid,
                tat: new Date().toString(),
                emailList: formdat.emailList,
                branch: branch
            }
            if (outerDetails && (outerDetails.selected || outerDetails?.agenDetails?.email) || selectedAgentId) {
                datatoSubmit['selected'] = selectedAgentId ? selectedAgentId : outerDetails.selected ? outerDetails.selected : outerDetails.agenDetails.email
                datatoSubmit['claimed'] = true;
                datatoSubmit['claimedAt'] = new Date().toDateString();
                datatoSubmit['assigned'] = true;
            }
            const path = `form/${formdat.pincode}/${newDate}-${Math.round(Math.random() * 100)}`;
            update(rtRef(db, path), datatoSubmit).then(() => {
                handleToken(datatoSubmit.selected)
                // handleCasesToday()
                setAlertMessage('Form Sent')
                history.push('/ActiveCases')
            }).catch(err => {
                setAlertMessage('Something went Wrong check and try again')
                console.log('Form initiation', err)
            })
            setLoading(false)
        } else {
            setAlertMessage('All fields in red are Required')
            setLoading(false)
        }
        // return datatoSubmit
    }
    const handleUpdateForm = () => {
        if (formValidation()) {
            setLoading(true)

            let formdat = { ...formdata }
            formdat.form = formdat.type
            let datatoSubmit = {
                [formdata.type]: { applicantDetails: formdat },
                completed: false,
                submitted: false,
                status: true,
                allocated: true,
                claimed: false,
                appid: formdata.appid,
                emailList: formdata.emailList,
                branch: branch,
                tat: outerDetails.tat,
            }
            if (outerDetails.selected || outerDetails?.agenDetails?.email || selectedAgent) {
                datatoSubmit['selected'] = selectedAgentId ? selectedAgentId : outerDetails.selected ? outerDetails.selected : outerDetails.agenDetails.email
                datatoSubmit['claimed'] = true;
                datatoSubmit['claimedAt'] = outerDetails.claimedAt;
                // datatoSubmit['claimedAt'] = new Date().toDateString();
                datatoSubmit['assigned'] = true;
            }
            const path = `form/${formdata.pincode}/${id}`;
            set(rtRef(db, path), datatoSubmit).then(res => {
                setAlertMessage('Forms Updated');
                history.push('/ActiveCases')
            }).catch(err => {
                setAlertMessage('Something went Wrong check and try again')
                console.log('Form update', err)
            })
            setLoading(false)
        } else {
            setAlertMessage('All fields in red are Required')
            setLoading(false)
        }
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
        axios.post('https://fcm.googleapis.com/fcm/send', body, { headers: { 'Authorization': `key=${token}` } }).then(res => {
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

                    } else if (agent == element.userId) {
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
    const onHandleChange = (e) => {
        let form = { ...formdata }
        form[e.name] = e.value
        if (form.mismatchAddress !== 'yes') {
            if (form.type === 'resident') {
                form.visitedresidentAddress = form.residenceAddressProvided
            } else {
                form.visitedOfficeAddress = form.officeAddressProvided
            }
        }
        setFormdata(form)
        setRefresh(Math.random())
    }
    useEffect(() => {
        if (formdata['mismatchAddress'] === 'yes') {
            let form = { ...formdata }
            form.visitedOfficeAddress = ''
            form.visitedresidentAddress = ''
            setFormdata(form)
            setRefresh(Math.random())
        }
    }, [formdata['mismatchAddress']])
    useEffect(() => {

        if (data) {
            let form = { ...formdata }
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
            console.log('bank', data)
            setFormdata(form)
            setRefresh(Math.random());
            outerDetailsData()
        }
    }, [data])
    const formdataFiltered = () => {
        const refData = { ...formdata }
        for (const key in refData) {
            if (initalData[key] === undefined)
                delete refData[key]
        }
        // console.log({ refData });
        return refData
    }
    useImperativeHandle(ref, () => ({
        getFormData() {
            return formdataFiltered()
        }

    }));
    const outerDetailsData = () => {
        if (outerDetails) {
            let formd = { ...formdata }
            for (const outer in outerDetails) {
                const element = outerDetails[outer]
                if (outer == 'selected') {
                    setSelectedAgent(element)
                }
            }
            // setFormdata(formd);
            // setRefresh(Math.random())
        }
    }
    const getAgents = () => {
        let pincodeWiseAgents = []
        if (formdata.pincode) {
            for (const key in agents) {
                if (Object.hasOwnProperty.call(agents, key)) {
                    const element = agents[key];
                    let pincode = []
                    // if (element.pincode == formdata.pincode) {
                    //     pincodeWiseAgents.push(element)
                    // } else if (element.secondary && element.secondary.length > 0) {
                    //     for (let index = 0; index < element.secondary.length; index++) {
                    //         const element1 = element.secondary[index];
                    //         if (element1.pincodes == formdata.pincode) {
                    //             pincodeWiseAgents.push(element)
                    //         }
                    //     }
                    // }
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
        return pincodeWiseAgents;
    }
    const getBank = () => {
        return <span> {formdata['bankNBFCname'].clientName ? formdata['bankNBFCname'].clientName : data?.bankNBFCname?.clientName ? data?.bankNBFCname?.clientName : data?.bankNBFCname ? data?.bankNBFCname.toString() : 'None'} </span>
    }
    const getProduct = () => {
        return <span>{formdata['product'].productName ? formdata['product'].productName : data?.bankNBFCname?.productName ? data?.bankNBFCname?.productName : data?.product ? data?.product.toString() : 'None'}</span>
    }
    // let mismatchAddressField = [
    //     { name: 'mismatchAddress', value: 'yes', label: 'Yes' },
    //     { name: 'mismatchAddress', value: 'no', label: 'No' }
    // ]
    // const alignItem = (onHandleChange) => {
    //     let data = [
    //         {label: 'App.Id/Lead id', form: 'appid'},
    //         {label: 'Sr.No', form: 'srNo'},
    //         {label: 'Month', form: 'month'},
    //         {label: 'Initiation Date', form: 'initiationDate'},
    //         {label: 'Customer Name', form: 'customerName'},
    //         {label: 'Location', form: 'loaction'},
    //         {label: 'Pincode', form: 'pincode'},
    //     ]
    //     return <div className='row'>
    //         {data?.map((item, index) => {
    //             return <div key={index} className='col-3'>
    //                 <label className='text-danger'>{item.label}</label>
    //                     <Input type="text" name='appid' value={formdata[item.form]} onChange={(e) => onHandleChange(e.currentTarget)} />
    //             </div>
    //         })}
    //     </div>
    // }

    let type = [
        { name: 'type', value: 'resident', label: 'Resident' },
        { name: 'type', value: 'office', label: 'Office' },
    ]
    if (loading) {
        return <div className="spinner-grow text-warning" role="status">
        </div>
    }
 
    return (
        <div className='text-start'>
            {alertMessage && <Alert message={alertMessage} setMessage={(data) => setAlertMessage(data)} />}
            <h1>Applicant Details</h1>
            <div>
                {/* {alignItem(onHandleChange)} */}
                <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit}>
                    <div >
                        <label className='text-danger'>App.Id/Lead id</label>
                        <Input type="text" name='appid' value={formdata['appid']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Sr.No</label>
                        <Input type="text" disabled name='srNo' value={formdata['srNo']} onChange={(e) => onHandleChange(e.currentTarget)} />
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
                        <label className='text-danger'>Customer Name</label>
                        <Input type="text" name='customerName' value={formdata['customerName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label>Bank/ NBFC name</label>
                        <Dropdown toggle={toggleBankName} isOpen={dropdownBankNameOpen}>
                            <DropdownToggle caret className='text-truncate'>
                                {getBank()}
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
                            <DropdownToggle caret className='text-truncate'>
                                {getProduct()}

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
                        <label className='text-danger'>Location</label>
                        <Input type="text" name='loaction' value={formdata['loaction']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div >
                        <label className='text-danger'>Pincode</label>
                        <Input className='formInputBoxSpacing' type="number" name='pincode' value={formdata['pincode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Agent Name</label>
                        <Dropdown toggle={() => setAgentsDropdown(!agentsDropdown)} isOpen={agentsDropdown}>
                            <DropdownToggle caret className='text-truncate'>
                                {selectedAgent ? selectedAgent : outerDetails?.agenDetails?.email ? outerDetails?.agenDetails?.email : getAgents().filter(a => a.uniqueId !== 'Disabled').length > 0 ? `Agents - ${getAgents().filter(a => a.uniqueId !== 'Disabled').length}` : 'None'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {getAgents()?.filter(a => a.uniqueId !== 'Disabled').map((item, index) => {
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
                        <label className={formdata['mobileNo'].length < 9 ? 'text-danger' : ''}>Mobile No. ({formdata['mobileNo'].length}/10)</label>
                        <Input type="number" name='mobileNo' value={formdata['mobileNo']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    {formdata['type'] === 'office' && <div >
                        <label className='text-danger'>Office Address Provided</label>
                        <Input type="text" name='officeAddressProvided' value={formdata['officeAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    {formdata['type'] === 'resident' && <div >
                        <label className='text-danger'>Resident Address Provided</label>
                        <Input type="text" name='residenceAddressProvided' value={formdata['residenceAddressProvided']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    <div style={{ display: 'flex' }}>
                        {id &&
                            <>
                                <div >
                                    <label>Mismatch Address</label>
                                    <Dropdown isOpen={mismatchDropdown} toggle={mismatchToggle}>
                                        <DropdownToggle>
                                            {formdata.mismatchAddress}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem name='mismatchAddress' value='no' onClick={(e) => onHandleChange(e.currentTarget)}>No</DropdownItem>
                                            <DropdownItem name='mismatchAddress' value='yes' onClick={(e) => onHandleChange(e.currentTarget)}>Yes</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/* <DropDownComp id='applicantDetails' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={mismatchAddressField} value={formdata['mismatchAddress']} /> */}
                                </div>
                                {formdata['mismatchAddress'] && formdata['mismatchAddress'] !== 'no' &&
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
                        <div style={{ marginLeft: 20 }}>
                            <label>Remarks If any</label>
                            <Input type="text" name='remarks' value={formdata['remarks']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                    </div>
                    {id ? <div className='pt-4'>
                        {!outerDetails.submitted && <Button color='warning' id='applicationDetails' type="button" onClick={handleUpdateForm} >
                            Update
                        </Button>}
                    </div>
                        :
                        <div className='pt-4'>
                            <Button color='primary' id='applicationDetails' type="submit" >
                                Submit
                            </Button>
                        </div>}
                </form>
            </div>
        </div>
    )
})


export default ApplicantDetails;