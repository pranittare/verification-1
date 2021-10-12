import React, { useState, useEffect } from 'react'
import { Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ApplicantDetails from './ApplicantDetails'
import Tpc from './Tpc';
import VerificationObserverOffice from './VerificationObserverOffice';
import Geolocation from './Geolocation';
import DropDownComp from '../components/DropDownComp';

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
    const [addressConfirmedOpen, setAddressConfirmed] = useState(false);
    const addressConfirmedtoggle = () => setAddressConfirmed(prevState => !prevState);
    const [businessBoardSeenOpen, setBusinessBoardSeen] = useState(false);
    const businessBoardSeentoggle = () => setBusinessBoardSeen(prevState => !prevState);
    const [personMetOpen, setPersonMet] = useState(false);
    const personMettoggle = () => setPersonMet(prevState => !prevState);
    const [personMetNameDesignationOpen, setPersonMetNameDesignationOpen] = useState(false);
    const personMetNameDesignationtoggle = () => setPersonMetNameDesignationOpen(prevState => !prevState);
    const [lessThanYrAtCurrentAddressOpen, setLessThanYrAtCurrentAddress] = useState(false);
    const lessThanYrAtCurrentAddresstoggle = () => setLessThanYrAtCurrentAddress(prevState => !prevState);
    const [natureofBusinesOpen, setnatureofBusinesOpen] = useState(false);
    const natureofBusinestoggle = () => setnatureofBusinesOpen(prevState => !prevState);
    const [officeOwnershipOpen, setStatus1] = useState(false);
    const officeOwnershiptoggle = () => setStatus1(prevState => !prevState);
    const [typeofEntityOpen, setTypeofEntity] = useState(false);
    const typeofEntitytoggle = () => setTypeofEntity(prevState => !prevState);

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
            <ApplicantDetails details={test} applicantDetails={(data) => { setApplicantDetails(data) }} getData={getData} test={test} />
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
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={addressConfirmed} />
                    {/* <Dropdown isOpen={addressConfirmedOpen} toggle={addressConfirmedtoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['addressConfirmed'] ? formdata['addressConfirmed'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='addressConfirmed' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='addressConfirmed' onClick={(e) => onHandleChange(e.currentTarget)} value='yes'>Yes</DropdownItem>
                            <DropdownItem name='addressConfirmed' onClick={(e) => onHandleChange(e.currentTarget)} value='no'>No</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                    {/* <Input type="text" name='addressConfirmed' value={formdata['addressConfirmed']} onChange={(e)=> onHandleChange(e)} /> */}
                </div>
                <div>
                    <label>Business Board Seen</label>
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={businessBoardSeen} />
                    {/* <Input type="text" name='businessBoardSeen' value={formdata['businessBoardSeen']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={businessBoardSeenOpen} toggle={businessBoardSeentoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['businessBoardSeen'] ? formdata['businessBoardSeen'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='businessBoardSeen' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='businessBoardSeen' onClick={(e) => onHandleChange(e.currentTarget)} value='yes'>Yes</DropdownItem>
                            <DropdownItem name='businessBoardSeen' onClick={(e) => onHandleChange(e.currentTarget)} value='no'>No</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
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
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMet} />
                    {/* <Input type="text" name='personMet' value={formdata['personMet']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={personMetOpen} toggle={personMettoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['personMet'] ? formdata['personMet'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='personMet' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='personMet' onClick={(e) => onHandleChange(e.currentTarget)} value='yes'>Yes</DropdownItem>
                            <DropdownItem name='personMet' onClick={(e) => onHandleChange(e.currentTarget)} value='no'>No</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                <div>
                    <label>Person Met Name</label>
                    <Input type="text" name='personMetName' value={formdata['personMetName']} onChange={(e) => onHandleChange(e)} />
                </div>
                <div>
                    <label>Person Met Designation</label>
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={personMetNameDesignation} />
                    {/* <Input type="text" name='personMetNameDesignation' value={formdata['personMetNameDesignation']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={personMetNameDesignationOpen} toggle={personMetNameDesignationtoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['personMetNameDesignation'] ? formdata['personMetNameDesignation'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Director'>Director</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Partner'>Partner</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Proprietor'>Proprietor</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Family Member'>Family Member</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Staff'>Staff</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Guard'>Guard</DropdownItem>
                            <DropdownItem name='personMetNameDesignation' onClick={(e) => onHandleChange(e.currentTarget)} value='Neighbour'>Neighbour</DropdownItem>


                        </DropdownMenu>
                    </Dropdown> */}
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
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={lessThanYrAtCurrentAddress} />
                    {/* <Input type="text" name='lessThanYrAtCurrentAddress' value={formdata['lessThanYrAtCurrentAddress']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={lessThanYrAtCurrentAddressOpen} toggle={lessThanYrAtCurrentAddresstoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['lessThanYrAtCurrentAddress'] ? formdata['lessThanYrAtCurrentAddress'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='lessThanYrAtCurrentAddress' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='lessThanYrAtCurrentAddress' onClick={(e) => onHandleChange(e.currentTarget)} value='yes'>Yes</DropdownItem>
                            <DropdownItem name='lessThanYrAtCurrentAddress' onClick={(e) => onHandleChange(e.currentTarget)} value='no'>No</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                <div>
                    <label>Prev Address/ Prev Employment</label>
                    <Input type="text" name='lessThanYrAtCurrentAddressNote' value={formdata['lessThanYrAtCurrentAddressNote']} onChange={(e) => onHandleChange(e)} />
                </div>
                <div>
                    <label>Nature of Business</label>
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={natureofBusines} />
                    {/* <Input type="text" name='natureofBusines' value={formdata['natureofBusines']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={natureofBusinesOpen} toggle={natureofBusinestoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['natureofBusines'] ? formdata['natureofBusines'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='natureofBusines' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='natureofBusines' onClick={(e) => onHandleChange(e.currentTarget)} value='Service'>Service</DropdownItem>
                            <DropdownItem name='natureofBusines' onClick={(e) => onHandleChange(e.currentTarget)} value='Manufacturing'>Manufacturing</DropdownItem>
                            <DropdownItem name='natureofBusines' onClick={(e) => onHandleChange(e.currentTarget)} value='Trading'>Trading</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                <div>
                    <label>Nature of Business Other</label>
                    <Input type="text" name='natureOfBusinessDetails' value={formdata['natureOfBusinessDetails']} onChange={(e) => onHandleChange(e)} />
                </div>
                <div>
                    <label>Office Ownership</label>
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={officeOwnership} />
                    {/* <Input type="text" name='officeOwnership' value={formdata['officeOwnership']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={officeOwnershipOpen} toggle={officeOwnershiptoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['officeOwnership'] ? formdata['officeOwnership'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='officeOwnership' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='officeOwnership' onClick={(e) => onHandleChange(e.currentTarget)} value='Owned'>Owned</DropdownItem>
                            <DropdownItem name='officeOwnership' onClick={(e) => onHandleChange(e.currentTarget)} value='Rented'>Rented</DropdownItem>
                            <DropdownItem name='officeOwnership' onClick={(e) => onHandleChange(e.currentTarget)} value='Leased'>Leased</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
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
                    <DropDownComp onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={typeofEntity} />
                    {/* <Input type="text" name='typeofEntity' value={formdata['typeofEntity']} onChange={(e)=> onHandleChange(e)} /> */}
                    {/* <Dropdown isOpen={typeofEntityOpen} toggle={typeofEntitytoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['typeofEntity'] ? formdata['typeofEntity'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Proprietor'>Proprietorship</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Pvt Ltd'>Pvt Ltd</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Public Ltd'>Public Ltd</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Individual'>Individual</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='HUF'>HUF</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Trust'>Trust</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Partnership'>Partnership</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='LLP'>LLP</DropdownItem>
                            <DropdownItem name='typeofEntity' onClick={(e) => onHandleChange(e.currentTarget)} value='Co-op Society'>Co-op Society</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
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
