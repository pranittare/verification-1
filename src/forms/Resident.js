import React, { useEffect, useState } from 'react'
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import VerificationObserverResident from './VerificationObserverResident';
import Tpc from './Tpc';
import Geolocation from './Geolocation';
import Collapse from '../components/Collapse';

export default function Resident() {
    let allData1 = []
    const [verification, setVerification] = useState()
    const [tpc, setTpc] = useState()
    // const [formdata, setFormData] = useState()
    const [getData, setGetData] = useState(false)
    const [alldata, setAlldata] = useState([])
    const [applicantDetails, setApplicantDetails] = useState()
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
        const formd = new FormData(e.currentTarget)
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
        if (verification) {
            // for (let [key, value] of verification.entries()) {
            //     allData1.push({ [key]: value })
            // }
            // setAlldata(allData1)
        }
    }, [verification])
    useEffect(() => {
        if (tpc) {
            // for (let [key, value] of tpc.entries()) {
            //     allData1.push({ [key]: value })
            // }
            // setAlldata(allData1)
        }
    }, [tpc])
    useEffect(() => {
        if (applicantDetails) {
            // for (let [key, value] of applicantDetails.entries()) {
            //     allData1.push({ [key]: value })
            // }
            // setAlldata(allData1)
        }
    }, [applicantDetails])
    useEffect(() => {
        if (formdata) {
            // for (let [key, value] of formdata.entries()) {
            //     allData1.push({ [key]: value })
            // }
            setAlldata(allData1)
        }
    }, [formdata])
    useEffect(() => {
        if (alldata) {
            console.log('alldata', alldata)
        }
    }, [alldata])
    return (
        <div>
            <Collapse title='Applicant Details' id='true'>
            <ApplicantDetails applicantDetails={(data) => { setApplicantDetails(data) }} getData={getData} />
            </Collapse>
            <Collapse title='Verification Details'>
            <h1>Verification Details</h1>
          {(refresh > 0 || true) &&  <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Visit Date</label>
                    <Input type="text" name='visitDate'  value={formdata['visitDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Visited Time</label>
                    <Input type="text" name='visitedTime'  value={formdata['visitedTime']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Address Confirmed</label>
                    <Input type="text" name='addressConfirmed'  value={formdata['addressConfirmed']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>LandMark</label>
                    <Input type="text" name='landmark'  value={formdata['landmark']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Person Met</label>
                    <Input type="text" name='personMet'  value={formdata['personMet']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Person Met Name</label>
                    <Input type="text" name='personMetName'  value={formdata['personMetName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Person Met Age</label>
                    <Input type="text" name='personMetAge'  value={formdata['personMetAge']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Relation with Applicant</label>
                    <Input type="text" name='personMetRealtionwithApplicant'  value={formdata['personMetRealtionwithApplicant']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Name and Relation with Applicant (Others)</label>
                    <Input type="text" name='personMetRealtionwithApplicantOther'  value={formdata['personMetRealtionwithApplicantOther']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Staying in City (No. of Yrs)</label>
                    <Input type="text" name='totalYearsInCity'  value={formdata['totalYearsInCity']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Less than 1 yr at Current Address</label>
                    <Input type="text" name='lessThanYrAtCurrentAddress'  value={formdata['lessThanYrAtCurrentAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Less than 1 yr at Current Address (Yes)</label>
                    <Input type="text" name='lessThanYrAtCurrentAddressNote'  value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Residence Status</label>
                    <Input type="text" name='residenceStatus'  value={formdata['residenceStatus']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Gate/Door color & Bldg Color</label>
                    <Input type="text" name='gateDoorColor'  value={formdata['gateDoorColor']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Doc Verified</label>
                    <Input type="text" name='docVerified'  value={formdata['docVerified']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Document Details</label>
                    <Input type="text" name='documentDetails'  value={formdata['documentDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Customer Occupation</label>
                    <Input type="text" name='customerOccupation'  value={formdata['customerOccupation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Qualification</label>
                    <Input type="text" name='qualification'  value={formdata['qualification']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Maritial Status</label>
                    <Input type="text" name='marrried'  value={formdata['marrried']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Office Name</label>
                    <Input type="text" name='officeName'  value={formdata['officeName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Designation</label>
                    <Input type="text" name='designation'  value={formdata['designation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>No of Family Members</label>
                    <Input type="text" name='noOfFamilyMembers'  value={formdata['noOfFamilyMembers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Earning Members</label>
                    <Input type="text" name='earningMembers'  value={formdata['earningMembers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Dependents</label>
                    <Input type="text" name='dependents'  value={formdata['dependents']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Children</label>
                    <Input type="text" name='children'  value={formdata['children']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Office Address</label>
                    <Input type="text" name='officeAddress'  value={formdata['officeAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='d-none'>
                    <button type='submit' id='residentVerificationDetails'>Submit</button>
                </div>
            </form>}
            <VerificationObserverResident verification={(data) => setVerification(data)} getData={getData} />
            <Tpc tpc={(data) => setTpc(data)} getData={getData} />
            <Geolocation data={[]} />
            <Button color='primary' onClick={getAllData}>Submit</Button>
            </Collapse>
        </div>
    )
}
