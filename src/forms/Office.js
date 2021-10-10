import React, { useState, useEffect } from 'react'
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import Tpc from './Tpc';
import VerificationObserverOffice from './VerificationObserverOffice';
import Geolocation from './Geolocation';

export default function Office() {
    let allData1 = []
    let test = ['appid', '1234']
    const [formdata, setFormdata] = useState({
        visitDate: '',
        visitedTime: '',
        addressConfirmed: '',
        businessBoardSeen: '',
        businessBoardSeenNote: '',
        landmark: '',
        personMet: '',
        personMetName: '',
        personMetNameDesignation: '',
        totalYearsExp: '',
        totalYearsExpAtCurrentAddress: '',
        lessThanYrAtCurrentAddress: '',
        lessThanYrAtCurrentAddressNote: '',
        natureofBusines: '',
        natureOfBusinessDetails: '',
        officeOwnership: '',
        rentAmount: '',
        detailsIncomeDesignation: '',
        additionalIncome: '',
        source: '',
        typeofEntity: ''
    })
    const [verification, setVerification] = useState()
    const [tpc, setTpc] = useState()
    // const [formdata, setFormData] = useState()
    const [getData, setGetData] = useState(false)
    const [alldata, setAlldata] = useState([])
    const [applicantDetails, setApplicantDetails] = useState()
    const [refresh, setRefresh] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formd = new FormData(e.currentTarget)
        setFormdata(formd)
    }
    const getAllData = () => {
        document.getElementById('officeVerficationDetails').click()
        setGetData(true)
        setTimeout(() => {
            setGetData(false)
        }, [100])

    }
    const onHandleChange = (e) => {
        // name
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name] )
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    useEffect(() => {
        if (verification) {
            
            for (let [key, value] of verification.entries()) {
                allData1.push({ [key]: value })
            }
            setAlldata(allData1)
        }
    }, [verification])
    useEffect(() => {
        if (tpc) {
            for (let [key, value] of tpc.entries()) {
                allData1.push({ [key]: value })
            }
            setAlldata(allData1)
        }
    }, [tpc])
    useEffect(() => {
        if (applicantDetails) {
            for (let [key, value] of applicantDetails.entries()) {
                allData1.push({ [key]: value })
            }
            setAlldata(allData1)
            console.log('app', applicantDetails)
        }
    }, [applicantDetails])
    useEffect(() => {
        if (formdata) {
            // for (let [key, value] of formdata.entries()) {
            //     allData1.push({ [key]: value })
            // }
            // setAlldata(allData1)
            console.log('form', formdata)
        }
    }, [formdata])
    useEffect(() => {
        if (alldata) {
            console.log('alldata', alldata)
        }
    }, [alldata])
    return (
        <div>
            <ApplicantDetails details={test} applicantDetails={(data) => { setApplicantDetails(data) }} getData={getData} test={test}/>
            <h1>Verification Details</h1>
           {refresh > 0 && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Visit Date</label>
                    <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Visited Time:</label>
                    <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Address Confirmed</label>
                    <Input type="text" name='addressConfirmed' value={formdata['addressConfirmed']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Business Board Seen</label>
                    <Input type="text" name='businessBoardSeen' value={formdata['businessBoardSeen']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Business Board Seen</label>
                    <Input type="text" name='businessBoardSeenNote' value={formdata['businessBoardSeenNote']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>LandMark</label>
                    <Input type="text" name='landmark' value={formdata['landmark']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Person Met</label>
                    <Input type="text" name='personMet' value={formdata['personMet']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Person Met Name</label>
                    <Input type="text" name='personMetName' value={formdata['personMetName']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Person Met Designation</label>
                    <Input type="text" name='personMetNameDesignation' value={formdata['personMetNameDesignation']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>No of Yrs in present Employment/Business & Total Yrs of Exp</label>
                    <Input type="text" name='totalYearsExp' value={formdata['totalYearsExp']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>No of Yrs At Current Address</label>
                    <Input type="text" name='totalYearsExpAtCurrentAddress' value={formdata['totalYearsExpAtCurrentAddress']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Less than 1 yr at Current Address</label>
                    <Input type="text" name='lessThanYrAtCurrentAddress' value={formdata['lessThanYrAtCurrentAddress']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Prev Address/ Prev Employment</label>
                    <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Nature of Business</label>
                    <Input type="text" name='natureofBusines' value={formdata['natureofBusines']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Nature of Business Other</label>
                    <Input type="text" name='natureOfBusinessDetails' value={formdata['natureOfBusinessDetails']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Office Ownership</label>
                    <Input type="text" name='officeOwnership' value={formdata['officeOwnership']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>if Rented then Rent Amount</label>
                    <Input type="text" name='rentAmount' value={formdata['rentAmount']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Details(Income/Designation)</label>
                    <Input type="text" name='detailsIncomeDesignation' value={formdata['detailsIncomeDesignation']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Additional Income</label>
                    <Input type="text" name='additionalIncome' value={formdata['additionalIncome']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Source</label>
                    <Input type="text" name='source' value={formdata['source']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div>
                    <label>Type of Entity</label>
                    <Input type="text" name='typeofEntity' value={formdata['typeofEntity']} onChange={(e)=> onHandleChange(e)} />
                </div>
                <div className='d-none'>
                    <button type='submit' id='officeVerficationDetails' >Submit</button>
                </div>
            </form>}
            <VerificationObserverOffice verification={(data) => setVerification(data)} getData={getData} />
            <Tpc tpc={(data) => setTpc(data)} getData={getData} />
            <Geolocation data={[]} />
            <Button color='primary' onClick={getAllData}>Submit</Button>
        </div>
    )
}
