import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, set, update, remove, ref as rtRef } from "firebase/database";
import { doc, deleteDoc, addDoc, updateDoc, getFirestore, Timestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import DropDownComp from '../components/DropDownComp';
import Alert from '../components/Alert';

const AddAgent = ({ agent, allAgents }) => {

    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rtA, setRta] = useState([])
    const [rtF, setRtf] = useState([])
    const [updateField, setUpdateField] = useState(true)
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

    const addOrUpdate = (form) => {
        // let form = formdata
        if (form.name) {
            rtA.map(item => {
                if (form.name == item.name) {
                    setUpdateField(true)
                } else {
                    setUpdateField(false)
                }
            })
            setUpdateField(true)

        } else {
            setUpdateField(false)

        }
    }
    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        addOrUpdate(form)
        if (allAgents && allAgents.length > 0) {
            for (let index = 0; index < allAgents.length; index++) {
                const element = allAgents[index];
                // console.log('element', element)
                if (form.agentCode === element['agentCode']) {
                    setAlertMessage('Same Agent Code Do not Continue!')
                }
                if (form.name === element['name']) {
                    setAlertMessage('Same Agent Name Do not Continue!')
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

            });

        } else {
            setAlertMessage('Upload Cancelled')
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
        let realForms = rtF
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];

            for (let index = 0; index < realForms.length; index++) {
                const forms = realForms[index];
                if (agent.userId === forms.selected) {
                    forms.selected = false
                    forms.claimed = false
                    update(rtRef(db, `form/${forms.pincode}/${forms.key}`), {
                        selected: false,
                        claimed: false,
                    }).then(res => {
                        setAlertMessage('Forms disabled')
                        window.location.reload()
                    }).catch(err => {
                        setAlertMessage('Forms were not disabled check log')
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
        update(rtRef(db, `agents/${key}`), { uniqueId: 'Disabled', isLoggedIn: false, onCase: false, myForms: 0 }).then(res => {
            setAlertMessage('Agent Disabled')
        }).catch(err => {
            setAlertMessage('Agent was not disabled check log')
            console.log('Disable Agent 2', err)
        })
    }
    const handleEnable = () => {
        let agent = formdata
        let realAgents = rtA
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            if (agent.userId === agents.userId) {
                update(rtRef(db, `agents/${agents.key}`), { uniqueId: null }).then(res => {
                    setAlertMessage('Agent Enabled')
                    window.location.reload()
                }).catch(err => {
                    setAlertMessage('Agent was not enabled check log')
                    console.log('Agent Enabled', err)
                })
            }
        }
    }
    const removeRealTimeAgent = (key) => {
        remove(rtRef(db, `agents/${key}`)).then(res => {
            setAlertMessage('Agent Deleted 1')
        }).catch(err => {
            setAlertMessage('Agent was not deleted check log')
            console.log('Agent Deleted 1', err)
        })
    }
    const deleteKyc = () => {
        const filePath = `agents/${formdata['agentCode']}`;
        const storage = getStorage();
        const kycDocument = ref(storage, filePath);
        deleteObject(kycDocument).then(res => {
            setAlertMessage('KYC Deleted')
        }).catch(err => {
            setAlertMessage('KYC was not Deleted check log')
            console.log('Agent Deleted kyc', err);
        })
    }
    const deleteDocuments = (agentCode) => {
        deleteDoc(doc(fdb, `agents/${agentCode}`)).then(res => {
            setAlertMessage('Agent Deleted 2')
        }).catch(err => {
            setAlertMessage('Agent was not deleted check log')
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
                kycUpdateDate: new Date(kycUpdateDate.seconds * 1000),
                kycreneweddate: new Date(kycreneweddate.seconds * 1000),
                remarks: remarks,
            }
            return data
        }
    }
    const handleAddUser = () => {
        console.log('add', commonAddUpdate('fs'))
        // Add logic only for Firestore DB

        addDoc(doc(fdb, `agents`), commonAddUpdate())
            .then(res => {
                setAlertMessage('Total user update Successfull')
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
            if (agent1.userId?.toString().toLowerCase() == agents.userId?.toString().toLowerCase()) {
                agentkeyRt = agents.key
            }
        }
        return agentkeyRt

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
                        window.location.reload()
                    })
                    .catch(err => {
                        setAlertMessage('Error Occured retry')
                        console.log('total users real time update error', err)
                    })
            })
            .catch(err => {
                if (err) {
                    setAlertMessage('Total user update Error')
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
            addOrUpdate(form)
            downloadUrlfnc(form.agentCode)
            // console.log('form', form)
            setRefresh(Math.random())
        }
    }, [agent, modal])
    useEffect(() => {
        setDownloadUrl(false)
        setRefresh(Math.random())
    }, [])
    return (
        <div>
           {alertMessage && <Alert message={alertMessage} setMessage={(data)=>setAlertMessage(data)}/>}
            <Button color={agent ? "link" : "danger"} onClick={toggle}>{agent ? agent.name : 'Add Agent'}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
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
                                <label>KYC Updated Date</label>
                                {agent && <>  <button className='btn btn-link' onClick={() => handleKyc(1)}>Edit</button>
                                    <br /> </>}
                                {/* {console.log(new Date(formdata['kycUpdateDate']*1000))} */}
                                {formdata['kycUpdateDate'] ? new Date(formdata['kycUpdateDate'].seconds * 1000).toDateString() : <DatePicker className='form-control' selected={startDate} onChange={(date) => {
                                    setFormdata(state => { return { ...formdata, kycUpdateDate: date } })
                                    setStartDate(date)
                                    // console.log('date', date)
                                }} />}
                                {/* <Input type="text" name='kycUpdateDate' value={formdata['kycUpdateDate']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            <div >
                                <label>KYC Renewal date</label>
                                {agent && <> <button className='btn btn-link' onClick={() => handleKyc(2)}>Edit</button>
                                    <br /> </>}
                                {formdata['kycreneweddate'] ? new Date(formdata['kycreneweddate'].seconds * 1000).toDateString() : <DatePicker className='form-control' selected={endDate} onChange={(date) => {
                                    setFormdata(state => { return { ...formdata, kycreneweddate: date } })
                                    setEndDate(date)
                                }} />}
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
                                <label>{realTimeAgentKey()}</label>
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
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    {updateField ? formdata['name'] ? <Button color="warning" onClick={handleUpdateUser}>Update User</Button> : agent?.name && <Button color="warning" onClick={handleAddUser}>Add User</Button> : <Button color="warning" onClick={handleAddUser}>Add User</Button>}
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default AddAgent;