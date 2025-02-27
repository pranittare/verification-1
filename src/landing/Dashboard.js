import React, { useState, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Toast,
    ToastBody,
    Modal,
    ModalBody
} from 'reactstrap';
import { databaseUpdateQueryCasesToday } from '../utils/query'

const Dashboard = ({ forms, agents }) => {
    // console.log('forms', forms)
    const [casesTodayToast, setCasesTodayToast] = useState(false);
    const [casesTodayModal, setCasesToadyModal] = useState(false);
    const [casesTotalToast, setCasesTotalToast] = useState(false);
    const [casesTotalModal, setCasesTotalModal] = useState(false);
    const [submittedCasesToast, setSubmittedCasesToast] = useState(false);
    const [submittedCasesModal, setSubmittedCasesModal] = useState(false);
    const [unclaimedCasesToast, setUnclaimedCasesToast] = useState(false);
    const [unclaimedCasesModal, setUnclaimedCasesModal] = useState(false);
    const [oldcasesModal, setOldcasesModal] = useState(false);
    const [bankwise, setBankWise] = useState({bank: [], pincode: []})
    // const [activeAgentsToast, setActiveAgentsToast] = useState(false)
    // const [activeAgentsModal, setActiveAgentsModal] = useState(false)
    const [tatModal, setTatModal] = useState(false)
    const [oldcases, setOldCases] = useState([]);

    const bankwise1 = () => {
        let bankAndForms = { bank: [], pincode: [] }
        // console.log('form', forms)
        for (const key in forms) {
            if (Object.hasOwnProperty.call(forms, key)) {
                const element = forms[key];
                // console.log('ele1', element)
                    bankAndForms.pincode.push(element)
                    for (const pincode in element) {
                        if (Object.hasOwnProperty.call(element, pincode)) {
                            const formId = element[pincode];
                            if (formId.allocated) {
                                if (formId?.office?.applicantDetails) {
                                    bankAndForms.bank.push({ name: formId?.office?.applicantDetails?.bankNBFCname.clientName, data: formId, id: Object.keys(element)[0] })
                                } else if (formId?.resident?.applicantDetails) {
                                    bankAndForms.bank.push({ name: formId.resident?.applicantDetails?.bankNBFCname?.clientName, data: formId, id: Object.keys(element)[0] })
                                }
                            }
                        }
                    }
                }
        }
        setBankWise(bankAndForms)
        // return bankAndForms
    }
    function uniqueArray2(arr, name) {
        var a = [];
        for (var i = 0, l = arr.length; i < l; i++)
            if (a.indexOf(arr[i][name]) === -1 && arr[i][name] !== '') {
                a.push(arr[i][name]);
            }
        return a;
    }
    function uniqueObject(obj) {
        let a = [];
        for (const key in obj) {
            if (a.indexOf(key) === -1 && key !== '') {
                a.push(key);
            }
        }
        return a;
    }
    function uniqueObject2(obj, name) {
        let a = [];
        for (const key in obj) {
            if (a.indexOf(obj[key][name]) == -1 && obj[key][name] !== '') {
                a.push(Number(obj[key][name]));
            }
        }
        return a;
    }
    const oldCasesDB = () => {
        let data = databaseUpdateQueryCasesToday();
        let currentDate = new Date().getDate()
        data.then(res => {
            let data = [];
            if(res)
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                // console.log('date',new Date(element.applicantDetails.initiationDate).getDate(), currentDate)
                if (new Date(element.applicantDetails.initiationDate).getDate() === currentDate) {
                    data.push(element)
                }
            }
            setOldCases(data)
        })
    }
    const casesToday = useMemo(() => {
        let casesT = []
        let currentDate = new Date().getDate()
        let bankname = uniqueArray2(bankwise.bank, 'name')
        for (let index = 0; index < bankname.length; index++) {
            const element = bankname[index];
            casesT.push({ name: element, data: [] })
        }
        for (let i = 0; i < casesT.length; i++) {
            const bank = casesT[i];
            for (let index = 0; index < bankwise.bank.length; index++) {
                const element = bankwise.bank[index];
                const casedate = new Date(element.data.tat)
                if (bank.name === element.name && casedate.getDate() == currentDate) {
                    bank.data.push(element)
                }
            }
            if (oldcases && oldcases.length > 0) {
                for (let index = 0; index < oldcases.length; index++) {
                    const element = oldcases[index];
                    const casedate = new Date(element.tat)
                    // console.log('oldcases',casedate.getDate() == currentDate, casedate.getDate(), currentDate )
                    if (bank.name === element.applicantDetails.bankNBFCname) {
                        bank.data.push(element)
                    }
                }
            }
        }
        return casesT
    }, [bankwise, oldcases])
    const casesTotal = useMemo(() => {
        let casesT = []
        let bankname = uniqueArray2(bankwise.bank, 'name')
        for (let index = 0; index < bankname.length; index++) {
            const element = bankname[index];
            casesT.push({ name: element, data: [] })
        }
        // console.log('bankname', bankname)
        for (let i = 0; i < casesT.length; i++) {
            const bank = casesT[i];
            for (let index = 0; index < bankwise.bank.length; index++) {
                const element = bankwise.bank[index];
                if (bank.name === element.name) {
                    bank.data.push(element)
                }
            }

        }
        return casesT
    }, [bankwise])
    const submittedCases = useMemo(() => {
        let casesT = []
        let bankname = uniqueArray2(bankwise.bank, 'name')
        for (let index = 0; index < bankname.length; index++) {
            const element = bankname[index];
            casesT.push({ name: element, data: [] })
        }
        // console.log('bankname', bankname)
        for (let i = 0; i < casesT.length; i++) {
            const bank = casesT[i];
            for (let index = 0; index < bankwise.bank.length; index++) {
                const element = bankwise.bank[index];
                if (bank.name === element.name && element.data.submitted) {
                    bank.data.push(element)
                }
            }

        }
        return casesT
    },[bankwise])
    const unClaimedCases = useMemo(() => {
        let unClaimed = []
        let singleUnclaimed = []
        let uniqpincodes = uniqueObject(forms)
        for (let index = 0; index < uniqpincodes.length; index++) {
            const element = uniqpincodes[index];
            unClaimed.push({ pincodes: element, data: [], total: 0 })
        }
        for (let index = 0; index < bankwise.pincode.length; index++) {
            const element = bankwise.pincode[index];
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const single = element[key];
                    if (!single.claimed && !single.submitted && single.appid) {
                        single.id = Object.keys(element)[0]
                        if (single.office?.applicantDetails) {
                            single.pincode = single.office.applicantDetails.pincode

                        } else if (single.resident?.applicantDetails) {
                            single.pincode = single.resident.applicantDetails.pincode

                        }
                        singleUnclaimed.push(single)
                    }
                }
            }
        }
        for (let index = 0; index < unClaimed.length; index++) {
            const element = unClaimed[index];
            for (let index = 0; index < singleUnclaimed.length; index++) {
                const case1 = singleUnclaimed[index];
                if (element.pincodes == case1.pincode) {
                    element.data.push(case1)
                }
            }
        }
        let total = 0
        for (let index = 0; index < unClaimed.length; index++) {
            const element = unClaimed[index];
            total += element.data.length
        }
        for (let index = 0; index < unClaimed.length; index++) {
            const element = unClaimed[index];
            element.total = total
        }
        return unClaimed
    }, [bankwise])
    // const activeAgents = () => {
    //     let activeAgents = []
    //     let uniqpincodes = uniqueObject2(agents, 'pincode');
    //     for (let index = 0; index < uniqpincodes.length; index++) {
    //         const element = uniqpincodes[index];
    //         activeAgents.push({ pincodes: element, data: [] })
    //     }
    //     for (const key in agents) {
    //         if (Object.hasOwnProperty.call(agents, key)) {
    //             const element = agents[key];
    //             for (let index = 0; index < activeAgents.length; index++) {
    //                 const agentPincode = activeAgents[index];
    //                 if (agentPincode.pincodes === Number(element.pincode)) {
    //                     if (element.isLoggedIn) {
    //                         agentPincode.data.push(element)
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return activeAgents
    // }
    const tat = useMemo(() => {
        const tat = [{ time: 'Within 4 hrs -', data: [] }, { time: '4 hrs to 8 Hr -', data: [] }, { time: '8 Hr to 12 Hr -', data: [] }, { time: '12 Hr to 24 Hr -', data: [] }, { time: 'Above 24 Hr -', data: [] }]
        const currentTime = new Date().getTime();
        for (const key in forms) {
            if (Object.hasOwnProperty.call(forms, key)) {
                const pincodeSplit = forms[key];
                for (const form in pincodeSplit) {
                    if (Object.hasOwnProperty.call(pincodeSplit, form)) {
                        const singleForm = pincodeSplit[form];
                        let formTime = new Date(singleForm.tat).getTime()
                        if (formTime > (currentTime - 14400000)) {
                            tat[0].data.push(singleForm)
                        } else if (formTime > (currentTime - 28800000)) {
                            tat[1].data.push(singleForm)
                        } else if (formTime > (currentTime - 43200000)) {
                            tat[2].data.push(singleForm)
                        } else if (formTime > (currentTime - 86400000)) {
                            tat[3].data.push(singleForm)
                        } else if (formTime > (currentTime > (currentTime - 86400000))) {
                            tat[4].data.push(singleForm)
                        }
                    }
                }
            }
        }
        return tat
    }, [forms])
    const GetTotal = ({data}) => {
        let total = 0
        for (let index = 0; index < data?.length; index++) {
            const element = data[index];
            total += element.data.length
        }
        return <>{total}</>
    }
    useEffect(() => {
        bankwise1()
    }, [forms])
    return (
        <div className='row bg-light pt-2'>
            <div className="col-6">
                Cases Today (<GetTotal data={casesToday} />)
                <div className='mb-1'>
                    Old Cases ({oldcases.length}) <Button color='link' type='button' onClick={() => setOldcasesModal(!oldcasesModal)}>View</Button>
                </div>

                {oldcasesModal && <div>
                    {oldcases.length > 0 && oldcases.map((item, index) =>
                        <div key={item.applicantDetails.customerName}>
                            clientName: {item.applicantDetails.customerName}
                        </div>
                        // <ModalItem item={item} open={oldcasesModal} count={index} close={() => setOldcasesModal(false)} />
                    )}
                </div>}
                <div>
                    <Button
                        color="primary"
                        onClick={() => setCasesTodayToast(!casesTodayToast)}
                    >
                        {casesTodayToast ? "Hide Details" : "View Details"}
                    </Button>
                    <Button className='ms-1' onClick={oldCasesDB}>Refresh</Button>
                    <br />
                    <br />
                    <Toast isOpen={casesTodayToast} className='w-100'>
                        <ToastBody >
                            {casesToday?.map((item, index) => (
                                <div key={item.name}>
                                    <Button color='link'  onClick={() => setCasesToadyModal({ count: index, state: true })}>{item.name} - <span className='text-danger'>({item.data.length})</span></Button>

                                    <ModalItem item={item} open={casesTodayModal} count={index} close={() => setCasesToadyModal(false)} />
                                </div>
                            ))}
                        </ToastBody>
                    </Toast>
                </div>
            </div>
            <div className="col-6">
                Total Cases (<GetTotal data={casesTotal} />)
                <div>
                    <Button
                        color='danger'
                        onClick={() => setCasesTotalToast(!casesTotalToast)}
                    >
                        {casesTotalToast ? "Hide Details" : "View Details"}
                    </Button>
                    <br />
                    <br />
                    <Toast isOpen={casesTotalToast} className='w-100'>
                        <ToastBody >
                            {casesTotal?.map((item, index) => (
                                <div key={item.name}>
                                    <Button color='link' onClick={() => setCasesTotalModal({ count: index, state: true })}>{item.name} - <span className='text-danger'>({item.data.length})</span></Button>

                                    <ModalItem item={item} open={casesTotalModal} count={index} close={() => setCasesTotalModal(false)} />
                                </div>
                            ))}
                        </ToastBody>
                    </Toast>
                </div>
            </div>
            <div className="col-6">
                Unclaimed cases ({unClaimedCases[2]?.total})
                <div>
                    <Button
                        color='danger'
                        onClick={() => setUnclaimedCasesToast(!unclaimedCasesToast)}
                    >
                        {unclaimedCasesToast ? "Hide Details" : "View Details"}
                    </Button>
                    <br />
                    <br />
                    <Toast isOpen={unclaimedCasesToast} className='w-100'>
                        <ToastBody>
                            {unClaimedCases.map((item, index) => {
                                if (item.data.length > 0)
                                    return <div key={item.tat}>
                                        <Button color='link' key={item?.tat} onClick={() => setUnclaimedCasesModal({ count: index, state: true })}>{item?.pincodes} - <span className='text-danger'>({item.data.length})</span></Button>

                                        <ModalItem item={item} open={unclaimedCasesModal} count={index} close={() => setUnclaimedCasesModal(false)} />
                                    </div>
                            })}
                        </ToastBody>
                    </Toast>
                </div>
            </div>
            <div className="col-6">
                Submited Cases (<GetTotal data={submittedCases} />)
                <div>
                    <Button
                        color='primary'
                        onClick={() => setSubmittedCasesToast(!submittedCasesToast)}
                    >
                        {submittedCasesToast ? "Hide Details" : "View Details"}
                    </Button>
                    <br />
                    <br />
                    <Toast isOpen={submittedCasesToast} className='w-100'>
                        <ToastBody >
                            {submittedCases?.map((item, index) => (
                                <div key={item.name}>
                                    <Button color='link' onClick={() => setSubmittedCasesModal({ count: index, state: true })}>{item.name} - <span className='text-danger'>({item.data.length})</span></Button>

                                    <ModalItem item={item} open={submittedCasesModal} count={index} close={() => setSubmittedCasesModal(false)} />
                                </div>
                            ))}
                        </ToastBody>
                    </Toast>
                </div>
            </div>
            {/* <div className="col-6 bg-primary">
                Active agents
                {activeAgents().map((item, index) => {
                    if (item.data.length > 0)
                        return <div key={item.tat}>
                            <Button color='danger' onClick={() => setActiveAgentsModal({ count: index, state: true })}>{item?.pincodes} - {item?.data?.length}</Button>

                            <AgentItem item={item} open={activeAgentsModal} count={index} close={() => setActiveAgentsModal(false)} />
                        </div>
                })}
                <button onClick={() => console.log('activeAgents', activeAgents())}>Test</button>
            </div> */}
            <div className="col-12">
                TAT (<GetTotal data={tat} />)
                {tat.map((item, index) => {
                    return <div key={item.time}>
                        <button className='btn text-success' onClick={() => setTatModal({ count: index, state: true })}>{item?.time}{item?.data.length}</button>
                        <ModalItem item={item} open={tatModal} count={index} close={() => setTatModal(false)} />
                    </div>
                })}
                {/* <button onClick={() => console.log('tat', tat())}>Test</button> */}
            </div>

            {/* <button value='update store' onClick={() => props.dispatch({ type: 'DATA', data: 'XYZ' })}>update redux</button> */}

        </div>
    )
}

