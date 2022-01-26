import React, { useState, useEffect } from 'react'
import { getDatabase, ref, update } from "firebase/database";
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import Tpc from './Tpc';
import VerificationObserverOffice from './VerificationObserverOffice';
import Geolocation from './Geolocation';
import DropDownComp from '../components/DropDownComp';
import Collapse from '../components/Collapse';
import { useParams, useLocation, Prompt } from 'react-router-dom'
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';
import PdfMake from './PdfMake';

const Office = (props) => {
    // let allData1 = []
    let { pincode, id } = useParams()
    const db = getDatabase();
    let data = useLocation()?.state
    console.log('data', data)
    // console.log('form', props)
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
    const [outerDetails, setOuterDetails] = useState({
        allocated: false,
        assigned: false,
        branch: '',
        claimed: false,
        claimedAt: '',
        completed: false,
        selected: '',
        submitted: false,
        tat: ''
    })
    const [mainouter, setMainouter] = useState({
        tat: new Date().toString(),
        tat1: Date.now(),
        emailList: [],
        branch: '',
        key: '',
        selected: ''
    })
    // const [verification, setVerification] = useState()
    const [verificationObserver, setVerificationOvserver] = useState();

    // const [tpc, setTpc] = useState()
    // const [formdata, setFormData] = useState()
    const [getData, setGetData] = useState(false)
    // const [alldata, setAlldata] = useState([])
    const [applicantDetails, setApplicantDetails] = useState()
    const [refresh, setRefresh] = useState(0)
    const dataSplit = () => {
        let verfi = { verification: {}, applicant: {} }
        for (const key in formdata) {
            if (Object.hasOwnProperty.call(formdata, key)) {
                const element = formdata[key];
                // SEPERATION FOR APPICANT AND VERIFICATION
                for (const key1 in applicantDetails) {
                    if (Object.hasOwnProperty.call(applicantDetails, key1)) {
                        const applicant = applicantDetails[key1];
                        if (key == key1) {
                            verfi.applicant[key] = element
                        } else {
                            verfi.verification[key] = element
                        }
                    }
                }
            }
        }
        return verfi
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // let verification = 
        let dataToSubmit = {
            applicantDetails: dataSplit().applicant,
            verificationDetails: dataSplit().verification,
        }
        Object.assign(dataToSubmit, mainouter)
        console.log('handleSubmit', dataToSubmit )
    }
    const handleSave = () => {
        getAllData()
        localStorage.setItem(id, JSON.stringify(formdata))
        // console.log('handleSave', formdata)
    }
    const getAllData = () => {
        setGetData(true)
        setTimeout(() => {
            setGetData(false)
        }, [100])

    }
    const onHandleChange = (e) => {
        // name
        let form = formdata
        // console.log(e)
        form[e.name] = e.value
        // console.log(e, form[e.name] )
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    const formFill = (formsaved) => {
        let formd = formdata
        console.log('formsaved', formsaved)
        let outer = outerDetails
        let mainout = mainouter
        for (const key in formsaved) {
            if (Object.hasOwnProperty.call(formsaved, key)) {
                const element = formsaved[key];
                for (const outerkeys in outer) {
                    if (outerkeys === key) {
                        outer[key] = element
                    }
                    if (key === 'agenDetails') {
                        outerDetails.agenDetails = element
                    }
                }
                // for firestore db
                for (const main in mainouter) {
                   if (main === key) {
                       mainouter[key] = element
                   }
                   if (main === 'emailList') {
                    mainouter['emailList'] = formsaved.office?.applicantDetails?.product.emailList
                   }
                   if (main === 'selected') {
                       mainouter['selected'] = formsaved?.selected
                   }
                   if (main === 'key') {
                       mainouter['key'] = id
                   }
                }
            }
        }
        if (formsaved?.office) {
            // for (const key in formsaved?.office?.applicantDetails) {
            //     applicant[key] = formsaved?.office?.applicantDetails[key]
            // }
            for (const key in formsaved.office.verificationDetails) {
                let savedForm = formsaved.office.verificationDetails
                formd[key] = savedForm[key]
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
            console.log('applicant', formsaved?.office?.applicantDetails)
            setApplicantDetails(formsaved?.office?.applicantDetails)
            setVerificationOvserver(formsaved?.office?.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        setFormdata(formd)
        if (localStorage.getItem(id)) {
            setFormdata(JSON.parse(localStorage.getItem(id)))
        }
        overallStatusCal(formd)
        setRefresh(Math.random())
        console.log('formd', formd)
    }
    const formFillRouter = (formsaved) => {
        let formd = formdata
        console.log('formsaved router', formsaved)
        let outer = outerDetails
        let mainout = mainouter
        for (const key in formsaved) {
            if (Object.hasOwnProperty.call(formsaved, key)) {
                const element = formsaved[key];
                for (const outerkeys in outer) {
                    if (outerkeys === key) {
                        outer[key] = element
                    }
                    if (key === 'agenDetails') {
                        outerDetails.agenDetails = element
                    }
                }
                for (const main in mainouter) {
                   if (main === key) {
                       mainouter[key] = element
                   }
                }
            }
        }
        if (formsaved) {
            // for (const key in formsaved?.office?.applicantDetails) {
            //     applicant[key] = formsaved?.office?.applicantDetails[key]
            // }
            for (const key in formsaved.verificationDetails) {
                let savedForm = formsaved.verificationDetails
                formd[key] = savedForm[key]
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
            console.log('applicant', formsaved?.applicantDetails)
            setApplicantDetails(formsaved?.applicantDetails)
            setVerificationOvserver(formsaved?.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        overallStatusCal(formd)
        setFormdata(formd)
        setRefresh(Math.random())
        console.log('formd', formd)
    }
    // Form data by id
    useEffect(() => {
        if (id) {
            console.log(id)
            if (data) {
                formFillRouter(data)
            } else {
                getFormData(pincode, id)
                    .then(formsaved => {
                       formFill(formsaved)
                       update(ref(db, `form/${pincode}/${id}`), {
                           watcherEmail: getCookie('email'),
                       });
                    })
            }
        }

    }, [id, pincode])
    const clearWatcher = () => {
        update(ref(db, `form/${pincode}/${id}`), {
            watcherEmail: '',
        });
    }

    const overallStatusCal = (allData) => {
        console.log('alldata', allData)
        let orverallstatus = ''
        if (allData.mismatchAddress == 'yes') {
            orverallstatus = 'Not Recommended'
        } else if (allData.constructionOfOffice == 'Temporary') {
            orverallstatus = 'Not Recommended'
        } else if (allData.picturePoliticalLeader == 'yes') {
            orverallstatus = 'Not Recommended'

        } else if (allData.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData.addressConfirmed == 'no') {
            orverallstatus = 'Not Recommended'
        } else if (allData.localityofOffice == 'Slum') {
            orverallstatus = 'Not Recommended'
        } else if (allData.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData.easeofLocating == 'Not Traceable') {
            orverallstatus = 'Not Recommended'
        } else {
            if (allData.verificationObserver == 'Resi cum Office') {
                orverallstatus = 'Refer'
            } else if (allData.verificationObserver == 'Shed') {
                orverallstatus = 'Refer'
            } else if (allData.verificationObserver == 'Shared Office') {
                orverallstatus = 'Refer'
            } else if (allData.businessBoardSeen == 'no') {
                orverallstatus = 'Refer'
            } else if (allData.personMet == 'no') {
                orverallstatus = 'Refer'
            } else if (allData.lessThanYrAtCurrentAddress == 'yes') {
                orverallstatus = 'Refer'
            } else if (allData.businessActivityLevel == 'Low') {
                orverallstatus = 'Refer'
            } else {
                orverallstatus = 'Recommended'
            }
        }
        console.log('orverallstatus', orverallstatus)
        return orverallstatus

    }
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
    const combiner = (data) => {
        let alldata = formdata
        let combined = Object.assign(alldata, data);
        setFormdata(combined)
    }
    return (
        <div>
            <Prompt
                message={(location, action) => {
                    if (action === 'POP') {
                        // On Going Back
                        // Need to end at submit also
                        clearWatcher()
                    }
                }}
            />
            {(refresh > 0 || true) && <PdfMake data={formdata} refresh={() => { setRefresh(Math.random()); }} />}
            <Collapse title='Applicant Details'>
                <ApplicantDetails
                    applicantDetail={(data) => {
                        combiner(data)
                    }} data={applicantDetails} getData={getData} outerDetails={outerDetails} id={id} />
            </Collapse>
          {id && <>  <Collapse title='Verification Details'>
                <h1>Verification Details</h1>
                {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' >
                    <div>
                        <label>Visit Date</label>
                        <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Visited Time:</label>
                        <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e) => onHandleChange(e.currentTarget)} />
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
                        <Input type="text" name='businessBoardSeenNote' value={formdata['businessBoardSeenNote']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>LandMark</label>
                        <Input type="text" name='landmark' value={formdata['landmark']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Person Met</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMet} />

                    </div>
                    <div>
                        <label>Person Met Name</label>
                        <Input type="text" name='personMetName' value={formdata['personMetName']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Person Met Designation</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMetNameDesignation} />

                    </div>
                    <div>
                        <label>No of Yrs in present Employment/Business & Total Yrs of Exp</label>
                        <Input type="text" name='totalYearsExp' value={formdata['totalYearsExp']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>No of Yrs At Current Address</label>
                        <Input type="text" name='totalYearsExpAtCurrentAddress' value={formdata['totalYearsExpAtCurrentAddress']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Less than 1 yr at Current Address</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={lessThanYrAtCurrentAddress} />

                    </div>
                    <div>
                        <label>Prev Address/ Prev Employment</label>
                        <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Nature of Business</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={natureofBusines} />

                    </div>
                    <div>
                        <label>Nature of Business Other</label>
                        <Input type="text" name='natureOfBusinessDetails' value={formdata['natureOfBusinessDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Office Ownership</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={officeOwnership} />

                    </div>
                    <div>
                        <label>if Rented then Rent Amount</label>
                        <Input type="text" name='rentAmount' value={formdata['rentAmount']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Details(Income/Designation)</label>
                        <Input type="text" name='detailsIncomeDesignation' value={formdata['detailsIncomeDesignation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='d-flex'>
                        <div className='pe-4'>
                            <label>Additional Income</label>
                            <Input type="text" name='additionalIncome' value={formdata['additionalIncome']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                        <div className='pe-4'>
                            <label>Source</label>
                            <Input type="text" name='source' value={formdata['source']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                        <div>
                            <label>Type of Entity</label>
                            <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={typeofEntity} />

                        </div>
                    </div>
                </form>}
                <VerificationObserverOffice verification={(data) => {
                    combiner(data)
                }} getData={getData} data={verificationObserver} id={id} />
                <Tpc tpc={(data) => {
                    combiner(data)
                }} getData={getData} data={verificationObserver} id={id} overallstatus={overallStatusCal}/>
            </Collapse>
            <Collapse title='Images and GeoLocation'>
                <Geolocation data={verificationObserver} id={id} pincode={pincode} />
            </Collapse>
            <Button color='warning' onClick={handleSave}>Save</Button>
            <Button color='primary' onClick={handleSubmit}>Submit</Button>
            </>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors,
        images: state.images
    }
}
export default connect(mapStateToProps)(Office)