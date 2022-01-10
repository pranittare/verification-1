import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Toast,
    ToastHeader,
    ToastBody,
    Modal,
    ModalBody
} from 'reactstrap';
import CollapseItem from '../components/Collapse';

const Dashboard = ({ forms, agents }) => {

    const [casesTodayToast, setCasesTodayToast] = useState(false);
    const [casesTodayModal, setCasesToadyModal] = useState(false);
    const [unclaimedCasesToast, setUnclaimedCasesToast] = useState(false)
    const [unclaimedCasesModal, setUnclaimedCasesModal] = useState(false)
    // const [activeAgentsToast, setActiveAgentsToast] = useState(false)
    // const [activeAgentsModal, setActiveAgentsModal] = useState(false)
    const [tatToast, setTatToast] = useState(false)
    const [tatModal, setTatModal] = useState(false)

    const bankwise = () => {
        let bankAndForms = { bank: [], pincode: [] }
        for (const key in forms) {
            if (Object.hasOwnProperty.call(forms, key)) {
                const element = forms[key];
                bankAndForms.pincode.push(element)
                for (const pincode in element) {
                    if (Object.hasOwnProperty.call(element, pincode)) {
                        const formId = element[pincode];
                        if (formId.office?.applicantDetails) {
                            bankAndForms.bank.push({ name: formId?.office?.applicantDetails?.bankNBFCname.clientName, data: formId, id: Object.keys(element)[0] })
                        } else if (formId.resident?.applicantDetails) {
                            bankAndForms.bank.push({ name: formId.resident?.applicantDetails?.bankNBFCname?.clientName, data: formId, id: Object.keys(element)[0] })
                        }
                    }
                }
            }
        }
        return bankAndForms
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
    const casesToday = () => {
        let casesT = []
        let bankname = uniqueArray2(bankwise().bank, 'name')
        for (let index = 0; index < bankname.length; index++) {
            const element = bankname[index];
            casesT.push({ name: element, data: [] })
        }
        // console.log('bankname', bankname)
        for (let i = 0; i < casesT.length; i++) {
            const bank = casesT[i];
            for (let index = 0; index < bankwise().bank.length; index++) {
                const element = bankwise().bank[index];
                if (bank.name === element.name) {
                    bank.data.push(element)
                }
            }

        }
        return casesT
    }
    const unClaimedCases = () => {
        let unClaimed = []
        let singleUnclaimed = []
        let uniqpincodes = uniqueObject(forms)
        for (let index = 0; index < uniqpincodes.length; index++) {
            const element = uniqpincodes[index];
            unClaimed.push({ pincodes: element, data: [], total: 0 })
        }
        for (let index = 0; index < bankwise().pincode.length; index++) {
            const element = bankwise().pincode[index];
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
    }
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
    const tat = () => {
        const tat = [{ time: 'slot1', data: [] }, { time: 'slot2', data: [] }, { time: 'slot3', data: [] }, { time: 'slot4', data: [] }, { time: 'slot5', data: [] }]
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
                        }
                        if (formTime > (currentTime - 28800000)) {
                            tat[1].data.push(singleForm)
                        }
                        if (formTime > (currentTime - 43200000)) {
                            tat[2].data.push(singleForm)
                        }
                        if (formTime > (currentTime - 86400000)) {
                            tat[3].data.push(singleForm)
                        }
                        if (formTime > (currentTime > (currentTime - 86400000))) {
                            tat[4].data.push(singleForm)
                        }
                    }
                }
            }
        }
        return tat
    }
    useEffect(() => {
        console.log('bankwise', bankwise())
    }, [forms])

    return (
        <div className='row'>
            <div className="col-6 p-2">
                cases Today {casesToday().map(item => (
                    <span>({item.data.length})</span>
                ))}
                <div>
                    <Button
                        color="primary"
                        onClick={() => setCasesTodayToast(!casesTodayToast)}
                    >
                        {casesTodayToast ? "Hide Details" : "View Details"}
                    </Button>
                    <br />
                    <br />
                    <Toast isOpen={casesTodayToast} className='w-100'>
                        <ToastBody >
                            {casesToday()?.map((item, index) => (
                                <>
                                    <Button color='link' key={item.name} onClick={() => setCasesToadyModal({ count: index, state: true })}>{item.name}</Button>

                                    <ModalItem item={item} open={casesTodayModal} count={index} close={() => setCasesToadyModal(false)} />
                                </>
                            ))}
                        </ToastBody>
                    </Toast>
                </div>
                <button onClick={() => console.log('casesToday', casesToday())}>Test</button>
            </div>
            <div className="col-6 bg-danger">
                Total Cases
            </div>
            <div className="col-6 bg-warning">
                Unclaimed cases ({unClaimedCases()[2]?.total})
                {unClaimedCases().map((item, index) => {
                    if (item.data.length > 0)
                        return <div key={item.tat}>
                            <Button color='link' key={item?.tat} onClick={() => setUnclaimedCasesModal({ count: index, state: true })}>{item?.pincodes} - {item?.data?.length}</Button>

                            <ModalItem item={item} open={unclaimedCasesModal} count={index} close={() => setUnclaimedCasesModal(false)} />
                        </div>
                })}
                <button onClick={() => console.log('unClaimedCases', unClaimedCases())}>Test</button>
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
            <div className="col-6 bg-success">
                TAt
                {tat().map((item, index) => {
                    return <div key={item.time}>
                        <Button color='link' onClick={() => setTatModal({ count: index, state: true })}>{item?.time}</Button>
                        <ModalItem item={item} open={tatModal} count={index} close={() => setTatModal(false)} />
                    </div>
                })}
                <button onClick={() => console.log('tat', tat())}>Test</button>
            </div>

            {/* <button value='update store' onClick={() => props.dispatch({ type: 'DATA', data: 'XYZ' })}>update redux</button> */}

        </div>
    )
}

const ModalItem = ({ item, open, close, count }) => {
    const combinedData = () => {
        let combined = [];
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
                }
            }
        }
        return combined
    }
    console.log('combined', combinedData())
    return (
        <Modal isOpen={open.state && open.count === count} toggle={() => close(!open.state)}>
            <ModalBody>
                <div>
                    {combinedData().map(item => {
                        return <div key={item.name || item.pincode}>
                            <a href={`${item?.data?.applicantDetails.form}/${item?.data?.applicantDetails.pincode}/${item.id}`} target='_blank'>{item.name ? item.name : item.pincode}
                            </a>
                        </div>
                    })}
                </div>

            </ModalBody>
        </Modal>
    )
}

const AgentItem = ({ item, open, close, count }) => {
    const agentData = () => {
        let agent = [];
        for (let index = 0; index < item.data.length; index++) {
            const element = item.data[index];
            if (element.isLoggedIn) {
                agent.push(element)
            }
        }
        return agent
    }
    return (
        <Modal isOpen={open.state && open.count === count} toggle={() => close(!open.state)}>
            <ModalBody>
                <div>
                    {agentData().map(item => {
                        return <div key={item.name}>
                            <a href={`${item?.data?.applicantDetails.form}/${item?.data?.applicantDetails.pincode}/${item.id}`} target='_blank'>{item.name} -- {JSON.stringify(item.onCase)}
                            </a>
                        </div>
                    })}
                </div>

            </ModalBody>
        </Modal>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.data,
        forms: state.forms,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(Dashboard);