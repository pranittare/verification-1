import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, set, update, remove, ref as rtRef } from "firebase/database";
import { doc, deleteDoc, addDoc, updateDoc, getFirestore, Timestamp, collection } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import DropDownComp from '../components/DropDownComp';
import Alert from '../components/Alert';
import { useHistory } from 'react-router-dom';
// import uuid from 'react-uuid'

const AddAgent = ({ agent, allAgents, add }) => {
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rtA, setRta] = useState([])
    const [rtF, setRtf] = useState([])
    const db = getDatabase();
    const fdb = getFirestore();
    let branches = [
        { name: 'branch', value: 'branch-1', label: 'Branch-1' },
        { name: 'branch', value: 'nashik', label: 'Nashik' },
        { name: 'branch', value: 'pune', label: 'Pune' },
    ]
    // console.log('agent', agent)
    const initalState = {
        agentCode: `Ac-${new Date().getTime()}`,
        name: '',
        address: '',
        location: '',
        pincode: '',
        pincodes: '',
        mobile1: '',
        mobile2: '',
        userId: '',
        kycUpdateDate: '',
        kycreneweddate: '',
        password: '',
        remarks: '',
        branch: ''
    }
    const [formdata, setFormdata] = useState({
        agentCode: `Ac-${new Date().getTime()}`,
        name: '',
        address: '',
        location: '',
        pincode: '',
        pincodes: '',
        mobile1: '',
        mobile2: '',
        userId: '',
        kycUpdateDate: '',
        kycreneweddate: '',
        password: '',
        remarks: '',
        branch: ''
    })
    const realTimeAgents = useSelector(state => state.agents);
    const agents = useSelector(state => state.fagents);
    const realTimeforms = useSelector(state => state.forms);
    const toggle = () => {
        setFormdata(initalState)
        setModal(!modal)
    };
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory()


    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        if (allAgents && allAgents.length > 0) {
            for (let index = 0; index < allAgents.length; index++) {
                const element = allAgents[index];
                // console.log('element', element)
                if (form.agentCode === element['agentCode']) {
                    setAlertMessage('Same Agent Code Do not Continue!')
                    alert('Same Agent Code Do not Continue!')
                }
                if (form.name === element['name']) {
                    setAlertMessage('Same Agent Name Do not Continue!')
                    alert('Same Agent Name Do not Continue!')
                }

            }
        }
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    const uploadFile = (e) => {
        const file = e.target.files[0];
        const filePath = `agents/${formdata['agentCode']}`;
        console.log('upload', file)
        if (window.confirm('Are you sure you want to Upload')) {
            const storage = getStorage();
            const storageRef = ref(storage, filePath);
            uploadBytes(storageRef, file).then((snapshot) => {
                // console.log('Uploaded a blob or file!');
                setAlertMessage('Upload Successful')
                alert('Upload Successful')

            });

        } else {
            setAlertMessage('Upload Cancelled')
            alert('Upload Cancelled')
        }
    }
    const downloadUrlfnc = (agentCode) => {
        const storage = getStorage();
        const filePath = `agents/${agentCode}`;
        getDownloadURL(ref(storage, filePath))
            .then((url) => {
                setDownloadUrl(url)
            })
            .catch((error) => {
                setAlertMessage('Kyc Document not found')
                alert('Kyc Document not found')
                // Handle any errors
            });
    }
    const handleKyc = (num) => {
        let form = formdata
        if (num === 1) {
            form.kycUpdateDate = ''
        } else {
            form.kycreneweddate = ''
        }
        setFormdata(form)
        setRefresh(Math.random())
    }
    const handleDisable = () => {
        let agent = formdata
        let realAgents = rtA
        // let realForms = rtF
        let temp = [];
        for (let index = 0; index < rtF.length; index++) {
            const element = rtF[index];
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const element1 = element[key];
                    temp.push(element1)
                }
            }
        }
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            for (let j = 0; j < temp.length; j++) {
                const element = temp[j];
                console.log('forms', element.selected, agent.userId)
                if (element.selected === agent.userId && element.key) {
                    // element.selected = false
                    // element.claimed = false
                    update(rtRef(db, `form/${element.pincode}/${element.key}`), {
                        selected: false,
                        claimed: false,
                    }).then(res => {
                        console.log('Forms disabled Please Reload the page')
                        // window.location.reload()
                    }).catch(err => {
                        alert('Forms were not disabled check log')
                        console.log('Disable Agent 1', err)
                    })
                }
            }
            if (agent.userId === agents.userId) {
                disableRealTimeAgentSingle(agents.key)
            }
        }
    }
    const disableRealTimeAgentSingle = (key) => {
        console.log('key', key)
        update(rtRef(db, `agents/${key}`), { uniqueId: 'Disabled', isLoggedIn: false, onCase: false, myForms: 0 }).then(res => {
            setAlertMessage('Agent Disabled')
            alert('Agent Disabled')

        }).catch(err => {
            setAlertMessage('Agent was not disabled check log')
            alert('Agent was not disabled check log')

            console.log('Disable Agent 2', err)
        })
    }
    const handleEnable = () => {
        let agent = formdata
        let realAgents = rtA
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            if (agent.userId === agents.userId) {
                console.log('agent', agent, agents)
                update(rtRef(db, `agents/${agents.key}`), { uniqueId: null }).then(res => {
                    alert('Agent Enabled')
                    window.location.reload()
                }).catch(err => {
                    // alert('Agent was not enabled check log')
                    console.log('Agent Enabled', err)
                })
            }
        }
    }
    const removeRealTimeAgent = (key) => {
        remove(rtRef(db, `agents/${key}`)).then(res => {
            setAlertMessage('Agent Deleted 1')
            alert('Agent Deleted 1')
        }).catch(err => {
            setAlertMessage('Agent was not deleted check log')
            alert('Agent was not deleted check log')
            console.log('Agent Deleted 1', err)
        })
    }
    const deleteKyc = () => {
        const filePath = `agents/${formdata['agentCode']}`;
        const storage = getStorage();
        const kycDocument = ref(storage, filePath);
        deleteObject(kycDocument).then(res => {
            setAlertMessage('KYC Deleted')
            alert('KYC Deleted')
        }).catch(err => {
            setAlertMessage('KYC was not Deleted check log')
            alert('KYC was not Deleted check log')
            console.log('Agent Deleted kyc', err);
        })
    }
    const deleteDocuments = (agentCode) => {
        deleteDoc(doc(fdb, `agents/${agentCode}`)).then(res => {
            setAlertMessage('Agent Deleted 2')
            alert('Agent Deleted 2')
        }).catch(err => {
            setAlertMessage('Agent was not deleted check log')
            alert('Agent was not deleted check log')
            console.log('Agent Deleted 2', err)
        })
    }
    const HandleDeleteAgent = () => {
        let agent = formdata
        let realAgents = rtA

        let agentkey;
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            if (agent.userId === agents.userId) {
                agentkey = agents.key
            }
        }
        removeRealTimeAgent(agentkey)
        let agentcode;
        for (let index = 0; index < agents.length; index++) {
            const element = agents[index];
            if (agent.agentCode === element.agentCode) {
                agentcode = element.key;
            }
        }
        deleteKyc();
        deleteDocuments(agentcode);

    }
    const commonAddUpdate = (db) => {
        let { name, password, userId, pincodes, branch, pincode,
            address, location, mobile1, mobile2, kycUpdateDate, kycreneweddate, remarks
        } = formdata
        console.log('formdata', kycUpdateDate, kycreneweddate);
        let secondary = pincodes?.split(',')
        let secondaryPincodes = []
        for (let index = 0; index < secondary?.length; index++) {
            const element = secondary[index];
            if (element) {
                secondaryPincodes.push({ pincodes: element })
            }
        }
        if (db == 'rt') {
            let data = {
                userId: userId,
                password: password,
                pincode: pincode,
                name: name,
                created: new Date().toDateString(),
                lastUpdated: '',
                branch: branch,
                secondary: secondaryPincodes
            }
            return data
        } else if (db == 'fs') {
            let data = {
                userId: userId,
                password: password,
                pincode: pincode,
                name: name,
                // created: new Date().toDateString(),
                lastUpdated: '',
                branch: branch,
                secondaryPincodes: secondaryPincodes,
                address: address,
                location: location,
                mobile1: mobile1,
                mobile2: mobile2,
                kycUpdateDate: kycUpdateDate?.seconds ? Timestamp.fromDate(new Date(kycUpdateDate.seconds * 1000)) : Timestamp.fromDate(new Date(kycUpdateDate)),
                kycreneweddate: kycreneweddate?.seconds ? Timestamp.fromDate(new Date(kycreneweddate.seconds * 1000)) : Timestamp.fromDate(new Date(kycreneweddate)),
                remarks: remarks,
            }
            return data
        }
    }
    const handleAddUser = () => {
        console.log('add', commonAddUpdate('fs'))
        // Add logic only for Firestore DB

        addDoc(collection(fdb, `agents`), commonAddUpdate('fs'))
            .then(res => {
                setAlertMessage('Total user update Successfull')
                alert("Register user here")
                history.push('/signup')
            })
            .catch(err => {
                setAlertMessage('Total user update Error')
                console.log('Total user', err)
            })
    }
    const realTimeAgentKey = () => {
        let agentkeyRt = ''
        let agent1 = formdata
        let realAgents = rtA;
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            // console.log('agents', agents)
            if (agent1.userId?.toString().toLowerCase() == agents.userId?.toString().toLowerCase()) {
                agentkeyRt = agents.key
            }
        }
        // if (realTimeAgentKey() || realTimeAgentKey() === 'undefined') {
        //     fixAgent()       
        // }
        return agentkeyRt
    }
    const fixAgent = () => {
        // copy data from Firestore DB 
        if (realTimeAgentKey()) {
            update(rtRef(db, `agents/${realTimeAgentKey()}`), commonAddUpdate('rt')).then(res => {
                alert("Agent fixed but manual cleanup required from backend")
            })
        }

    }
    const handleUpdateUser = () => {
        //    realTimeAgentKey()
        console.log('update', commonAddUpdate('fs'), realTimeAgentKey())
        // Add update logic only for Firestore DB
        const totalRef = doc(fdb, `agents`, `${agent.key}/`)
        updateDoc(totalRef, commonAddUpdate('fs'))
            .then(res => {
                // Add update logic only for Realtime DB
                update(rtRef(db, `agents/${realTimeAgentKey()}`), commonAddUpdate('rt'))
                    .then(res => {
                        setAlertMessage('Update Successfull')
                        alert('Update Successfull')
                        window.location.reload()
                    })
                    .catch(err => {
                        setAlertMessage('Error Occured retry')
                        alert('Error Occured retry')
                        console.log('total users real time update error', err)
                    })
            })
            .catch(err => {
                if (err) {
                    setAlertMessage('Total user update Error')
                    alert('Total user update Error')
                    console.log('Total user', err)

                }
            })
    }
    useEffect(() => {
        if (realTimeAgents) {
            let temp = []
            const objkeys = Object.keys(realTimeAgents)
            for (let index = 0; index < objkeys.length; index++) {
                const element = objkeys[index];
                let agent = realTimeAgents[element]
                // console.log('agent', agent)
                if (agent.branch) {
                    agent.key = element
                }
                temp.push(agent)
            }
            setRta(temp)
        }
    }, [realTimeAgents])
    useEffect(() => {
        if (realTimeforms) {
            let temp = []
            const objkeys1 = Object.keys(realTimeforms)
            // console.log('obj', objkeys1);
            for (let index = 0; index < objkeys1.length; index++) {
                const element1 = objkeys1[index];
                let forms = realTimeforms[element1]
                // forms.pincode = element1
                let formkey = Object.keys(forms)
                for (let index = 0; index < formkey.length; index++) {
                    const element = formkey[index];
                    // console.log(forms[element]);
                    forms[element].key = element
                    forms[element].pincode = element1
                }
                temp.push(forms)
            }
            // console.log('forms', temp)
            setRtf(temp)
        }
    }, [realTimeforms])

    useEffect(() => {
        // console.log('add', add, allAgents)
        if (agent && modal) {
            let form = formdata
            // console.log('agent', agent);
            for (const property in form) {

                if (agent[property]) {
                    form[property] = agent[property]
                }
                // if (property === 'kycUpdateDate') {
                //     form[property] = agent[property].seconds
                // }
                // if (property === 'kycreneweddate') {
                //     form[property] = agent[property].seconds
                // }
            }
            if (agent.secondaryPincodes && agent.secondaryPincodes.length > 0) {
                for (let index = 0; index < agent.secondaryPincodes.length; index++) {
                    const element = agent.secondaryPincodes[index];
                    let pincodes = Object.values(element)
                    if (pincodes) {
                        form.pincodes += `${pincodes},`
                    }
                }
            }
            setFormdata(form)
            downloadUrlfnc(form.agentCode)
            // console.log('form', form)
            setRefresh(Math.random())
        }
    }, [agent, modal])
    useEffect(() => {
        setDownloadUrl(false)
        setRefresh(Math.random())
    }, [])
    const timeFormatter = (item) => {
        if(item && !item.seconds) {
            return item
        }
        return item.seconds * 1000
    }
    return (
        <div>
            {alertMessage && <Alert message={alertMessage} setMessage={(data) => setAlertMessage(data)} />}
            <Button color={agent ? "link" : "danger"} onClick={toggle}>{agent ? agent.name : 'Add Agent'}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{agent ? 'Update Agent' : 'Add Agent'}</ModalHeader>
                <ModalBody>
                    {/* {console.log('form', formdata)} */}
                    {refresh > 0 && <div className='row'>
                        <div className='col-4'>
                            <button className='btn btn-primary' type='button' onClick={handleEnable}>Enable</button>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-warning' type='button' onClick={handleDisable}>Disable</button>
                        </div>

                        <div className='col-4'>
                            <button className='btn btn-danger' type='button' onClick={HandleDeleteAgent}>Delete</button>
                        </div>

                        <div className='col-6'>
                            <div >
                                <label>Agent Code</label>
                                <Input type="text" name='agentCode' value={formdata['agentCode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Full Name</label>
                                <Input type="text" name='name' value={formdata['name']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Address</label>
                                <Input type="text" name='address' value={formdata['address']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Location</label>
                                <Input type="text" name='location' value={formdata['location']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Pincode</label>
                                <Input type="text" name='pincode' value={formdata['pincode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>User Id</label>
                                <Input type="text" name='userId' value={formdata['userId']} onChange={(e) => onHandleChange(e.currentTarget)} />
                                <label>*Changing userId requires manual changes the realtime db</label>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div >
                                <label>Mobile No.1</label>
                                <Input type="text" name='mobile1' value={formdata['mobile1']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Mobile No.2</label>
                                <Input type="text" name='mobile2' value={formdata['mobile2']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label className='text-danger'>KYC Updated Date</label>
                                {agent && <>  <button className='btn btn-link' onClick={() => handleKyc(1)}>Edit</button>
                                    <br /> </>}
                                    <DatePicker className='form-control' selected={formdata['kycUpdateDate'] ? timeFormatter(formdata['kycUpdateDate']) : startDate} onChange={(date) => {
                                    console.log('date',date)
                                    setFormdata(state => { return { ...formdata, kycUpdateDate: date} })
                                    setStartDate(date)
                                    // console.log('date', date)
                                }} />
                                {/* {console.log(new Date(formdata['kycUpdateDate']))}
                                {formdata['kycUpdateDate'] ? new Date(formdata['kycUpdateDate'].seconds * 1000).toDateString() : <DatePicker className='form-control' selected={formdata['kycUpdateDate'] ? formdata['kycUpdateDate'] : startDate} onChange={(date) => {
                                    console.log('date',date)
                                    setFormdata(state => { return { ...formdata, kycUpdateDate: date } })
                                    setStartDate(date)
                                    // console.log('date', date)
                                }} />} */}
                                {/* <Input type="text" name='kycUpdateDate' value={formdata['kycUpdateDate']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            <div >
                                <label className='text-danger'>KYC Renewal date</label>
                                {agent && <> <button className='btn btn-link' onClick={() => handleKyc(2)}>Edit</button>
                                    <br /> </>}
                                    <DatePicker className='form-control' selected={formdata['kycreneweddate'] ? timeFormatter(formdata['kycreneweddate']) : endDate} onChange={(date) => {
                                    console.log('date',date, Timestamp.fromDate(new Date(date)))
                                    setFormdata(state => { return { ...formdata, kycreneweddate: date} })
                                    setEndDate(date)
                                    // console.log('date', date)
                                }} />
                                {/* {formdata['kycreneweddate'] ? new Date(formdata['kycreneweddate'].seconds * 1000).toDateString() : <DatePicker className='form-control' selected={endDate} onChange={(date) => {
                                    setFormdata(state => { return { ...formdata, kycreneweddate: date } })
                                    setEndDate(date)
                                }} />} */}
                                {/* <Input type="text" name='kycreneweddate' value={formdata['kycreneweddate']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            <div >
                                <label>Upload Doc</label>
                                <Input type="file" className='form-control' onClick={(e) => uploadFile(e)} />
                                {downloadUrl && <a href={downloadUrl} target='_blank' rel="noreferrer">Click here to Download the Document</a>}
                            </div>
                            <div >
                                <label>Password</label>
                                <Input type="text" name='password' value={formdata['password']} onChange={(e) => onHandleChange(e.currentTarget)} />
                                <label>
                                    {realTimeAgentKey()}
                                </label>
                            </div>
                        </div>
                        <div className='col-12'>
                            <label>Secondary Pincode</label>
                            {formdata['pincodes'].split(',').map((item, index) => {
                                return <span className="badge bg-info text-dark ms-2" key={`${item}-${index}`}>{item}</span>

                            })
                            }
                            <textarea rows="2" cols="3" type="text" className='form-control mt-2' name='pincodes' value={formdata['pincodes']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                        <div className="col-8">
                            <label>Remarks</label>
                            <textarea rows="5" cols="3" type="text" className="form-control" name="remarks" onChange={(e) => onHandleChange(e.currentTarget)}>
                            </textarea>
                        </div>
                        <div className='col-4'>
                            <div className='mt-4'>
                                <Label >Branch</Label>
                                <DropDownComp id='addAgent' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={branches} />
                            </div>
                        </div>
                    </div>}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={fixAgent}>Fix Agent</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    {add === 'update' ? <Button color="warning" onClick={handleUpdateUser}>Update User</Button> : <Button color="warning" onClick={handleAddUser}>Add User</Button>}
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default AddAgent;