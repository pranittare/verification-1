import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { Button, Input } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import companyStamp from '../assets/stamp.jpeg'
import { useSelector } from 'react-redux';

const dict = {
    TPCName1: '',
    TPCStatus1: '',
    TPCRemark1: '',
    TPCName2: '',
    TPCStatus2: '',
    TPCRemark2: '',
    TVRNumber: '',
    TVRDesignation: '',
    TVRStatus: '',
    TVRBusinessName: '',
    TVRNoofyearsinBusiness: '',
    TVRRemarks: '',
    finalFIAgencyname: 'KreDT',
    finalFIAnyRemarks: '',
    finalFIRemarks: '',
    finalFIVerifierName: '',
    productSupervisor: '',
    marketReputation: '',
    TPCRemarks: '',
    overallStatus: ''
}

const Tpc = forwardRef(({ data, form, applicantDetails }, ref) => {
    let status1 = [
        { name: 'TPCStatus1', value: '', label: 'None' },
        { name: 'TPCStatus1', value: 'positive', label: 'Positive' },
        { name: 'TPCStatus1', value: 'negative', label: 'Negative' },
    ]

    let status2 = [
        { name: 'TPCStatus2', value: '', label: 'None' },
        { name: 'TPCStatus2', value: 'positive', label: 'Positive' },
        { name: 'TPCStatus2', value: 'negative', label: 'Negative' },
    ]

    let marketReputation = [
        { name: 'marketReputation', value: '', label: 'None' },
        { name: 'marketReputation', value: 'positive', label: 'Positive' },
        { name: 'marketReputation', value: 'negative', label: 'Negative' },
    ]

    let TVRStatus = [
        { name: 'TVRStatus', value: '', label: 'None' },
        { name: 'TVRStatus', value: 'positive', label: 'Positive' },
        { name: 'TVRStatus', value: 'negative', label: 'Negative' },
    ]

    let overallStatus = [
        { name: 'overallStatus', value: '', label: 'None' },
        { name: 'overallStatus', value: `${applicantDetails.bankNBFCname.clientName === 'Indiabulls Housing Finance Ltd' ?"Positive": "Recomended" }`, label: `${applicantDetails.bankNBFCname.clientName === 'Indiabulls Housing Finance Ltd' ?"Positive": "Recomended" }` },
        { name: 'overallStatus', value: 'Refer', label: 'Refer' },
        { name: 'overallStatus', value: `${applicantDetails.bankNBFCname.clientName === 'Indiabulls Housing Finance Ltd' ?"Negative": "Not Recomended" }`, label: `${applicantDetails.bankNBFCname.clientName === 'Indiabulls Housing Finance Ltd' ?"Negative": "Not Recomended" }` },
        { name: 'overallStatus', value: 'CNV', label: 'CNV' },
    ]
    const remarksfnc = (data) => {
        if (form === 'office') {
            let overall = `${data.overallStatus ? data.overallStatus : 'NA'} | Date: ${data.visitDate ? data.visitDate : 'NA'} | ${data.visitedTime ? data.visitedTime : 'NA'} | Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : 'NA'} | Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : 'NA'} | Person Met: ${data.personMet ? data.personMet : 'NA'} | Person Met Name: ${data.personMetName ? data.personMetName : 'NA'} | Nature of Business Details: ${data.natureofBusines ? data.natureofBusines : 'NA'} |Business Board Seen: ${data.businessBoardSeen ? data.businessBoardSeen : 'NA'} | Office Ownership: ${data.officeOwnership ? data.officeOwnership : 'NA'} |Type of Office: ${data.verificationObserver ? data.verificationObserver : 'NA'} | Locality of Office: ${data.localityofOffice ? data.localityofOffice : 'NA'} | Business Activity Level: ${data.businessActivityLevel ? data.businessActivityLevel : 'NA'} |Ease of Locating: ${data.easeofLocating ? data.easeofLocating : 'NA'} |Distance from Station: ${data.distancefromStation ? data.distancefromStation : 'NA'} |Negative Area: ${data.negativeArea ? data.negativeArea : 'NA'} |TPC1: ${data.TPCName1 ? data.TPCName1 : 'NA'} - ${data.TPCStatus1 ? data.TPCStatus1 : 'NA'} - ${data.TPCRemark1 ? data.TPCRemark1 : 'NA'} |TPC2: ${data.TPCName2 ? data.TPCName2 : 'NA'} - ${data.TPCStatus2 ? data.TPCStatus2 : 'NA'} - ${data.TPCRemark2 ? data.TPCRemark2 : 'NA'} | ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : 'NA'}`;
            return overall
        } else {
            let overall = `${data.overallStatus ? data.overallStatus : 'NA'} |  Date: ${data.visitDate ? data.visitDate : 'NA'} |  ${data.visitedTime ? data.visitedTime : 'NA'} |  Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : 'NA'} |  Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : 'NA'} |  Person Met: ${data.personMet ? data.personMet : 'NA'} |  Person Met Name: ${data.personMetName ? data.personMetName : 'NA'} |  Residence Status: ${data.residenceStatus ? data.residenceStatus : 'NA'} |  Customer Occupation: ${data.customerOccupation ? data.customerOccupation : 'NA'} |  Gate/Door color: ${data.gateDoorColor ? data.gateDoorColor : 'NA'} |  Locality of Address: ${data.localityOfAddress ? data.localityOfAddress : 'NA'} |   Type of House: ${data.typeOfHouse ? data.typeOfHouse : 'NA'} | Accessibility/Approachability: ${data.accessibility ? data.accessibility : 'NA'} | Ease of Locating: ${data.easeofLocating ? data.easeofLocating : 'NA'} |  Customers Attitude: ${data.customerAttitude ? data.customerAttitude : 'NA'} | Distance from Station: ${data.distancefromStation ? data.distancefromStation : 'NA'} |  Negative Area: ${data.negativeArea ? data.negativeArea : 'NA'} | TPC1: ${data.TPCName1 ? data.TPCName1 : 'NA'} - ${data.TPCStatus1 ? data.TPCStatus1 : 'NA'} - ${data.TPCRemark1 ? data.TPCRemark1 : 'NA'} | TPC2: ${data.TPCName2 ? data.TPCName2 : 'NA'} - ${data.TPCStatus2 ? data.TPCStatus2 : 'NA'} - ${data.TPCRemark2 ? data.TPCRemark2 : 'NA'} | ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : 'NA'}`;
            return overall
        }
    }
    const [refresh, setRefresh] = useState(0);
    const users = useSelector((state) => state.users)

    const [formdata, setFormdata] = useState(dict)
    const onHandleChange = (e) => {
        let form = { ...formdata }
        form[e.name] = e.value
        if (e.name == 'overallStatus') {
            form.finalFIRemarks = remarksfnc(form)
        } 
        setFormdata(form)
        setRefresh(Math.random())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const getProductSupervisor = (form) => {
        let email = getCookie('email');
        let supervisor = '';
        if (!form.productSupervisor) {
            for (const key in users) {
                if (Object.hasOwnProperty.call(users, key)) {
                    const element = users[key];
                    if (element.userId === email) {
                        supervisor = element.name
                    }
                }
            }
            return supervisor;
        }
        return form.productSupervisor

    }
    const getCookie = (cname) => {
        let name = cname + "=";
        let ca = document?.cookie?.split(';');
        if (ca.length > 0) {
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return "";
    }
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            let form = { ...formdata }
            for (const key in data) {
                form[key] = data[key]
            }
                form.productSupervisor = getProductSupervisor(form)
            form.finalFIRemarks = remarksfnc(data)
            // if (form.finalFIAgencyname === "") {
                form.finalFIAgencyname = "KreDT"
            // }
            if (form.finalFIVerifierName === "") {
                form.finalFIVerifierName = data.selected
            }
            setFormdata(form)
            setRefresh(Math.random())
        }
    }, [data])
    // useEffect(() => {
    //     if (overallStatus1) {
    //         let form = { ...formdata }
    //         form.overallStatus = overallStatus1
    //         form.finalFIRemarks = remarksfnc(form)
    //         setFormdata(form)
    //         setRefresh(Math.random())

    //     }
    // },[overallStatus1])
    useImperativeHandle(ref, () => ({

        getFormData() {
            const refData = { ...formdata }
            for (const key in refData) {
                if (dict[key] === undefined)
                    delete refData[key]
            }
            return refData
            // applicantDetail(formdata)
        }

    }));
    return (
        <div>
            <h4>TPC Confirmation</h4>
            <form className='d-flex justify-content-around flex-wrap' onSubmit={handleSubmit}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Remark /Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>
                                <Input type="text" name="TPCName1" value={formdata['TPCName1']} onChange={(e) => onHandleChange(e.currentTarget)} /></td>

                            <td>
                                <DropDownComp id='tpc' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={status1} />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" value={formdata['TPCRemark1']} onChange={(e) => onHandleChange(e.currentTarget)} /></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>
                                <Input type="text" name="TPCName2" value={formdata['TPCName2']} onChange={(e) => onHandleChange(e.currentTarget)} /></td>

                            <td>
                                <DropDownComp id='tpc' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={status2} />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark2" value={formdata['TPCRemark2']} onChange={(e) => onHandleChange(e.currentTarget)} /></td>
                        </tr>

                    </tbody>
                </table>
                <div className='d-flex'>
                    <div>
                        <label>Market Reputation/Dedup Check</label>
                        <DropDownComp id='tpc' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={marketReputation} />
                    </div>
                    <div className='ms-4'>
                        <label>Remarks</label>
                        <Input type="text" name='TPCRemarks' value={formdata['TPCRemarks']} onChange={(e) => onHandleChange(e.currentTarget)} />

                    </div>

                </div>
                <h4 className='w-100'>TVR Comments</h4>
                <div>
                    <label>Number</label>
                    <Input type="text" name='TVRNumber' value={formdata['TVRNumber']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Designation</label>
                    <Input type="text" name='TVRDesignation' value={formdata['TVRDesignation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Status</label>

                    <DropDownComp id='tpc' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={TVRStatus} />
                </div>
                <div>
                    <label>Business Name</label>
                    <Input type="text" name='TVRBusinessName' value={formdata['TVRBusinessName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>No of years in Business</label>
                    <Input type="text" name='TVRNoofyearsinBusiness' value={formdata['TVRNoofyearsinBusiness']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='TVRRemarks' value={formdata['TVRRemarks']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='w-100 mt-2'>
                    <h4>Final FI Status
                        {/* <Button color='link'>Recheck</Button>
                        <Button color='danger' disabled={override} onClick={() => setOverride(true)} className='ms-2 me-2'>Override Changes</Button> */}
                        {/* <Button color='info'>Show Working</Button> */}
                    </h4>
                </div>
                <div>
                    <label>Status</label>
                    <DropDownComp id='tpc' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={overallStatus} />

                </div>
                <div>
                    <label>Agency name</label>
                    <Input type="text" name='finalFIAgencyname' value={formdata['finalFIAgencyname']} disabled />
                </div>
                <div style={{ width: 200 }}>
                    <label>Standard Remarks</label>
                    <textarea className='form-control' cols='10' rows='7' type="text" name='finalFIAnyRemarks' value={formdata['finalFIAnyRemarks']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div style={{ width: 200 }}>
                    <label>Remarks</label>
                    <textarea className='form-control' cols='10' rows='7' type="text" name='finalFIRemarks' value={formdata['finalFIRemarks']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='mx-3'>
                    <label>Company Stamp</label>
                    <img src={companyStamp} style={{ width: 150 }} alt='' />
                </div>
                <div className='d-flex'>
                <div className='mx-3'>
                    <label>Verifier Name</label>
                    <Input type="text" name='finalFIVerifierName' value={formdata['finalFIVerifierName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Product Supervisor</label>
                    <Input type="text" name='productSupervisor' value={formdata['productSupervisor']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>

                </div>
                <div className='d-none'>
                    <Button id='tpcdata' type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
})

export default Tpc
