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
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
// import PdfMakeResident from './PdfMakeResident';
// import stamp from '../assets/stamp.jpeg'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import PdfMake from './PdfMake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import "./form.css"


const Resident = ({ images, stampAndMap }) => {
    let { pincode, id } = useParams();
    const db = getDatabase();
    const fdb = getFirestore();
    let data = useLocation()?.state
    const history = useHistory();
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
        totalYearsAtCurrentAddress: ''
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
    const verificationObserverRef = useRef(null);
    const TPCRef = useRef(null);
    const ADref = useRef(null);

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
        pdfMake.createPdf(documentDefinition).download();
        console.log('handleSubmit', dataToSubmit)
        addDoc(collection(fdb, "forms"), dataToSubmit).then(res => {
            // mail
            let emaillist = mainouter.emailList
            let appid = dataToSubmit.applicantDetails.appid
            let customername = dataToSubmit.applicantDetails.customerName
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
        // setInitiationDate(alldata.initiationDate.split('GMT')[0]);
        alldata.newinitiationDate = alldata.initiationDate.split('GMT')[0];
        if(!alldata.overallStatus){
            alldata.overallStatus = overallStatusCal(alldata)
        }
        setFormdata(alldata);
        setRefresh(Math.random())
        return alldata
    }
    const remarksfnc = (data) => {
        console.log('data', data)
        let overall = `${data.overallStatus ? data.overallStatus : 'NA'} |  Date: ${data.visitDate ? data.visitDate : 'NA'} |  ${data.visitedTime ? data.visitedTime : 'NA'} |  Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : 'NA'} |  Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : 'NA'} |  Person Met: ${data.personMet ? data.personMet : 'NA'} |  Person Met Name: ${data.personMetName ? data.personMetName : 'NA'} |  Residence Status: ${data.residenceStatus ? data.residenceStatus : 'NA'} |  Customer Occupation: ${data.customerOccupation ? data.customerOccupation : 'NA'} |  Gate/Door color: ${data.gateDoorColor ? data.gateDoorColor : 'NA'} |  Locality of Address: ${data.localityOfAddress ? data.localityOfAddress : 'NA'} |   Type of House: ${data.typeOfHouse ? data.typeOfHouse : 'NA'} | Accessibility/Approachability: ${data.accessibility ? data.accessibility : 'NA'} | Ease of Locating: ${data.easeofLocating ? data.easeofLocating : 'NA'} |  Customers Attitude: ${data.customerAttitude ? data.customerAttitude : 'NA'} | Distance from Station: ${data.distancefromStation ? data.distancefromStation : 'NA'} |  Negative Area: ${data.negativeArea ? data.negativeArea : 'NA'} | TPC1: ${data.TPCName1 ? data.TPCName1 : 'NA'} - ${data.TPCStatus1 ? data.TPCStatus1 : 'NA'} - ${data.TPCRemark1 ? data.TPCRemark1 : 'NA'} | TPC2: ${data.TPCName2 ? data.TPCName2 : 'NA'} - ${data.TPCStatus2 ? data.TPCStatus2 : 'NA'} - ${data.TPCRemark2 ? data.TPCRemark2 : 'NA'} | ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : 'NA'}`;
        console.log('overall', overall)
        return overall
    }
    // PDF MAKE CONTENT

    const {stamp, map} = stampAndMap
    let assetSeenAtResident = formdata?.assetSeenAtResidence?.toString()
    let exteriorConditons = formdata?.exteriorConditions?.toString()
    let interiorConditions = formdata?.interiorConditions?.toString()
    const documentDefinition = {
        content: [
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#358fd4',
                                text: 'Residence Verification Report',
                                color: 'white',
                                alignment: 'center',
                                fontSize: 18,
                            },

                        ],

                    ]
                }
            },
            // { text: 'Residential Report', color: 'purple', alignment: 'center', 
            // fontSize: 18,border: [true, true, true, true], fillColor: '#ccc' },
            // { text: 'Applicant Details', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Applicant Details',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'App.Id/Lead id'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.appid
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Sr.No'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.srNo
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Month'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.month
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Initiation Date'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.newinitiationDate
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.customerName
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Bank/ NBFC name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata?.bankNBFCname?.clientName
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata?.product?.productName
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Location'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.loaction
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Pincode'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.pincode
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Contact No'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.contactNo
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mobile No'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.mobileNo
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Residence Address Provided'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.residenceAddressProvided
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mismatch Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.mismatchAddress
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.visitedresidentAddress
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Distance from Station(Km)'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: formdata.distancefromNeareastStation
                            // },
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150, 100, 150],
            //     body: [
            //       [


            //         // {
            //         //   
            //         //   border: [true, true, true, true],
            //         //   fillColor: '#ccc',
            //         //   text: 'Nearest Landmark'
            //         // },
            //         // {
            //         //   
            //         //   border: [true, true, true, true],
            //         //   text: formdata.nearestLandMark
            //         // },


            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Verification Report',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Report', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visit Date'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.visitDate
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Time'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.visitedTime
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Address Confirmed'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.addressConfirmed
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nearest Landmark'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.landmark
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.personMet
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.personMetName
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Age'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.personMetAge
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Relationship with Applicant'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.personMetRealtionwithApplicant
                            },
                        ],
                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Name and Relationship with Applicant (Others)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.personMetRealtionwithApplicantOther
                            },

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Staying in City (No. of Yrs)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.totalYearsInCity
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Staying at Current Address (No. of Yrs)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.totalYearsAtCurrentAddress
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Less than 1 yr at Current Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.lessThanYrAtCurrentAddress
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Less than 1 yr at Current Address (Prev.Address)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.lessThanYrAtCurrentAddressNote
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Residence Status'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.residenceStatus
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Occupation'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.customerOccupation
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Qualification'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.qualification
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Marital Status'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.marrried
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Gate/Door color & Bldg Color'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.gateDoorColor
                            },


                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Family Members'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.noOfFamilyMembers
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Earning Members'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.earningMembers
                            },
                            // GAte


                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Dependents'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.dependents
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Children'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.children
                            },
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.officeName
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Designation'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.designation
                            },
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [


                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.officeAddress
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Doc Verified'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.docVerified
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Document Details'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.documentDetails
                            },


                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: "Verifier's Observation",
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Observer', style: 'header' },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150, 100, 150],
            //     body: [
            //       [

            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: formdata.customerNameVerifiedFrom.toString()
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From Others'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: formdata.customerNameVerifiedFromOther
            //         },
            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Locality of Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.localityOfAddress
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of House'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.typeOfHouse
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of House Others'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.typeOfHouseOthers
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Construction Of Residence'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.constructionOfResidence
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Accessibility/Approachibility'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.accessibility
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Area of Residence (sq.ft)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.areaofResidence
                            },

                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [525],
            //     body: [
            //       [

            //         {
            //           border: [true, true, true, true],
            //           fillColor: '#88c0eb',
            //           text: "Verifier's Observation",
            //           fontSize: 14,

            //         },

            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [100, 425],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Ease of Locating'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.easeofLocating
                            }

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Attitude'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.customerAttitude
                            },

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Asset Seen At Residence'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: assetSeenAtResident
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Interior Conditions'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: interiorConditions
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Exterior Condition'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: exteriorConditons

                            },

                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Vehical Owned'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: formdata.vehicalOwned
                            // },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Distance from Station(Km)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.distancefromStation
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Negative Area'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.negativeArea
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Picture Political Leader'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.picturePoliticalLeader
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Political Leader Details'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.politicalLeaderDetails
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'TPC Confirmation',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'TPC Confirmation', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [10, 130, 100, 260],

                    body: [
                        [
                            {
                                fillColor: '#ccc',
                                text: '#'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Name'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Remark /Contact Number'
                            },
                            // {
                            //   fillColor: '#ccc',
                            //   text: 'Contact Number'
                            // },
                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['1', formdata.TPCName1, formdata.TPCStatus1, formdata.TPCRemark1]
                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [10, 130, 100, 260],

                    body: [
                        [
                            {
                                fillColor: '#ccc',
                                text: '#'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Name'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Remark /Contact Number'
                            },
                            // {
                            //   fillColor: '#ccc',
                            //   text: 'Contact Number'
                            // },
                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['2', formdata.TPCName2, formdata.TPCStatus2, formdata.TPCRemark2]
                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [10, 130, 100, 150, 100],

            //     body: [
            //       [
            //         {
            //           fillColor: '#ccc',
            //           text: '#'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Name'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Status'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Remark'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Contact Number'
            //         },
            //       ],
            //       // ['#', 'Name', 'Status',
            //       //   'Remark', 'Contact Number',
            //       // ],
            //       ['3', formdata.TPCName3, formdata.TPCStatus3, formdata.TPCRemark3,
            //         formdata.TPCContactnumber3]
            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Market Reputation/Dedup Check'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.marketReputation
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TPCRemarks
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'TVR Comments',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'TVR Comments', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Number'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRNumber
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Designation'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRDesignation
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRStatus
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRBusinessName
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of years in Business'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRNoofyearsinBusiness
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.TVRRemarks
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Final Status',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Final FI Status', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'OverAll Status'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.overallStatus
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Agency name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.finalFIAgencyname
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Standard Remark'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.finalFIAnyRemarks
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                border: [true, true, true, true],
                                text: formdata.finalFIRemarks
                            },

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Company Stamp'
                            },
                            {
                                
                                border: [true, true, true, true],
                                image: stamp,
                                width: 150,
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product Supervisor'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.productSupervisor
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verifier Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: formdata.finalFIVerifierName
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {

                    widths: [100, 420],
                    body: [
                        [
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verification Note'
                            },
                            {
                                
                                fontSize: 9,
                                border: [true, true, true, true],
                                text: 'The Observation/photograph provided in the report is purely based on photograph taken in approximate vincity of the address provided. We, as a process, do not check or collect any documentary evidence to check the authenticity of the information gathered. Neither we certify the correctness of observation nor the photograph is admissible as an evidence. Photograph is additional information provided by us as customary practice without any corresponding liabilities. We do takecare of tagging photos/observation to the appropriate case/applicant, however, considering visual transmission of data, erros can not be eliminated.  ',
                                // pageBreak: 'before'
                            },



                        ],


                    ]
                }
            },
            {
                style: 'table',
                margin: [0, 20],
                table: {

                    widths: [250, 270],
                    body: [
                        [
                            {
                                image: map,
                                width: 200,
                                pageBreak: 'before'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: `Geo Tagging \n\n Latitude: ${formdata?.region?.latitude} \n Longitude: ${formdata?.region?.longitude} \n ${formdata?.locName}`,
                                link: `http://maps.google.com/maps?q=${formdata?.region?.latitude} +, + ${formdata?.region?.longitude}`,
                                color: 'blue',
                                pageBreak: 'before'
                            },

                        ]
                    ]
                }
            },
            ...images,

        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                color: '#2984c4'
                // text-align:center
            },
            table: {
                fontSize: 9
            },
            mainheader: {
                fontSize: 16,
                fillColor: '#bf9728',
                color: 'black'
            }

        }
    };

    // PDF MAKE END

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
                        <label>Staying at Current Address (No. of Yrs)</label>
                        <Input type="text" name='totalYearsAtCurrentAddress' value={formdata["totalYearsAtCurrentAddress"]} onChange={(e) => onHandleChange(e.currentTarget)}/>
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
                    <Geolocation data={verificationObserver} id={id} pincode={pincode}/>
                </Collapse>
                {/* <PdfMakeResident data={formdata} refresh={() => { setRefresh(Math.random()) }} download={downloadPdf} initiationDate={initiationDate} setpdfViewed={()=> setpdfViewed(true)}/> */}
                <div>
                    <button className='btn text-primary' onClick={() => { pdfMake.createPdf(documentDefinition).open() }}>View PDF</button>
                    <button className='btn text-primary' id='downloadpdf' onClick={() => { pdfMake.createPdf(documentDefinition).download() }}>Download PDF</button>
                </div>
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
        images: state.images,
        stampAndMap: state.stampAndMap
    }
}
export default connect(mapStateToProps)(Resident)