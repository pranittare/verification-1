import React, { useEffect, useState } from 'react'
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import VerificationObserverResident from './VerificationObserverResident';
import Tpc from './Tpc';
import Geolocation from './Geolocation';
import Collapse from '../components/Collapse';
import { useParams } from 'react-router-dom'
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';
import DropDownComp from '../components/DropDownComp';
import VerificationObserverOffice from './VerificationObserverOffice';

const Resident = (props) => {
    let allData1 = []
    let { pincode, id } = useParams()

    // const [verification, setVerification] = useState()
    // const [tpc, setTpc] = useState()
    // const [formdata, setFormData] = useState()
    const [getData, setGetData] = useState(false)
    // const [alldata, setAlldata] = useState([])
    const [applicantDetails, setApplicantDetails] = useState()
    const [verificationObserver, setVerificationOvserver] = useState();
    const [formdata, setFormdata] = useState({
        visitDate: '',
        visitedTime: '',
        addressConfirmed: '',
        landmark: '',
        personMet: '',
        personMetName: '',
        personMetAge: '',
        personMetRealtionwithApplicant: '',
        personMetRealtionwithApplicantOther: '',
        totalYearsInCity: '',
        lessThanYrAtCurrentAddress: '',
        lessThanYrAtCurrentAddressNote: '',
        residenceStatus: '',
        gateDoorColor: '',
        docVerified: '',
        documentDetails: '',
        customerOccupation: '',
        qualification: '',
        marrried: '',
        officeName: '',
        designation: '',
        noOfFamilyMembers: '',
        earningMembers: '',
        dependents: '',
        children: '',
        officeAddress: '',
    })
    const [refresh, setRefresh] = useState(0)
    const onHandleChange = (e) => {
        // name
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name] )
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // const formd = new FormData(e.currentTarget)
        // setFormData(formd)
    }
    const getAllData = () => {
        document.getElementById('residentVerificationDetails').click()
        setGetData(true)
        setTimeout(() => {
            setGetData(false)
        }, [100])

    }
    useEffect(() => {
        console.log('getData', formdata)
    }, [getData])
    // Form data by id
    useEffect(() => {
        if (id) {
            console.log(id)
            getFormData(pincode, id)
                .then(formsaved => {
                    let formd = formdata
                    let applicant = {}
                    console.log('formsaved', formsaved)
                    if (formsaved?.resident) {
                        for (const key in formsaved.resident.verificationDetails) {
                            let savedForm = formsaved.resident.verificationDetails
                            formd[key] = formsaved.resident.verificationDetails[key]
                            if (key === 'VisitDate') {
                                let date = savedForm[key]
                                let visitdateandtime = new Date(date)
                                let dateday = visitdateandtime.getDate()
                                let dateMonth = (visitdateandtime.getMonth() + 1)
                                let dateYear = visitdateandtime.getFullYear()
                                let vDate = `${dateday}/${dateMonth}/${dateYear}`
                                let time3 = visitdateandtime.toTimeString()
                                let time4 = time3.split('GMT')[0]
                                formd.visitDate = vDate
                                formd.visitedTime = time4
                            }
                            if (key === 'addressConfirmedLandmark') {
                                formd.landmark = savedForm[key]
                            }
                        }
                        for (const key in formsaved?.resident?.applicantDetails) {
                            applicant[key] = formsaved?.resident?.applicantDetails[key]
                        }
                        setVerificationOvserver(formsaved.resident.verificationDetails)
                    }
                    // console.log('applicant',applicant)
                    setApplicantDetails(applicant)
                    setFormdata(formd)
                    setRefresh(Math.random())
                    console.log('formd', formd)
                })

        }

    }, [id, pincode])
    let personMet = [
        { name: 'personMet', value: '', label: 'None' },
        { name: 'personMet', value: 'yes', label: 'Yes' },
        { name: 'personMet', value: 'no', label: 'No' }
    ]
    let personMetRealtionwithApplicant = [
        { name: 'personMetRealtionwithApplicant', value: '', label: 'None' },
        { name: 'personMetRealtionwithApplicant', value: 'Self', label: 'Self' },
        { name: 'personMetRealtionwithApplicant', value: 'Mother', label: 'Mother' },
        { name: 'personMetRealtionwithApplicant', value: 'Father', label: 'Father' },
        { name: 'personMetRealtionwithApplicant', value: 'Brother', label: 'Brother' },
        { name: 'personMetRealtionwithApplicant', value: 'Sister', label: 'Sister' },
        { name: 'personMetRealtionwithApplicant', value: 'Son', label: 'Son' },
        { name: 'personMetRealtionwithApplicant', value: 'Daughter', label: 'Daughter' },
        { name: 'personMetRealtionwithApplicant', value: 'Spouse', label: 'Spouse' },
        { name: 'personMetRealtionwithApplicant', value: 'Family-Member', label: 'Family-Member' },
        { name: 'personMetRealtionwithApplicant', value: 'Staff', label: 'Staff' },
        { name: 'personMetRealtionwithApplicant', value: 'Other', label: 'Other' },

    ]
    let lessThanYrAtCurrentAddress = [
        { name: 'lessThanYrAtCurrentAddress', value: '', label: 'None' },
        { name: 'lessThanYrAtCurrentAddress', value: 'yes', label: 'Yes' },
        { name: 'lessThanYrAtCurrentAddress', value: 'no', label: 'No' }
    ]
    let residenceStatus = [
        { name: 'residenceStatus', value: '', label: 'None' },
        { name: 'residenceStatus', value: 'Self Owned', label: 'Self Owned' },
        { name: 'residenceStatus', value: 'Owned by Parents', label: 'Owned by Parents' },
        { name: 'residenceStatus', value: 'Rented', label: 'Rented' },
        { name: 'residenceStatus', value: 'Company Accomadation', label: 'Company Accomadation' },
        { name: 'residenceStatus', value: 'Multi Tenants', label: 'Multi Tenants' },
        { name: 'residenceStatus', value: 'Paying Guest', label: 'Paying Guest' },
        { name: 'residenceStatus', value: 'Friend Owned', label: 'Friend Owned' },
        { name: 'residenceStatus', value: 'Relative Owned', label: 'Relative Owned' },
        { name: 'residenceStatus', value: 'Lodging', label: 'Lodging' },
        { name: 'residenceStatus', value: 'Other', label: 'Other' },

    ]
    let docVerified = [
        { name: 'docVerified', value: '', label: 'None' },
        { name: 'docVerified', value: 'yes', label: 'Yes' },
        { name: 'docVerified', value: 'no', label: 'No' }
    ]
    let customerOccupation = [
        { name: 'customerOccupation', value: '', label: 'None' },
        { name: 'customerOccupation', value: 'Salaried/Service', label: 'Salaried/Service' },
        { name: 'customerOccupation', value: 'Business/Self Employed', label: 'Business/Self Employed' },
        { name: 'customerOccupation', value: 'Retired', label: 'Retired' },
        { name: 'customerOccupation', value: 'House Wife', label: 'House Wife' },

    ]
    let qualification = [
        { name: 'qualification', value: '', label: 'None' },
        { name: 'qualification', value: 'SSC', label: 'SSC' },
        { name: 'qualification', value: 'HSC', label: 'HSC' },
        { name: 'qualification', value: 'UnderGradguate', label: 'UnderGradguate' },
        { name: 'qualification', value: 'Gradguate', label: 'Gradguate' },
        { name: 'qualification', value: 'Post-Gradguate', label: 'Post-Gradguate' },
        { name: 'qualification', value: 'Professional', label: 'Professional' },
        { name: 'qualification', value: 'Illiterate', label: 'Illiterate' },

    ]
    let marrried = [
        { name: 'marrried', value: '', label: 'None' },
        { name: 'marrried', value: 'yes', label: 'Married' },
        { name: 'marrried', value: 'no', label: 'UnMarried' }
    ]
    // useEffect(() => {
    //     if (verification) {
    //         // for (let [key, value] of verification.entries()) {
    //         //     allData1.push({ [key]: value })
    //         // }
    //         // setAlldata(allData1)
    //     }
    // }, [verification])
    // useEffect(() => {
    //     if (tpc) {
    //         // for (let [key, value] of tpc.entries()) {
    //         //     allData1.push({ [key]: value })
    //         // }
    //         // setAlldata(allData1)
    //     }
    // }, [tpc])
    // useEffect(() => {
    //     if (applicantDetails) {
    //         // for (let [key, value] of applicantDetails.entries()) {
    //         //     allData1.push({ [key]: value })
    //         // }
    //         // setAlldata(allData1)
    //     }
    // }, [applicantDetails])
    // useEffect(() => {
    //     if (formdata) {
    //         // for (let [key, value] of formdata.entries()) {
    //         //     allData1.push({ [key]: value })
    //         // }
    //         setAlldata(allData1)
    //     }
    // }, [formdata])
    // useEffect(() => {
    //     if (alldata) {
    //         console.log('alldata', alldata)
    //     }
    // }, [alldata])
    return (
        <div>
            <Collapse title='Applicant Details' id='true'>
                <ApplicantDetails applicantDetails={(data) => { setApplicantDetails(data) }} data={applicantDetails} />
            </Collapse>
            <Collapse title='Verification Details'>
                <h1>Verification Details</h1>
                {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                    <div>
                        <label>Visit Date</label>
                        <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Visited Time</label>
                        <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Address Confirmed</label>
                        <Input type="text" name='addressConfirmed' value={formdata['addressConfirmed']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>LandMark</label>
                        <Input type="text" name='landmark' value={formdata['landmark']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Person Met</label>
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMet} />
                    </div>
                    <div>
                        <label>Person Met Name</label>
                        <Input type="text" name='personMetName' value={formdata['personMetName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Person Met Age</label>
                        <Input type="text" name='personMetAge' value={formdata['personMetAge']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Relation with Applicant</label>
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMetRealtionwithApplicant} />
                        {/* <Input type="text" name='personMetRealtionwithApplicant' value={formdata['personMetRealtionwithApplicant']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    </div>
                   {formdata['personMetRealtionwithApplicant'] === 'Others' && <div>
                        <label>Name and Relation with Applicant (Others)</label>
                        <Input type="text" name='personMetRealtionwithApplicantOther' value={formdata['personMetRealtionwithApplicantOther']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    <div>
                        <label>Staying in City (No. of Yrs)</label>
                        <Input type="text" name='totalYearsInCity' value={formdata['totalYearsInCity']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Less than 1 yr at Current Address</label>
                        {/* <Input type="text" name='lessThanYrAtCurrentAddress' value={formdata['lessThanYrAtCurrentAddress']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={lessThanYrAtCurrentAddress} />
                    </div>
                  {formdata['lessThanYrAtCurrentAddress'] === 'Yes' &&  <div>
                        <label>Less than 1 yr at Current Address (Yes)</label>
                        <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>}
                    <div>
                        <label>Residence Status</label>
                        {/* <Input type="text" name='residenceStatus' value={formdata['residenceStatus']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={residenceStatus} />
                    </div>
                    <div>
                        <label>Gate/Door color & Bldg Color</label>
                        <Input type="text" name='gateDoorColor' value={formdata['gateDoorColor']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Doc Verified</label>
                        {/* <Input type="text" name='docVerified' value={formdata['docVerified']} onChange={
                            (e) => onHandleChange(e.currentTarget)} /> */}
                            <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={docVerified} />
                    </div>
                    <div>
                        <label>Document Details</label>
                        <Input type="text" name='documentDetails' value={formdata['documentDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Customer Occupation</label>
                        {/* <Input type="text" name='customerOccupation' value={formdata['customerOccupation']
                    } onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                     <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={customerOccupation} />
                    </div>
                    <div>
                        <label>Qualification</label>
                        {/* <Input type="text" name='qualification' value={formdata['qualification']} 
                        onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                         <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={qualification} />
                    </div>
                    <div>
                        <label>Maritial Status</label>
                        {/* <Input type="text" name='marrried' value={formdata['marrried']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={marrried} />
                    </div>
                    <div>
                        <label>Office Name</label>
                        <Input type="text" name='officeName' value={formdata['officeName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Designation</label>
                        <Input type="text" name='designation' value={formdata['designation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>No of Family Members</label>
                        <Input type="text" name='noOfFamilyMembers' value={formdata['noOfFamilyMembers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Earning Members</label>
                        <Input type="text" name='earningMembers' value={formdata['earningMembers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Dependents</label>
                        <Input type="text" name='dependents' value={formdata['dependents']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Children</label>
                        <Input type="text" name='children' value={formdata['children']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Office Address</label>
                        <Input type="text" name='officeAddress' value={formdata['officeAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='d-none'>
                        <button type='submit' id='residentVerificationDetails'>Submit</button>
                    </div>
                </form>}
                <VerificationObserverResident verification={(data) => {
                    let alldata = formdata
                    let combinded = Object.assign(alldata, data);
                    setFormdata(combinded)}} getData={getData} data={verificationObserver}/>
                <Tpc tpc={(data) => {
                    let alldata = formdata
                    let combinded = Object.assign(alldata, data);
                    setFormdata(combinded)}} getData={getData} data={verificationObserver}/>
                <Geolocation data={verificationObserver} id={id} pincode={pincode}/>
                <Button color='primary' onClick={getAllData}>Submit</Button>
            </Collapse>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors
    }
}
export default connect(mapStateToProps)(Resident)