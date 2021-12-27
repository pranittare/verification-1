import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Dashboard = ({ users, forms }) => {

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
    function uniqueArray2(arr) {
        var a = [];
        for (var i=0, l=arr.length; i<l; i++)
            if (a.indexOf(arr[i].name) === -1 && arr[i].name !== '')
                a.push(arr[i].name);
        return a;
    }
    const casesToday = () => {
        let casesT = []
        let bankname = uniqueArray2(bankwise().bank)
        for (let index = 0; index < bankname.length; index++) {
            const element = bankname[index];
            casesT.push({name: element, data: []})
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
    useEffect(() => {
        console.log('bankwise', bankwise())
    }, [forms])

    return (
        <div className='row'>
            <div className="col-6 bg-secondary p-2">
                cases Toady
                <button onClick={() => console.log('casesToday', casesToday())}>Test</button>
            </div>
            <div className="col-6 bg-danger">
                Total Cases
            </div>
            <div className="col-6 bg-warning">
                Unclaimed cases
            </div>
            <div className="col-6 bg-primary">
                Active agents
            </div>
            <div className="col-12 bg-success">
                TAt
            </div>

            {/* <button value='update store' onClick={() => props.dispatch({ type: 'DATA', data: 'XYZ' })}>update redux</button> */}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.data,
        forms: state.forms
    }
}
export default connect(mapStateToProps)(Dashboard);