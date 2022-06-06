import React, { useEffect, useState, useRef } from 'react'
import { Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import VerificationObserverResident from './VerificationObserverResident';
import Tpc from './Tpc';
import Geolocation from './Geolocation';
import Collapse from '../components/Collapse';
import { useParams, useLocation, Prompt, useHistory } from 'react-router-dom'
import { getDatabase, ref, remove, update, onValue, get, child } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getFormData } from '../utils/singleForm'
import { connect } from 'react-redux';
import DropDownComp from '../components/DropDownComp';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import stampImg from '../assets/stamp.jpeg';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Alert from "../components/Alert"
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Resident = () => {
    let { pincode, id } = useParams();
    const db = getDatabase();
    const fdb = getFirestore();
    let data = useLocation()?.state
    const history = useHistory();
    const storage = getStorage();

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
    const [images, setImages] = useState([]);
    const [images64, setImages64] = useState([]);
    const [stamp, setStamp] = useState();
    const [map, setMap] = useState();
    const [addressConfirmedDropdown, setaddressConfirmedDropdown] = useState('')
    const addressConfirmedToggle = () => {
        setaddressConfirmedDropdown(!addressConfirmedDropdown);
    }
    const [alertMessage, setAlertMessage] = useState('');
    const [refetch, setRefetch] = useState(false);

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
        pdfMake.createPdf(pdffnc()).download(dataToSubmit.applicantDetails.customerName.replace(/ /g, '').replace(/[^a-zA-Z ]/g, ""));
        console.log('handleSubmit', dataToSubmit)
        addDoc(collection(fdb, "forms"), dataToSubmit).then(res => {
            console.log('res', res)
        })
        // addDoc(collection(fdb, "forms"), dataToSubmit)
        // .then(res => {

        // }).catch(err => {
        //     setAlertMessage('Something went wrong check console')
        //     console.log('form submission', err)
        // })
        // mail
        handleMail()
        // remove form
        handleRemoveForm();

        setLoading(false)
    }
    const handleRemoveForm = () => {
        let path = `form/${pincode}/${id}`
        const remref = ref(db, path);
        remove(remref).then(res => {
            setAlertMessage('Form Removed from RT and Submitted to Cloud')
            history.push('/ActiveCases')
        })
    }
    const handleAgentCount = () => {
        if (outerDetails?.agenDetails?.id) {

            let path = `agents/${outerDetails?.agenDetails?.id}`
            const agentPath = ref(getDatabase());
            // const agentPath = ref(db, path);
            let count = 0
            let month = new Date().getMonth()
            get(child(agentPath, path)).then((snapshot) => {
                const x = snapshot.val();
                if (x) {
                    if (x.casesSubmitted || x.casesSubmitted === 0) {
                        count = x.casesSubmitted + 1
                        if (x.currentMonth !== month) {
                            update(agentPath, { casesSubmitted: 1, currentMonth: month })
                        } else {
                            update(agentPath, { casesSubmitted: count, currentMonth: month })
                        }
                    } else {
                        if (x.currentMonth !== month) {
                            update(agentPath, { casesSubmitted: 1, currentMonth: month })
                        } else {
                            update(agentPath, { casesSubmitted: count, currentMonth: month })
                        }
                    }
                }
                console.log('handleAgentCount', x)

            })
            // onValue(agentPath, (snapshot) => {
            // })
        }

    }
    const handleMail = () => {
        let email = applicantDetails.product.emailList
        let emailstring = []
        for (let index = 0; index < email.length; index++) {
            const element = email[index];
            emailstring.push(element.email + '; ')
        }
        let refined = JSON.stringify(emailstring).replace(/["',]/g, "")
        let allemails = refined.replace(/[[\]]/g, '')
        const yourMessage = `Dear Sir/Maam, 
    
        Please find verification report of captioned case. 
        
        Regards, 
        Team KreDT.`
        const subject = `${applicantDetails.appid} - ${applicantDetails.customerName} - Residence`;
        document.location.href = `mailto:${allemails}?subject=`
            + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(yourMessage);
    }
    const handleSave = () => {
        if (dataSplit(combiner()).applicant.appid && dataSplit(combiner()).verification.visitDate) {
            setLoading(true)
            const path = `form/${pincode}/${id}/resident`;
            let dataToSubmit = {
                applicantDetails: dataSplit(combiner()).applicant,
                verificationDetails: dataSplit(combiner()).verification
            }
            dataToSubmit.applicantDetails.mismatchAddress = combiner().mismatchAddress
            console.log('data', dataToSubmit)
            update(ref(db, path), dataToSubmit).then(res => {
                setLoading(false)
                setAlertMessage('Forms Updated')
            }).catch(err => {
                setLoading(false)
                setAlertMessage('Something went Wrong check and try again')
                console.log('Form update', err)
            })
            // localStorage.setItem(id, JSON.stringify(formdata))
        }
    }
    const rotateBase64Image = (base64data) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = base64data;
        return new Promise(resolve => {
            image.onload = () => {
                ctx.translate(image.width, image.height);
                ctx.rotate(45 * Math.PI / 180);
                ctx.drawImage(image, 0, 0);
                resolve(canvas.toDataURL())
            };
        })
    }
    const toDataURL = (url, callback) => {
        let xhRequest = new XMLHttpRequest();
        xhRequest.onload = function () {
            let reader = new FileReader();
            reader.onloadend = async function () {
                //    await rotateBase64Image(reader.result, 'callback')
                // callback();
                callback(reader.result);
            }
            reader.readAsDataURL(xhRequest.response);
        };
        xhRequest.open('GET', url);
        xhRequest.responseType = 'blob';
        xhRequest.send();
    }
    const viewImages = () => {
        const filePath = `forms/${pincode}/${id}/images`
        const storageRef1 = storageRef(storage, filePath);
        listAll(storageRef1)
            .then((res) => {
                let temp = []
                res.items.map((itemRef) => {
                    let imageRef = storageRef(storage, itemRef._location.path_)
                    getDownloadURL(imageRef).then((x) => {
                        temp.push(x)
                        allImagestoBase64(temp)
                        setImages(temp)
                        setRefresh(Math.random())
                    }).catch(err => {
                        console.log('err', err)
                    })

                    // All the items under listRef.
                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
        stampAndMapBase64()

    }
    const stampAndMapBase64 = () => {
        if (stampImg) {
            toDataURL(stampImg, (dataUrl) => {
                setStamp(dataUrl);
            });
            toDataURL(`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&markers=${formdata?.region?.latitude},${formdata?.region?.longitude}&key=AIzaSyBPoGWXtGubXKV44J4D4ZsBtvY-lIBjEMU&zoom=16`, (dataUrl) => {
                setMap(dataUrl);
            });
        }
    }
    const getBase64ImageFromURL = (url) => {
        return new Promise((resolve, reject) => {
            var img = new Image(500, 500);
            img.setAttribute("crossOrigin", "anonymous");
            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.scale(0.39, 0.39)
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                resolve(dataURL);
            };
            img.onerror = error => {
                reject(error);
            };
            img.src = url;
        });
    }
    const allImagestoBase64 = async (temp) => {
        let dataImages = []
        for (let index = 0; index < temp.length; index++) {
            const item = temp[index];
            // toDataURL(item, (dataUrl) => {
            // rotateBase64Image(dataUrl,(rotated) => {
            dataImages.push({
                style: 'table',
                table: {
                    widths: [500],
                    body: [
                        [
                            {
                                image: await getBase64ImageFromURL(item),
                                // width: 500,
                                // height:600,
                                // fit: [500, 1200],
                                link: item
                            },
                        ]
                    ]
                }
            }
            );
            setImages64(dataImages);
            setRefresh(Math.random())

            // })
            // })
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
        // console.log({formsaved})
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
            if (formsaved.selected && formsaved.resident && formsaved.resident.verificationDetails) {
                formsaved.resident.verificationDetails.selected = formsaved.selected
            }
            setApplicantDetails(formsaved?.resident?.applicantDetails)
            setVerificationOvserver(formsaved.resident.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        viewImages()
        console.log('formd', formd, outer)
        setFormdata(formd)
        setRefresh(Math.random())
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
                        outer.agenDetails = element
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
            setApplicantDetails(formsaved?.applicantDetails)
            setVerificationOvserver(formsaved.verificationDetails)
            setOuterDetails(outer)
            setMainouter(mainout)
        }
        viewImages()
        setFormdata(formd)
        console.log('old', formd)
        // if (localStorage.getItem(id)) {
        //     setFormdata(JSON.parse(localStorage.getItem(id)))
        // }
        setRefresh(Math.random())
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
        if (applicantDetails.bankNBFCname.clientName === 'Indiabulls Housing Finance Ltd') {
            let orverallstatus = ''
    
            if (allData?.mismatchAddress == 'yes') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.addressConfirmed == 'no') {
                orverallstatus = 'CNV'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Multi Tenants') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Paying Guest') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Friend Owned') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Lodging') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.constructionOfResidence == 'Temporary') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.picturePoliticalLeader == 'yes') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.marketReputation == 'negative') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.localityOfAddress == 'Slum') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.typeOfHouse == 'Standing Chawl') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.typeOfHouse == 'Sitting Chawl') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.marketReputation == 'negative') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.easeofLocating == 'Not Traceable') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData?.lessThanYrAtCurrentAddress == 'yes') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData.negativeArea == 'Slum Area') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData.negativeArea == 'Community Dominated / Slum Area') {
                orverallstatus = 'Negative'
                console.log('logic', orverallstatus);
            } else if (allData.TPCStatus1 == 'negative' || allData.TPCStatus2 == 'negative') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else {
                if (allData?.personMet == 'no') {
                    orverallstatus = 'Refer'
                } else if (allData?.easeofLocating == 'Difficult to Trace') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Community Dominated Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Sitting Chawl/Standing Chawl') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'High Risk Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Community Dominated/Sitting Chawl/Standing Chawl Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                }
                else {
                    orverallstatus = 'Positive'
    
                }
            }
            return orverallstatus
            
        } else {
            let orverallstatus = ''
    
            if (allData?.mismatchAddress == 'yes') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.addressConfirmed == 'no') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Multi Tenants') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Paying Guest') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Friend Owned') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.residenceStatus == 'Lodging') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.constructionOfResidence == 'Temporary') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.picturePoliticalLeader == 'yes') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.marketReputation == 'negative') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.localityOfAddress == 'Slum') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.typeOfHouse == 'Standing Chawl') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.typeOfHouse == 'Sitting Chawl') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData?.marketReputation == 'negative') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.easeofLocating == 'Not Traceable') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData?.lessThanYrAtCurrentAddress == 'yes') {
                orverallstatus = 'Refer'
                console.log('logic', orverallstatus);
            } else if (allData.negativeArea == 'Slum Area') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData.negativeArea == 'Community Dominated / Slum Area') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else if (allData.TPCStatus1 == 'negative' || allData.TPCStatus2 == 'negative') {
                orverallstatus = 'Not Recommended'
                console.log('logic', orverallstatus);
            } else {
                if (allData?.personMet == 'no') {
                    orverallstatus = 'Refer'
                } else if (allData?.easeofLocating == 'Difficult to Trace') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Community Dominated Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Sitting Chawl/Standing Chawl') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'High Risk Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                } else if (allData?.negativeArea == 'Community Dominated/Sitting Chawl/Standing Chawl Area') {
                    orverallstatus = 'Refer'
                    console.log('logic', orverallstatus);
    
                }
                else {
                    orverallstatus = 'Recommended'
    
                }
            }
            return orverallstatus

        }
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
        if (!alldata.overallStatus) {
            alldata.overallStatus = overallStatusCal(alldata)
        }
        alldata.newinitiationDate = alldata.initiationDate.split('GMT')[0];
        setFormdata(alldata);
        return alldata
    }
    const remarksfnc = (data) => {
        let overall = `${data.overallStatus ? data.overallStatus : 'NA'} |  Date: ${data.visitDate ? data.visitDate : 'NA'} |  ${data.visitedTime ? data.visitedTime : 'NA'} |  Mismatch Address: ${data.mismatchAddress ? data.mismatchAddress : 'NA'} |  Address Confirmed: ${data.addressConfirmed ? data.addressConfirmed : 'NA'} |  Person Met: ${data.personMet ? data.personMet : 'NA'} |  Person Met Name: ${data.personMetName ? data.personMetName : 'NA'} |  Residence Status: ${data.residenceStatus ? data.residenceStatus : 'NA'} |  Customer Occupation: ${data.customerOccupation ? data.customerOccupation : 'NA'} |  Gate/Door color: ${data.gateDoorColor ? data.gateDoorColor : 'NA'} |  Locality of Address: ${data.localityOfAddress ? data.localityOfAddress : 'NA'} |   Type of House: ${data.typeOfHouse ? data.typeOfHouse : 'NA'} | Accessibility/Approachability: ${data.accessibility ? data.accessibility : 'NA'} | Ease of Locating: ${data.easeofLocating ? data.easeofLocating : 'NA'} |  Customers Attitude: ${data.customerAttitude ? data.customerAttitude : 'NA'} | Distance from Station: ${data.distancefromStation ? data.distancefromStation : 'NA'} |  Negative Area: ${data.negativeArea ? data.negativeArea : 'NA'} | TPC1: ${data.TPCName1 ? data.TPCName1 : 'NA'} - ${data.TPCStatus1 ? data.TPCStatus1 : 'NA'} - ${data.TPCRemark1 ? data.TPCRemark1 : 'NA'} | TPC2: ${data.TPCName2 ? data.TPCName2 : 'NA'} - ${data.TPCStatus2 ? data.TPCStatus2 : 'NA'} - ${data.TPCRemark2 ? data.TPCRemark2 : 'NA'} | ${data.finalFIAnyRemarks ? data.finalFIAnyRemarks : 'NA'}`;
        return overall
    }
    const tpcFunction = () => {
        if (refetch) {
            return <Tpc data={formdata} ref={TPCRef} form={'resident'} applicantDetails={applicantDetails} />

        }

        return <Tpc data={verificationObserver ? verificationObserver : {}} ref={TPCRef} form={'resident'} applicantDetails={applicantDetails} />
    }
    // PDF MAKE CONTENT
    const recheckOverride = () => {
        const VOdata = verificationObserverRef.current.getFormData();
        const Tpdata = TPCRef.current.getFormData();
        const Addata = ADref.current.getFormData();
        const alldata = { ...formdata, ...Addata, ...VOdata, ...Tpdata }
        alldata.finalFIRemarks = remarksfnc(alldata)
        alldata.newinitiationDate = alldata.initiationDate.split('GMT')[0];
        alldata.overallStatus = overallStatusCal(alldata)
        setFormdata(alldata);
        setRefetch(true);
        setRefresh(Math.random());
    }
    const updatedRegion = (data) => {
        let verification = formdata
        verification.locName = data.locName
        let region = verification.region
        region.latitude = data?.latitude
        region.longitude = data?.longitude
        setVerificationOvserver(verification)
    }
    const pdffnc = () => {
        viewImages()
        const VOdata = verificationObserverRef.current.getFormData();
        const Tpdata = TPCRef.current.getFormData();
        const Addata = ADref.current.getFormData();
        const alldata = { ...formdata, ...Addata, ...VOdata, ...Tpdata }
        if (!alldata.overallStatus) {
            alldata.overallStatus = overallStatusCal(alldata)
        }
        alldata.finalFIRemarks = remarksfnc(alldata)
        // setInitiationDate(alldata.initiationDate.split('GMT')[0]);
        alldata.newinitiationDate = alldata.initiationDate.split('GMT')[0];
        let assetSeenAtResident = alldata?.assetSeenAtResidence?.toString()
        let exteriorConditons = alldata?.exteriorConditions?.toString()
        let interiorConditions = alldata?.interiorConditions?.toString()
        for (const key in alldata) {
            if (Object.hasOwnProperty.call(alldata, key)) {
                const element = alldata[key];
                if (element === undefined) {
                    element = ''
                }
                if (element === '') {
                    alldata[key] = 'NA'
                }
            }
        }
        // console.log('combiner', combiner().customerName.replace(/ /g, '').replace(/[^a-zA-Z ]/g, ""))
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
                                    text: alldata.appid
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Sr.No'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.srNo
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
                                    text: alldata.month
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Initiation Date'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.newinitiationDate
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
                                    text: alldata.customerName
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Bank/ NBFC name'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata?.bankNBFCname?.clientName ? alldata?.bankNBFCname?.clientName : alldata?.bankNBFCname
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
                                    text: alldata?.product?.productName ? alldata?.product?.productName : alldata?.product
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Location'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.loaction
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
                                    text: alldata.pincode
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Contact No'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.contactNo
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
                                    text: alldata.mobileNo
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
                                    text: alldata.residenceAddressProvided
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
                                    text: alldata.mismatchAddress
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Visited Address'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.visitedresidentAddress
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
                                //   text: alldata.distancefromNeareastStation
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
                //         //   text: alldata.nearestLandMark
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
                                    text: alldata.visitDate
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Visited Time'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.visitedTime
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
                                    text: alldata.addressConfirmed
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Nearest Landmark'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.landmark
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
                                    text: alldata.personMet
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Person Met Name'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.personMetName
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
                                    text: alldata.personMetAge
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Relationship with Applicant'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.personMetRealtionwithApplicant
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
                                    text: alldata.personMetRealtionwithApplicantOther
                                },

                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Staying in City (No. of Yrs)'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.totalYearsInCity
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
                                    text: alldata.totalYearsAtCurrentAddress
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Less than 1 yr at Current Address'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.lessThanYrAtCurrentAddress
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
                                    text: alldata.lessThanYrAtCurrentAddressNote
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Residence Status'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.residenceStatus
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
                                    text: alldata.customerOccupation
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Qualification'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.qualification
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
                                    text: alldata.marrried
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Gate/Door color & Bldg Color'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.gateDoorColor
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
                                    text: alldata.noOfFamilyMembers
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Earning Members'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.earningMembers
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
                                    text: alldata.dependents
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Children'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.children
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
                                    text: alldata.officeName
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Designation'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.designation
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
                                    text: alldata.officeAddress
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
                                    text: alldata.docVerified
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Document Details'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.documentDetails
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
                //           text: alldata.customerNameVerifiedFrom.toString()
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
                //           text: alldata.customerNameVerifiedFromOther
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
                                    text: alldata.localityOfAddress
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Type of House'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.typeOfHouse
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
                                    text: alldata.typeOfHouseOthers
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Construction Of Residence'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.constructionOfResidence
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
                                    text: alldata.accessibility
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Area of Residence (sq.ft)'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.areaofResidence
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
                                    text: alldata.easeofLocating
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
                                    text: alldata.customerAttitude
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
                                //   text: alldata.vehicalOwned
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
                                    text: alldata.distancefromStation
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Negative Area'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.negativeArea
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
                                    text: alldata.picturePoliticalLeader
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Political Leader Details'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.politicalLeaderDetails
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
                            ['1', alldata?.TPCName1 ? alldata?.TPCName1 : '', alldata?.TPCStatus1 ? alldata?.TPCStatus1 : '', alldata?.TPCRemark1 ? alldata?.TPCRemark1 : '']
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
                            ['2', alldata?.TPCName2 ? alldata?.TPCName2 : '', alldata?.TPCStatus2 ? alldata?.TPCStatus2 : '', alldata?.TPCRemark2 ? alldata?.TPCRemark2 : '']
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
                //       ['3', alldata.TPCName3, alldata.TPCStatus3, alldata.TPCRemark3,
                //         alldata.TPCContactnumber3]
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
                                    text: alldata.marketReputation
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Remarks'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.TPCRemarks
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
                                    text: alldata.TVRNumber
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Designation'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.TVRDesignation
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
                                    text: alldata.TVRStatus
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Business Name'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.TVRBusinessName
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
                                    text: alldata.TVRNoofyearsinBusiness
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Remarks'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.TVRRemarks
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
                                    text: alldata.overallStatus
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Agency name'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.finalFIAgencyname
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
                                    text: alldata.finalFIAnyRemarks
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
                                    text: alldata.finalFIRemarks
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
                                    text: alldata.productSupervisor
                                },
                                {

                                    border: [true, true, true, true],
                                    fillColor: '#ccc',
                                    text: 'Verifier Name'
                                },
                                {

                                    border: [true, true, true, true],
                                    text: alldata.finalFIVerifierName
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
                                    text: `Geo Tagging \n\n Latitude: ${alldata?.region?.latitude} \n Longitude: ${alldata?.region?.longitude} \n ${alldata?.locName}`,
                                    // link: `http://maps.google.com/maps?q=${alldata?.region?.latitude} +, + ${alldata?.region?.longitude}`,
                                    link: `http://maps.google.com/maps/place/${alldata?.region?.latitude}+${alldata?.region?.longitude}`,

                                    color: 'blue',
                                    pageBreak: 'before'
                                },

                            ]
                        ]
                    }
                },
                ...images64,

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
        return documentDefinition;
    }

    // PDF MAKE END

    return (
        <div className='mx-2 text-start' >
            <Prompt
                message={(location, action) => {
                    if (action === 'POP') {
                        // On Going Back
                        // Need to end at submit also
                        clearWatcher()
                    }
                }}
            />
            {alertMessage && <Alert message={alertMessage} setMessage={(data) => setAlertMessage(data)} />}
            <Collapse title='Applicant Details'>
                <ApplicantDetails data={applicantDetails} outerDetails={outerDetails} id={id} ref={ADref} />
            </Collapse>
            {id && <> <Collapse title='Verification Details'>
                {/* <button onClick={()=> handleAgentCount()}>handleAgentCount</button> */}
                <h4 className='my-2'>Verification Details</h4>
                <form className='d-flex justify-content-around flex-wrap' >
                    <div className='formInputBoxSpacing'>
                        <label>Visit Date</label>
                        <Input type="text" name='visitDate' value={formdata['visitDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='formInputBoxSpacing'>
                        <label>Visited Time</label>
                        <Input type="text" name='visitedTime' value={formdata['visitedTime']} onChange={(e) => onHandleChange(e.currentTarget)} />
                    </div>
                    <div className='formInputBoxSpacing'>
                        <label>Address Confirmed</label>
                        <Dropdown isOpen={addressConfirmedDropdown} toggle={addressConfirmedToggle}>
                            <DropdownToggle>
                                {formdata.addressConfirmed}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem name='addressConfirmed' value='no' onClick={(e) => onHandleChange(e.currentTarget)}>No</DropdownItem>
                                <DropdownItem name='addressConfirmed' value='yes' onClick={(e) => onHandleChange(e.currentTarget)}>Yes</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* <Input type="text" name='addressConfirmed' value={formdata['addressConfirmed']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
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
                        <Input type="text" name='totalYearsAtCurrentAddress' value={formdata["totalYearsAtCurrentAddress"]} onChange={(e) => onHandleChange(e.currentTarget)} />
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
                {/* <Tpc data={formdata} ref={TPCRef} form={"resident"} /> */}
                {tpcFunction()}
            </Collapse>
                <Collapse title='Images and GeoLocation'>
                    <Geolocation data={verificationObserver} id={id} pincode={pincode} type={'resident'} updatedRegion={(data) => updatedRegion(data)} />
                </Collapse>
                {/* <PdfMakeResident data={formdata} refresh={() => { setRefresh(Math.random()) }} download={downloadPdf} initiationDate={initiationDate} setpdfViewed={()=> setpdfViewed(true)}/> */}
                {images.length === images64.length && <div>
                    <button className='btn text-primary' onClick={() => { pdfMake.createPdf(pdffnc()).open() }}>View PDF</button>
                    <button className='btn text-primary' id='downloadpdf' onClick={() => { pdfMake.createPdf(pdffnc()).download(combiner().customerName.replace(/ /g, '').replace(/[^a-zA-Z ]/g, "")) }}>Download PDF</button>
                </div>}
            </>
            }
            {!loading ? <>
                <Button color='link' onClick={recheckOverride}>Recheck</Button>
                <Button className='mx-2' color='warning' onClick={handleSave}>Save</Button>
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
        vendor: state.vendors
    }
}
export default connect(mapStateToProps)(Resident)