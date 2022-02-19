import React, { useEffect, useState, useRef } from 'react'
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import VerificationObserverResident from './VerificationObserverResident';
import Tpc from './Tpc';
import Geolocation from './Geolocation';
import Collapse from '../components/Collapse';
import { useParams, useLocation, Prompt, useHistory } from 'react-router-dom'
import { getDatabase, ref, remove, update } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';
import DropDownComp from '../components/DropDownComp';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import PdfMakeResident from './PdfMakeResident';
import stamp from '../assets/stamp.jpeg'


const Resident = (props) => {
    let { pincode, id } = useParams();
    const db = getDatabase();
    const fdb = getFirestore();
    let data = useLocation()?.state
    const history = useHistory();
    const [getData, setGetData] = useState(false)
    const [applicantDetails, setApplicantDetails] = useState({
        appid: '',
        srNo: '',
        month: '',
        initiationDate: '',
        customerName: '',
        bankNBFCname: '',
        product: '',
        loaction: '',
        pincode: '',
        contactNo: '',
        mobileNo: '',
        residenceAddressProvided: '',
        mismatchAddress: '',
        visitedresidentAddress: '',
        remarks: '',
        type: '',
        form: '',
        emailList: [],
    })
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
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [downloadPdf, setDownloadPdf] = useState(false);
    const [initiationDate, setInitiationDate] = useState('');
    const [images, setImages] = useState([]);
    const [stamp, setStamp] = useState('');
    const [map, setMap] = useState('')
    const verificationObserverRef = useRef(null);
    const TPCRef = useRef(null);
    const ADref = useRef(null);
    const [pdfViewed, setpdfViewed] = useState(false);
    const storage = getStorage();

    const onHandleChange = (e) => {
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
    }
    const dataSplit = (alldata) => {
        let verfi = { verification: {}, applicant: {} }
        for (const key in alldata) {
            if (Object.hasOwnProperty.call(alldata, key)) {
                const element = alldata[key];
                // SEPERATION FOR APPICANT AND VERIFICATION
                for (const key1 in applicantDetails) {
                    if (Object.hasOwnProperty.call(applicantDetails, key1)) {
                        const applicant = applicantDetails[key1];
                        if (key !== key1) {
                            verfi.verification[key] = element
                        } else {
                            verfi.applicant[key] = element
                        }
                    }
                }
            }
        }
        return verfi
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        let dataToSubmit = {
            applicantDetails: dataSplit(combiner()).applicant,
            verificationDetails: dataSplit(combiner()).verification,
        }
        Object.assign(dataToSubmit, mainouter)
        console.log('handleSubmit', dataToSubmit)
        addDoc(collection(fdb, "forms"), dataToSubmit).then(res => {
            // mail
            let emaillist = mainouter.emailList
            let appid = dataToSubmit.applicantDetails.appid
            let customername = dataToSubmit.applicantDetails.customerName
            setDownloadPdf(true)
            handleMail(emaillist, appid, customername)
            // remove form
            handleRemoveForm();

        }).catch(err => {
            alert('Something went wrong check console')
            console.log('form submission', err)
        })

        setLoading(false)
    }
    const handleRemoveForm = () => {
        let path = `form/${pincode}/${id}`
        remove(path).then(res => {
            alert('Form Removed from RT and Submitted to Cloud')
            history.location.push('/ActiveCases')
        })
    }
    const handleMail = (emaillist, appid, customername) => {
        let emails = emaillist.toString().replace(/,/g, ';')
        const yourMessage = `Dear Sir/Maam, 
    
        Please find verification report of captioned case. 
        
        Regards, 
        Team KreDT.`
        const subject = `${appid} - ${customername} - Residence`;
        document.location.href = `mailto:${emails}?subject=`
            + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(yourMessage);
    }
    const handleSave = () => {
        // getAllData();
        if (dataSplit(combiner()).applicant.appid && dataSplit(combiner()).verification.visitDate) {
            setLoading(true)
            // setRefresh(Math.random())
            const path = `form/${pincode}/${id}/resident`;
            let dataToSubmit = {
                applicantDetails: dataSplit(combiner()).applicant,
                verificationDetails: dataSplit(combiner()).verification
            }
            console.log('data', dataToSubmit)
            update(ref(db, path), dataToSubmit).then(res => {
                setLoading(false)
                alert('Forms Updated')
                if(pdfViewed) {
                    window.location.reload();
                }
            }).catch(err => {
                setLoading(false)
                alert('Something went Wrong check and try again')
                console.log('Form update', err)
            })
            localStorage.setItem(id, JSON.stringify(formdata))
        }
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
    // Form data by id
    const formFill = (formsaved) => {
        let formd = formdata
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
                    if (main === 'emailList') {
                        mainouter['emailList'] = formsaved.resident?.applicantDetails?.product.emailList
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
            console.log('formsaved', formsaved, outer)
            setApplicantDetails(formsaved?.resident?.applicantDetails)
            setVerificationOvserver(formsaved.resident.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        setFormdata(formd)
        // if (localStorage.getItem(id)) {
        //     setFormdata(JSON.parse(localStorage.getItem(id)))
        // }
        overallStatusCal(formd)
        setRefresh(Math.random())
        console.log('formd', formd)
    }
    const formFillRouter = (formsaved) => {
        let formd = formdata
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
        console.log('formsaved', formsaved, outer)
        if (formsaved) {
            for (const key in formsaved.verificationDetails) {
                let savedForm = formsaved.verificationDetails
                formd[key] = formsaved.verificationDetails[key]
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
            setVerificationOvserver(formsaved.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        setFormdata(formd)
        // if (localStorage.getItem(id)) {
        //     setFormdata(JSON.parse(localStorage.getItem(id)))
        // }
        overallStatusCal(formd)
        setRefresh(Math.random())
        console.log('formd', formd)
    }
    useEffect(() => {
        if (id) {
            setLoading(true);
            console.log(id)
            if (data) {
                formFillRouter(data)
                setLoading(false)
            } else {
                getFormData(pincode, id)
                    .then(formsaved => {
                        setLoading(false)
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
        let orverallstatus = ''
        if (allData?.mismatchAddress == 'yes') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.addressConfirmed == 'no') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.residenceStatus == 'Multi Tenants') {
            orverallstatus = 'Refer'
        } else if (allData?.residenceStatus == 'Paying Guest') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.residenceStatus == 'Friend Owned') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.residenceStatus == 'Lodging') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.constructionOfResidence == 'Temporary') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.picturePoliticalLeader == 'yes') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.localityOfAddress == 'Slum') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.typeOfHouse == 'Standing Chawl') {
            orverallstatus = 'Refer'
        } else if (allData?.typeOfHouse == 'Sitting Chawl') {
            orverallstatus = 'Refer'
        } else if (allData?.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.easeofLocating == 'Not Traceable') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.lessThanYrAtCurrentAddress == 'yes') {
            orverallstatus = 'Refer'
        } else {
            if (allData?.personMet == 'no') {
                orverallstatus = 'Refer'
            } else if (allData?.typeOfHouse == 'Multi Tenant House (Pagdi)') {
                orverallstatus = 'Refer'
            } else if (allData?.easeofLocating == 'Difficult to Trace') {
                orverallstatus = 'Refer'
            } else {
                orverallstatus = 'Recommended'

            }
        }
        console.log('orverallstatus', orverallstatus)
        return orverallstatus
    }
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
    const combiner = () => {
        const VOdata = verificationObserverRef.current.getFormData();
        const Tpdata = TPCRef.current.getFormData();
        const Addata = ADref.current.getFormData();
        const alldata = { ...formdata, ...Addata, ...VOdata, ...Tpdata }
        alldata.finalFIRemarks = remarksfnc(alldata)
        setInitiationDate(alldata.initiationDate.split('GMT')[0]);
        setFormdata(alldata);
        setRefresh(Math.random())
        return alldata
    }
    const remarksfnc = (data) => {
        let overall = `${data.overallStatus ? data.overallStatus : ''}; Date: ${data.visitDate ? data.visitDate : ''}; ${data.visitedTime ? data.visitedTime : ''}; Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : ''}; Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : ''}; Person Met: ${data.personMet ? data.personMet : ''}; Person Met Name: ${data.personMetName ? data.personMetName : ''}; Residence Status: ${data.residenceStatus ? data.residenceStatus : ''}; Customer Occupation: ${data.customerOccupation ? data.customerOccupation : ''}; Gate/Door color: ${data.gateDoorColor ? data.gateDoorColor : ''}; Locality of Address: ${data.localityOfAddress ? data.localityOfAddress : ''};  Type of House: ${data.typeOfHouse ? data.typeOfHouse : ''};Accessibility/Approachability: ${data.accessibility ? data.accessibility : ''};Ease of Locating: ${data.easeofLocating ? data.easeofLocating : ''}; Customers Attitude: ${data.customerAttitude ? data.customerAttitude : ''};Distance from Station: ${data.distancefromStation ? data.distancefromStation : ''}; Negative Area: ${data.negativeArea ? data.negativeArea : ''}; TPC1: ${data.TPCName1 ? data.TPCName1 : ''} - ${data.TPCStatus1 ? data.TPCStatus1 : ''} - ${data.tpc1Remarks ? data.tpc1Remarks : ''}; TPC2: ${data.TPCName2 ? data.TPCName2 : ''} - ${data.tpc2Status ? data.tpc2Status : ''} - ${data.tpc2Remarks ? data.tpc2Remarks : ''}; ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : ''}`;
        console.log('overall', overall)
        return overall
    }

    return (
        <div className='mx-2'>
            <Prompt
                message={(location, action) => {
                    if (action === 'POP') {
                        // On Going Back
                        // Need to end at submit also
                        clearWatcher()
                    }
                }}
            />
            <Collapse title='Applicant Details'>
                <ApplicantDetails data={applicantDetails} outerDetails={outerDetails} id={id} ref={ADref} />
            </Collapse>
            {id && <> <Collapse title='Verification Details'>
                <h4 className='my-2'>Verification Details</h4>
                <form className='d-flex justify-content-around flex-wrap' >
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
                    <div>
                        <label>Name and Relation with Applicant (Others)</label>
                        <Input type="text" name='personMetRealtionwithApplicantOther' value={formdata['personMetRealtionwithApplicantOther']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Staying in City (No. of Yrs)</label>
                        <Input type="text" name='totalYearsInCity' value={formdata['totalYearsInCity']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Less than 1 yr at Current Address</label>
                        {/* <Input type="text" name='lessThanYrAtCurrentAddress' value={formdata['lessThanYrAtCurrentAddress']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                        <DropDownComp id='resident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={lessThanYrAtCurrentAddress} />
                    </div>
                    <div className='mx-3'>
                        <label>Less than 1 yr at Current Address (Yes)</label>
                        <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
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
                </form>
                <VerificationObserverResident data={verificationObserver} id={id} ref={verificationObserverRef} />
               <Tpc data={verificationObserver} id={id} ref={TPCRef} />
            </Collapse>
                <Collapse title='Images and GeoLocation'>
                    <Geolocation data={verificationObserver} id={id} pincode={pincode} images={images} stamp={stamp}/>
                </Collapse>
                <PdfMakeResident data={formdata} refresh={() => { setRefresh(Math.random()) }} download={downloadPdf} initiationDate={initiationDate} setpdfViewed={()=> setpdfViewed(true)}/>

            </>
            }
            {!loading ? <> <Button className='mr-2' color='warning' onClick={handleSave}>Save</Button>
                <Button color='primary' onClick={handleSubmit}>Submit</Button>
            </>
                :
                <div className="spinner-grow text-warning" role="status">
                </div>
            }

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vendor: state.vendors,
        images: state.images
    }
}
export default connect(mapStateToProps)(Resident)