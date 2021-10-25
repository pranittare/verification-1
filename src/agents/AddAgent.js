import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, set, update, remove } from "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { connect } from 'react-redux';

const AddAgent = ({ agent, allAgents, realTimeAgents, agents, realTimeforms }) => {

    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rtA, setRta] = useState([])
    const [rtF, setRtf] = useState([])
    const db = getDatabase();
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
    })

    const toggle = () => {
        setFormdata(initalState)
        setModal(!modal)
    };
    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        if (allAgents && allAgents.length > 0) {
            for (let index = 0; index < allAgents.length; index++) {
                const element = allAgents[index];
                console.log('element', element)
                if (form.agentCode === element['agentCode']) {
                    alert('Same Agent Code Do not Continue!')
                }
                if (form.name === element['name']) {
                    alert('Same Agent Name Do not Continue!')
                }

            }
        }
        setFormdata(form)
        setRefresh(Math.random())
        console.log(form)
    }
    const onSubmit = () => {
        let form = formdata
        let secondarypincodes = []
        let secondary = form['pincodes'].replace(/\s/g, "X").split(',')
        for (let index = 0; index < secondary.length; index++) {
            const element = secondary[index];
            secondarypincodes.push({ pincodes: element })
        }
        console.log(secondarypincodes, startDate, endDate)
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
                alert('Upload Successful')

            });

        } else {
            alert('Upload Cancelled')
        }
    }
    const downloadUrlfnc = () => {
        const storage = getStorage();
        const filePath = `agents/${formdata['agentCode']}`;
        getDownloadURL(ref(storage, filePath))
            .then((url) => {
                setDownloadUrl(url)
            })
            .catch((error) => {
                alert('Nothing found')
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
                    forms.clained = false
                    update(ref(db, `form/${forms.pincode}/${forms.key}`), {
                        selected: false,
                        clained: false
                    }).then(res => {
                        alert('Forms disabled')
                    }).catch(err => {
                        alert('Forms were not disabled check log')
                        console.log('Disable Agent 1', err)
                    })
                }
            }
            if (agent.userId === agents.userId) {
                update(ref(db, `agents/${agents.key}`), { uniqueId: 'Disabled', isLoggedIn: false, onCase: false, myForms: 0 }).then(res => {
                    alert('Agent Disabled')
                }).catch(err => {
                    alert('Agemt was not disabled check log')
                    console.log('Disable Agent 2', err)
                })
            }
        }

    }
    const handleEnable = () => {
        let agent = formdata
        let realAgents = rtA
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            if (agent.userId === agents.userId && agents.uniqueId !== 'Disabled') {
                update(ref(db, `agents/${agents.key}`), { uniqueId: null }).then(res => {
                    alert('Agent Enabled')
                }).catch(err => {
                    alert('Agent was not enabled check log')
                    console.log('Agent Enabled', err)
                })
            }
        }
    }
    const HandleDeleteAgent = () => {
        let agent = formdata
        let realAgents = rtA
        const filePath = `agents/${formdata['agentCode']}`;
        const storage = getStorage();
        for (let index = 0; index < realAgents.length; index++) {
            const agents = realAgents[index];
            if (agent.userId === agents.userId) {
                remove(ref(db, `agents/${agents.key}`)).then(res => {
                    alert('Agent Deleted 1')
                }).catch(err => {
                    alert('Agent was not deleted check log')
                    console.log('Agent Deleted 1', err)
                })
            }
        }
        for (let index = 0; index < agents.length; index++) {
            const element = agents[index];
            if (agent.agentCode === element.agentCode) {
              const kycDocument = ref(storage, filePath);
              deleteObject(kycDocument).then(res => {
                    alert('KYC Deleted')
                }).catch(err => {
                    alert('KYC was not Deleted check log')
                    console.log('Agent Deleted kyc', err);
                })
                deleteDoc(doc(db, `agents/${agent.agentCode}`)).then(res => {
                    alert('Agent Deleted 2')
                }).catch(err => {
                    alert('Agent was not deleted check log')
                    console.log('Agent Deleted 2', err)
                })
            }
        }
       
        
    }
    useEffect(() => {
        if (realTimeAgents) {
            let temp = []
            const objkeys = Object.keys(realTimeAgents)
            for (let index = 0; index < objkeys.length; index++) {
                const element = objkeys[index];
                let agent = realTimeAgents[element]
                agent.key = element
                temp.push(agent)
                // console.log('agent', agent)

            }
            setRta(temp)

            // console.log('props', realTimeAgents, realTimeforms)
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
                // if (formkey) {

                // }
                temp.push(forms)
            }
            // console.log('forms', temp)
            setRtf(temp)
        }
    }, [realTimeforms])

    useEffect(() => {
        if (agent && modal) {
            let form = formdata
            for (const property in form) {
                if (agent[property]) {
                    form[property] = agent[property]
                }
                if (property === 'kycUpdateDate') {
                    form[property] = agent[property].seconds
                }
                if (property === 'kycreneweddate') {
                    form[property] = agent[property].seconds
                }
            }
            if (agent.secondaryPincodes && agent.secondaryPincodes.length > 0) {
                for (let index = 0; index < agent.secondaryPincodes.length; index++) {
                    const element = agent.secondaryPincodes[index];
                    let pincodes = Object.values(element)
                    form.pincodes += `${pincodes},`
                }
            }
            setFormdata(form)
            // console.log('form', form)
            setRefresh(Math.random())
        }
    }, [agent, modal])
    useEffect(() => {
        setRefresh(Math.random())
    }, [])
    return (
        <div>
            <Button color={agent ? "link" : "danger"} onClick={toggle}>{agent ? agent.name : 'Add Agent'}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    {refresh > 0 && <div className='row'>
                        <div className='col-4'>
                            <button className='btn btn-primary' onClick={handleEnable}>Enable</button>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-warning' onClick={handleDisable}>Disable</button>
                        </div>

                        <div className='col-4'>
                            <button className='btn btn-danger' onClick={HandleDeleteAgent}>Delete</button>
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
                                {formdata['kycUpdateDate'] ? moment(formdata['kycUpdateDate'] * 1000).format('ll') : <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />}
                                {/* <Input type="text" name='kycUpdateDate' value={formdata['kycUpdateDate']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            <div >
                                <label>KYC Renewal date</label>
                                {agent && <> <button className='btn btn-link' onClick={() => handleKyc(2)}>Edit</button>
                                    <br /> </>}
                                {formdata['kycreneweddate'] ? moment(formdata['kycreneweddate'] * 1000).format('ll') : <DatePicker className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} />}
                                {/* <Input type="text" name='kycreneweddate' value={formdata['kycreneweddate']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                            </div>
                            <div >
                                <label>Upload Doc</label>
                                <Input type="file" className='form-control' onClick={(e) => uploadFile(e)} />
                                {downloadUrl && <a href={downloadUrl} target='_blank'>Click here to Download the Document</a>}
                            </div>
                            <div >
                                <label>Password</label>
                                <Input type="text" name='password' value={formdata['password']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                        </div>
                        <div className='col-12'>
                            <label>Secondary Pincode</label>
                            {formdata['pincodes'].split(',').map((item) => {
                                return <span className="badge bg-info text-dark ms-2" key={item}>{item}</span>

                            })
                            }
                            <textarea rows="2" cols="3" type="text" className='form-control mt-2' name='pincodes' value={formdata['pincodes']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                        <div className="col-12">
                            <label>Remarks</label>
                            <textarea rows="5" cols="3" type="text" className="form-control" name="remarks" onChange={(e) => onHandleChange(e.currentTarget)}>
                            </textarea>
                        </div>
                    </div>}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
                    <Button color="info" onClick={downloadUrlfnc}>Get Download Url</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        realTimeAgents: state.agents,
        agents: state.fagents,
        realTimeforms: state.forms,

    }
}
export default connect(mapStateToProps)(AddAgent)