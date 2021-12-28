import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Dashboard = ({ forms, agents }) => {

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
                            bankAndForms.bank.push({ name: formId?.office?.applicantDetails?.bankNBFCname.clientName, data: element })
                        } else if (formId.resident?.applicantDetails) {
                            bankAndForms.bank.push({ name: formId.resident?.applicantDetails?.bankNBFCname?.clientName, data: element })
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
                console.log('uni', arr[i])
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
    function uniqueObject2(obj,name) {
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
        let uniqpincodes = uniqueObject(forms)
        for (let index = 0; index < uniqpincodes.length; index++) {
            const element = uniqpincodes[index];
            unClaimed.push({ pincodes: element, data: [] })
        }
        for (const key in forms) {
            if (Object.hasOwnProperty.call(forms, key)) {
                const element = forms[key];
                for (const form in element) {
                    if (Object.hasOwnProperty.call(element, form)) {
                        const single = element[form];
                        if (!single.claimed && !single.submitted) {
                            for (let index = 0; index < unClaimed.length; index++) {
                                const singlepin = unClaimed[index];
                                if (single.pincode === singlepin.pincode) {
                                    singlepin.data.push({ single })

                                }
                            }
                        }
                    }
                }
            }
        }
        return unClaimed
    }
    const activeAgents = () => {
        let activeAgents = []
        let uniqpincodes = uniqueObject2(agents,'pincode');
        for (let index = 0; index < uniqpincodes.length; index++) {
            const element = uniqpincodes[index];
            activeAgents.push({ pincodes: element, data: [] })
        }
        for (const key in agents) {
            if (Object.hasOwnProperty.call(agents, key)) {
                const element = agents[key];
                for (let index = 0; index < activeAgents.length; index++) {
                    const agentPincode = activeAgents[index];
                    if (agentPincode.pincodes === Number(element.pincode)) {
                        agentPincode.data.push(element)
                    }
                }
            }
        }
        return activeAgents
    }
    const tat = () => {
        const tat = [{time: 'slot1', data: []},{time: 'slot2', data: []},{time: 'slot3', data: []},{time: 'slot4', data: []},{time: 'slot5', data: []}]
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
            <div className="col-6 bg-secondary p-2">
                cases Today
                <button onClick={() => console.log('casesToday', casesToday())}>Test</button>
            </div>
            <div className="col-6 bg-danger">
                Total Cases
            </div>
            <div className="col-6 bg-warning">
                Unclaimed cases

                <button onClick={() => console.log('unClaimedCases', unClaimedCases())}>Test</button>
            </div>
            <div className="col-6 bg-primary">
                Active agents
                <button onClick={() => console.log('activeAgents', activeAgents())}>Test</button>
            </div>
            <div className="col-12 bg-success">
                TAt
                <button onClick={() => console.log('tat', tat())}>Test</button>
            </div>

            {/* <button value='update store' onClick={() => props.dispatch({ type: 'DATA', data: 'XYZ' })}>update redux</button> */}

        </div>
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