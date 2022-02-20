import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, update, remove } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Input, Button } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import Tpc from './Tpc';
import VerificationObserverOffice from './VerificationObserverOffice';
import Geolocation from './Geolocation';
import DropDownComp from '../components/DropDownComp';
import Collapse from '../components/Collapse';
import { useParams, useLocation, Prompt, useHistory } from 'react-router-dom'
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';
// import "./form.css"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import PdfMake from './PdfMake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Office = ({ images, stampAndMap }) => {
    // let allData1 = []
    let { pincode, id } = useParams()
    const db = getDatabase();
    let data = useLocation()?.state
    const fdb = getFirestore();
    const history = useHistory();
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
        officeAddressProvided: '',
        mismatchAddress: '',
        visitedOfficeAddress: '',
        remarks: '',
        type: '',
        form: '',
        emailList: [],
    })
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const verificationObserverRef = useRef(null);
    const TPCRef = useRef(null);
    const ADref = useRef(null);

    const dataSplit = (alldata) => {
        let verfi = { verification: {}, applicant: {} }
        for (const key in alldata) {
            if (Object.hasOwnProperty.call(alldata, key)) {
                const element = alldata[key];
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
        if (dataSplit(combiner()).applicant.appid && dataSplit(combiner()).verification.visitDate) {
            setLoading(true)
            const path = `form/${pincode}/${id}/office`;
            let dataToSubmit = {
                applicantDetails: dataSplit(combiner()).applicant,
                verificationDetails: dataSplit(combiner()).verification
            }
            update(ref(db, path), dataToSubmit).then(res => {
                setLoading(false)
                alert('Forms Updated');
            }).catch(err => {
                setLoading(false)
                alert('Something went Wrong check and try again')
                console.log('Form update', err)
            })
            localStorage.setItem(id, JSON.stringify(formdata))
        }
        // console.log('handleSave', formdata)
    }
    const onHandleChange = (e) => {
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
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
        // if (localStorage.getItem(id)) {
        //     setFormdata(JSON.parse(localStorage.getItem(id)))
        // }
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
        setFormdata(formd)
        setRefresh(Math.random())
        console.log('formd', formd)
    }
    // Form data by id
    useEffect(() => {
        if (id) {
            setLoading(true);
            console.log(id)
            if (data) {
                setLoading(false)
                formFillRouter(data)
            } else {
                getFormData(pincode, id)
                    .then(formsaved => {
                        setLoading(false)
                        formFill(formsaved)
                        console.log('formsaved', formsaved)
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
        } else if (allData?.constructionOfOffice == 'Temporary') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.picturePoliticalLeader == 'yes') {
            orverallstatus = 'Not Recommended'

        } else if (allData?.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.addressConfirmed == 'no') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.localityofOffice == 'Slum') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.marketReputation == 'negative') {
            orverallstatus = 'Not Recommended'
        } else if (allData?.easeofLocating == 'Not Traceable') {
            orverallstatus = 'Not Recommended'
        } else {
            if (allData?.verificationObserver == 'Resi cum Office') {
                orverallstatus = 'Refer'
            } else if (allData?.verificationObserver == 'Shed') {
                orverallstatus = 'Refer'
            } else if (allData?.verificationObserver == 'Shared Office') {
                orverallstatus = 'Refer'
            } else if (allData?.businessBoardSeen == 'no') {
                orverallstatus = 'Refer'
            } else if (allData?.personMet == 'no') {
                orverallstatus = 'Refer'
            } else if (allData?.lessThanYrAtCurrentAddress == 'yes') {
                orverallstatus = 'Refer'
            } else if (allData?.businessActivityLevel == 'Low') {
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

    const combiner = () => {
        const VOdata = verificationObserverRef.current.getFormData();
        const Tpdata = TPCRef.current.getFormData();
        const Addata = ADref.current.getFormData();
        const alldata = { ...formdata, ...Addata, ...VOdata, ...Tpdata }
        alldata.finalFIRemarks = remarksfnc(alldata)
        if(!alldata.overallStatus){
            alldata.overallStatus = overallStatusCal(alldata)
        }
        alldata.newinitiationDate = alldata.initiationDate.split('GMT')[0];
        setFormdata(alldata);
        return alldata
    }
    const remarksfnc = (data) => {
        console.log('data', data)
        let overall = `${data.overallStatus ? data.overallStatus : 'NA'} | Date: ${data.visitDate ? data.visitDate : 'NA'} | ${data.visitedTime ? data.visitedTime : 'NA'} | Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : 'NA'} | Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : 'NA'} | Person Met: ${data.personMet ? data.personMet : 'NA'} | Person Met Name: ${data.personMetName ? data.personMetName : 'NA'} | Nature of Business Details: ${data.natureofBusines ? data.natureofBusines : 'NA'} |Business Board Seen: ${data.businessBoardSeen ? data.businessBoardSeen : 'NA'} | Office Ownership: ${data.officeOwnership ? data.officeOwnership : 'NA'} |Type of Office: ${data.verificationObserver ? data.verificationObserver : 'NA'} | Locality of Office: ${data.localityofOffice ? data.localityofOffice : 'NA'} | Business Activity Level: ${data.businessActivityLevel ? data.businessActivityLevel : 'NA'} |Ease of Locating: ${data.easeofLocating ? data.easeofLocating : 'NA'} |Distance from Station: ${data.distancefromStation ? data.distancefromStation : 'NA'} |Negative Area: ${data.negativeArea ? data.negativeArea : 'NA'} |TPC1: ${data.TPCName1 ? data.TPCName1 : 'NA'} - ${data.TPCStatus1 ? data.TPCStatus1 : 'NA'} - ${data.TPCRemark1 ? data.TPCRemark1 : 'NA'} |TPC2: ${data.TPCName2 ? data.TPCName2 : 'NA'} - ${data.TPCStatus2 ? data.TPCStatus2 : 'NA'} - ${data.TPCRemark2 ? data.TPCRemark2 : 'NA'} | ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : 'NA'}`;
        return overall
    }
    // PDF MAKE CONTENT

    const { stamp, map } = stampAndMap
    let assetSeenAtResident = formdata?.assetSeenAtResidence?.toString()
    let exteriorConditons = formdata?.exteriorConditions?.toString()
    let interiorConditions = formdata?.interiorConditions?.toString()
    const documentDefinition = {
        content: [
            {
                text: 'Office Report', color: 'purple', alignment: 'center', fontSize: 18,
                border: [true, true, true, true], fillColor: '#358fd4'
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#358fd4',
                                text: 'Office Report',
                                color: 'white',
                                alignment: 'center',
                                fontSize: 18,
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
                                text: 'Applicant Details',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Applicant Details', style: 'header',border: [true, true, true, true] },
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
                                text: formdata.product
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
                                text: 'Office Address Provided'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.officeAddressProvided
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Mismatch Address Details'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: 'ADD formdata HERE'
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
                                text: 'Mismatch Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.mismatchAddress
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Office Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.visitedOfficeAddress
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
                                text: 'Business Board Seen'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.businessBoardSeen
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
                                text: 'Landmark(Neareast)'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.landmark
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Board Seen Details'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.businessBoardSeenNote
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
                                text: 'Person Met Designation'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.personMetNameDesignation
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Yrs in present Employment/Business & Total Yrs of Exp'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.totalYearsExp
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
                                text: 'No of Yrs At Current Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.totalYearsExpAtCurrentAddress
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
                                text: 'Prev Address/ Prev Employment'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.lessThanYrAtCurrentAddressNote
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nature of Business'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.natureofBusines
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
                                text: 'Nature of Business (details)'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.natureOfBusinessDetails
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Entity'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.typeofEntity
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
                                text: 'Office Ownership'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.officeOwnership
                            },

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'if Rented then Rent Amount'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.rentAmount
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
                                text: 'Details(Income/Designation)'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.detailsIncomeDesignation
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Approx Area of Office (sq.ft)'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.approxAreaofOffice
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Any other Family member working/Business'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: formdata.otherWorkingBusiness
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
                                text: 'Additional Income'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.additionalIncome
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Source'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.source
                            },
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150],
            //     body: [
            //       [

            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Source'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: formdata.source
            //         },
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
                                text: "Verifier's Observation",
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Observer', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.verificationObserver
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Locality of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.localityofOffice
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
                                text: 'Construction Of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.constructionOfOffice
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Ease of Locating'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.easeofLocating
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
                                text: 'Business Activity Level'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.businessActivityLevel
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No. of Employees Seen in Office/ Business'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.noOfEmployeesWorkinginPremises
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
                                text: 'Stock Level'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.stockLevel
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Distance from Station(Km)'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.distanceFromRailwayStation
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Office Setup Detail'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: formdata.officeSetupDetails
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
                                text: 'Within Municipal Limits'
                            },
                            {

                                border: [true, true, true, true],
                                text: formdata.withinMunicipalLimits
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
                                text: 'Asset Seen At Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: assetSeenAtResident

                            },

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Interior Conditions'
                            },
                            {

                                border: [true, true, true, true],
                                text: interiorConditions
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
                                text: 'Exterior Condition'
                            },
                            {

                                border: [true, true, true, true],
                                text: exteriorConditons
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
                            }
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [150, 370],
            //     body: [
            //       [

            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Document Details'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: formdata.documentDetails
            //         }
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
                                text: 'Remark /Contact Numbe'
                            },

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
                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['2', formdata.TPCName2, formdata.TPCStatus2, formdata.TPCRemark2]
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
                                text: 'Overall Status'
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
                                text: formdata.finalFIAnyRemarks,
                                // pageBreak: 'before'
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
                                text: formdata.productSupervisor,
                                // pageBreak: 'before'
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
                                // pageBreak: 'after'
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
                                text: `Geo Tagging \n\n Latitude: ${formdata?.region?.latitude} \n Longitude: ${formdata?.region?.longitude} \n ${formdata.locName}`,
                                link: `http://maps.google.com/maps?q=${formdata?.region?.latitude} +, + ${formdata?.region?.longitude}`,
                                color: 'blue',
                                pageBreak: 'before'
                            },

                        ]
                    ]
                }
            },
            ...images,
            // {
            //   image: images,
            //   width: 200
            // },

        ],
        styles: {

            header: {
                fontSize: 14,
                bold: true,
                color: '#2984c4',
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

    }

    // PDF MAKE END
    return (
        <div className='mx-3'>
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
            {id && <>  <Collapse title='Verification Details'>
                <h4 className='my-2'>Verification Details</h4>
                <form className='d-flex justify-content-around flex-wrap' >
                    <div>
                        <label>Visit Date</label>
                        <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div>
                        <label>Visited Time:</label>
                        <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='mx-3'>
                        <label>Address Confirmed</label>
                        <DropDownComp id='office' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={addressConfirmed} />

                    </div>
                    <div className='mx-3'>
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
                </form>
                <VerificationObserverOffice data={verificationObserver} id={id} ref={verificationObserverRef} />
                {refresh && <Tpc data={verificationObserver} id={id} ref={TPCRef}/>}

            </Collapse>
                <Collapse title='Images and GeoLocation'>
                    <Geolocation data={verificationObserver} id={id} pincode={pincode} />
                </Collapse>
                {/* <PdfMake data={formdata} refresh={() => { setRefresh(Math.random()); }}  initiationDate={initiationDate} setpdfViewed={()=> setpdfViewed(true)} />
                 <hr />
                 <hr /> */}
                <div>
                    <button className='btn text-primary' onClick={() => { pdfMake.createPdf(documentDefinition).open() }}>View PDF</button>
                    <button className='btn text-primary' id='downloadpdf' onClick={() => { pdfMake.createPdf(documentDefinition).download() }}>Download PDF</button>
                </div>

            </>
            }
            {!loading ? <> <Button color='warning' onClick={handleSave}>Save</Button>
                <Button color='primary' onClick={handleSubmit}>Submit</Button>
            </> :
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
export default connect(mapStateToProps)(Office)