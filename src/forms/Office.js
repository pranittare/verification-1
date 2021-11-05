import React, { useState, useEffect } from 'react'
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import Tpc from './Tpc';
import VerificationObserverOffice from './VerificationObserverOffice';
import Geolocation from './Geolocation';
import DropDownComp from '../components/DropDownComp';
import Collapse from '../components/Collapse';
import { useParams } from 'react-router-dom'
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';

const Office = (props) => {
    // let allData1 = []
    // let test = ['appid', '1234']
    let { pincode, id } = useParams()
    console.log('form', props)
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
        typeofEntity: '',
        abc: ''
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
        console.log(e)
        form[e.name] = e.value
        // console.log(e, form[e.name] )
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    // Form data by id
    useEffect(() => {
        if (id) {
            console.log(id)
            getFormData(pincode, id)
                .then(formsaved => {
                    let formd = formdata
                    let applicant = {}
                    console.log('formsaved', formsaved)
                    if (formsaved?.office) {
                        for (const key in formsaved.office.verificationDetails) {
                            formd[key] = formsaved.office.verificationDetails[key]
                        }
                        for (const key in formsaved?.office?.applicantDetails) {
                            applicant[key] = formsaved?.office?.applicantDetails[key]
                        }
                    } else if (formsaved?.resident) {
                        for (const key in formsaved.resident.verificationDetails) {
                            formd[key] = formsaved.resident.verificationDetails[key]
                        }
                        for (const key in formsaved?.resident?.applicantDetails) {
                            applicant[key] = formsaved?.resident?.applicantDetails[key]
                        }
                    }
                    setApplicantDetails(applicant)
                    setFormdata(formd)
                    setRefresh(Math.random())
                    console.log('formd', formd)
                })

        }

    }, [id, pincode])

    // useEffect(() => {
    //     if (verification) {

    //         for (let [key, value] of verification.entries()) {
    //             allData1.push({ [key]: value })
    //         }
    //         setAlldata(allData1)
    //     }
    // }, [verification])
    // useEffect(() => {
    //     if (tpc) {
    //         for (let [key, value] of tpc.entries()) {
    //             allData1.push({ [key]: value })
    //         }
    //         setAlldata(allData1)
    //     }
    // }, [tpc])
    // useEffect(() => {
    //     if (applicantDetails) {
    //         for (let [key, value] of applicantDetails.entries()) {
    //             allData1.push({ [key]: value })
    //         }
    //         setAlldata(allData1)
    //         console.log('app', applicantDetails)
    //     }
    // }, [applicantDetails])

    // useEffect(() => {
    //     if (formdata) {
    //         // for (let [key, value] of formdata.entries()) {
    //         //     allData1.push({ [key]: value })
    //         // }
    //         // setAlldata(allData1)
    //         console.log('form', formdata)
    //     }
    // }, [formdata])
    // useEffect(() => {
    //     if (alldata) {
    //         console.log('alldata', alldata)
    //     }
    // }, [alldata])

    let addressConfirmed = [
        { name: 'addressConfirmed', value: '', label: 'None' },
        { name: 'addressConfirmed', value: 'yes', label: 'Yes' },
        { name: 'addressConfirmed', value: 'no', label: 'No' }
    ]

    let businessBoardSeen = [
        { name: 'businessBoardSeen', value: '', label: 'None' },
        { name: 'businessBoardSeen', value: 'yes', label: 'Yes' },
        { name: 'businessBoardSeen', value: 'no', label: 'No' }
    ]

    let personMet = [
        { name: 'personMet', value: '', label: 'None' },
        { name: 'personMet', value: 'yes', label: 'Yes' },
        { name: 'personMet', value: 'no', label: 'No' }
    ]

    let personMetNameDesignation = [
        { name: 'personMetNameDesignation', value: '', label: 'None' },
        { name: 'personMetNameDesignation', value: 'Director', label: 'Director' },
        { name: 'personMetNameDesignation', value: 'Partner', label: 'Partner' },
        { name: 'personMetNameDesignation', value: 'Proprietor', label: 'Proprietor' },
        { name: 'personMetNameDesignation', value: 'Family Member', label: 'Family Member' },
        { name: 'personMetNameDesignation', value: 'Staff', label: 'Staff' },
        { name: 'personMetNameDesignation', value: 'Gaurd', label: 'Gaurd' },
        { name: 'personMetNameDesignation', value: 'Neighbour', label: 'Neighbour' },
    ]

    let lessThanYrAtCurrentAddress = [
        { name: 'lessThanYrAtCurrentAddress', value: '', label: 'None' },
        { name: 'lessThanYrAtCurrentAddress', value: 'yes', label: 'Yes' },
        { name: 'lessThanYrAtCurrentAddress', value: 'no', label: 'No' }
    ]

    let natureofBusines = [
        { name: 'natureofBusines', value: '', label: 'None' },
        { name: 'natureofBusines', value: 'Service', label: 'Service' },
        { name: 'natureofBusines', value: 'Manufacturing', label: 'Manufacturing' },
        { name: 'natureofBusines', value: 'Trading', label: 'Trading' },
    ]

    let officeOwnership = [
        { name: 'officeOwnership', value: '', label: 'None' },
        { name: 'officeOwnership', value: 'Owned', label: 'Owned' },
        { name: 'officeOwnership', value: 'Rented', label: 'Rented' },
        { name: 'officeOwnership', value: 'Leased', label: 'Leased' },
    ]

    let typeofEntity = [
        { name: 'typeofEntity', value: '', label: 'None' },
        { name: 'typeofEntity', value: 'Proprietor', label: 'Proprietor' },
        { name: 'typeofEntity', value: 'Pvt Ltd', label: 'Pvt Ltd' },
        { name: 'typeofEntity', value: 'Public', label: 'Public' },
        { name: 'typeofEntity', value: 'Individual', label: 'Individual' },
        { name: 'typeofEntity', value: 'HUF', label: 'HUF' },
        { name: 'typeofEntity', value: 'Trust', label: 'Trust' },
        { name: 'typeofEntity', value: 'Partnership', label: 'Partnership' },
        { name: 'typeofEntity', value: 'LLP', label: 'LLP' },
        { name: 'typeofEntity', value: 'Co-op Society', label: 'Co-op Society' },
    ]

    return (
        <div>
            <Collapse title='Applicant Details' children={<ApplicantDetails applicantDetails={(data) => { setApplicantDetails(data) }} data={applicantDetails} />} />
            <Collapse title='Verification Details' >
                <h1>Verification Details</h1>

                {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                    <div>
                        <label>Visit Date</label>
                        <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Visited Time:</label>
                        <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Address Confirmed</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={addressConfirmed} />

                    </div>
                    <div>
                        <label>Business Board Seen</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={businessBoardSeen} />

                    </div>
                    <div>
                        <label>Business Board Seen</label>
                        <Input type="text" name='businessBoardSeenNote' value={formdata['businessBoardSeenNote']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>LandMark</label>
                        <Input type="text" name='landmark' value={formdata['landmark']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Person Met</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMet} />

                    </div>
                    <div>
                        <label>Person Met Name</label>
                        <Input type="text" name='personMetName' value={formdata['personMetName']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Person Met Designation</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMetNameDesignation} />

                    </div>
                    <div>
                        <label>No of Yrs in present Employment/Business & Total Yrs of Exp</label>
                        <Input type="text" name='totalYearsExp' value={formdata['totalYearsExp']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>No of Yrs At Current Address</label>
                        <Input type="text" name='totalYearsExpAtCurrentAddress' value={formdata['totalYearsExpAtCurrentAddress']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Less than 1 yr at Current Address</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={lessThanYrAtCurrentAddress} />

                    </div>
                    <div>
                        <label>Prev Address/ Prev Employment</label>
                        <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Nature of Business</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={natureofBusines} />

                    </div>
                    <div>
                        <label>Nature of Business Other</label>
                        <Input type="text" name='natureOfBusinessDetails' value={formdata['natureOfBusinessDetails']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Office Ownership</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={officeOwnership} />

                    </div>
                    <div>
                        <label>if Rented then Rent Amount</label>
                        <Input type="text" name='rentAmount' value={formdata['rentAmount']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Details(Income/Designation)</label>
                        <Input type="text" name='detailsIncomeDesignation' value={formdata['detailsIncomeDesignation']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Additional Income</label>
                        <Input type="text" name='additionalIncome' value={formdata['additionalIncome']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Source</label>
                        <Input type="text" name='source' value={formdata['source']} onChange={(e) => onHandleChange(e)} />
                    </div>
                    <div>
                        <label>Type of Entity</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={typeofEntity} />

                    </div>
                    <div className='d-none'>
                        <button type='submit' id='officeVerficationDetails' >Submit</button>
                    </div>
                </form>}
                <VerificationObserverOffice verification={(data) => setVerification(data)} getData={getData} />
                <Tpc tpc={(data) => setTpc(data)} getData={getData} />
                <Geolocation data={[]} />
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
export default connect(mapStateToProps)(Office)