const ModalItem = ({ item, open, close, count }) => {
    const combinedData = () => {
        let combined = [];
        if (item.data) {
            for (let index = 0; index < item.data.length; index++) {
                const element = item.data[index];
                if (element.data) {
                    if (element.data?.office?.applicantDetails.customerName) {
                        combined.push({
                            name: element.data?.office?.applicantDetails.customerName,
                            data: element.data.office, id: element.id
                        })
                    } else if (element.data?.resident?.applicantDetails.customerName) {
                        combined.push({ name: element.data?.resident?.applicantDetails.customerName, data: element.data.resident, id: element.id })
                    }
                } else {
                    if (element.office?.applicantDetails.customerName) {
                        combined.push({
                            name: element.office?.applicantDetails.customerName,
                            data: element.office, id: element.id
                        })
                    } else if (element.resident?.applicantDetails.customerName) {
                        combined.push({ name: element.resident?.applicantDetails.customerName, data: element.resident, id: element.id })
                    } else if (element.applicantDetails?.customerName) {
                        combined.push({ name: element.applicantDetails.customerName, data: element, id: element.key })
                    }
                }
            }
        } else {
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                combined.push({
                    name: element.applicantDetails.customerName,
                    data: element, id: element?.id
                })
            }
        }

        return combined
    }
    // console.log('combined', combinedData())
    return (
        <Modal isOpen={open.state && open.count === count} toggle={() => close(!open.state)}>
            <ModalBody>
                <div>
                    {combinedData().map(item => {
                        return <ul key={item.name || item.pincode}>
                            <li><a href={`${item?.data?.applicantDetails.form}/${item?.data?.applicantDetails.pincode}/${item.id}`}>{item.name ? item.name : item.pincode}
                            </a>
                            </li>
                        </ul>
                    })}
                </div>

            </ModalBody>
        </Modal>
    )
}

// const AgentItem = ({ item, open, close, count }) => {
//     const agentData = () => {
//         let agent = [];
//         for (let index = 0; index < item.data.length; index++) {
//             const element = item.data[index];
//             if (element.isLoggedIn) {
//                 agent.push(element)
//             }
//         }
//         return agent
//     }
//     return (
//         <Modal isOpen={open.state && open.count === count} toggle={() => close(!open.state)}>
//             <ModalBody>
//                 <div>
//                     {agentData().map(item => {
//                         return <div key={item.name}>
//                             <a href={`${item?.data?.applicantDetails.form}/${item?.data?.applicantDetails.pincode}/${item.id}`} target='_blank'>{item.name} -- {JSON.stringify(item.onCase)}
//                             </a>
//                         </div>
//                     })}
//                 </div>

//             </ModalBody>
//         </Modal>
//     )
// }
const mapStateToProps = (state) => {
    return {
        users: state.data,
        forms: state.forms,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(Dashboard);