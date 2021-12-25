import React, { useEffect, useState } from 'react'
import { Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import DropDownComp from '../components/DropDownComp'

export default function VerificationObserverOffice({ verification, getData, data }) {
    const [refresh, setRefresh] = useState(0)
    const [formdata, setFormdata] = useState({
        verificationObserver: '',
        localityofOffice: '',
        constructionOfOffice: '',
        easeofLocating: '',
        exteriorCondition: '',
        approxAreaofOffice: '',
        businessActivityLevel: '',
        noOfEmployeesWorkinginPremises: '',
        withinMunicipalLimits: '',
        distanceFromRailwayStation: '',
        picturePoliticalLeader: '',
        politicalLeaderDetails: '',
        assetSeenAtOffice: '',
        interiorConditions: '',
        stockLevel: '',
        docVerified: '',
        documentDetails: '',
        negativeArea: '',
    })
    const [exteriorConditionsDrop, setExteriorConditionsDrop] = useState(false);
    const exteriorConditionsDroptoggle = () => setExteriorConditionsDrop(prevState => !prevState);
    const [interorConditionsDrop, setInterorConditionsDrop] = useState(false);
    const interorConditionsDroptoggle = () => setInterorConditionsDrop(prevState => !prevState);
    const [assetSeenAtOfficeDrop, setAssetSeenAtOfficeDrop] = useState(false);
    const assetSeenAtOfficeDroptoggle = () => setAssetSeenAtOfficeDrop(prevState => !prevState);
    const onHandleChange = (e) => {
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        verification(formdata)
    }
    useEffect(() => {
        if (getData) {
            document.getElementById('officeVerificationObserver').click()
        }
    }, [getData])
    useEffect(() => {
        if (data) {
            let form = formdata
            for (const key in data) {
                form[key] = data[key]
            }
            setFormdata(form)
            setRefresh(Math.random())
            // onHandleChange({ name: data[0], value: test[1] })
        }
    }, [data])
    let verificationObserver = [
        { name: 'verificationObserver', value: '', label: 'None' },
        { name: 'verificationObserver', value: 'Independent Building', label: 'Independent Building' },
        { name: 'verificationObserver', value: 'Commercial Gala', label: 'Commercial Gala' },
        { name: 'verificationObserver', value: 'Industry or Factory', label: 'Industry or Factory' },
        { name: 'verificationObserver', value: 'Office', label: 'Office' },
        { name: 'verificationObserver', value: 'Shed', label: 'Shed' },
        { name: 'verificationObserver', value: 'Shared Office', label: 'Shared Office' },
        { name: 'verificationObserver', value: 'Shop', label: 'Shop' },
        { name: 'verificationObserver', value: 'Resi cum Office', label: 'Resi cum Office' },
        { name: 'verificationObserver', value: 'Clinic', label: 'Clinic' },
        { name: 'verificationObserver', value: 'Godown', label: 'Godown' },
        { name: 'verificationObserver', value: 'Hosiptal or Nursing Home', label: 'Hosiptal or Nursing Home' },
    ]

    let localityofOffice = [
        { name: 'localityofOffice', value: '', label: 'None' },
        { name: 'localityofOffice', value: 'Complex', label: 'Complex' },
        { name: 'localityofOffice', value: 'Commercial Building', label: 'Commercial Building' },
        { name: 'localityofOffice', value: 'Business Center/Park', label: 'Business Center/Park' },
        { name: 'localityofOffice', value: 'Market Area', label: 'Market Area' },
        { name: 'localityofOffice', value: 'Slum', label: 'Slum' },
        { name: 'localityofOffice', value: 'Residential', label: 'Residential' },
        { name: 'localityofOffice', value: 'Factory or Industrail Area', label: 'Factory or Industrail Area' },
        { name: 'localityofOffice', value: 'Hosiptal/Mall/Commercial Premises', label: 'Hosiptal/Mall/Commercial Premises' },
    ]
    let constructionOfOffice = [
        { name: 'constructionOfOffice', value: '', label: 'None' },
        { name: 'constructionOfOffice', value: 'Strong', label: 'Strong' },
        { name: 'constructionOfOffice', value: 'Semi Strong', label: 'Semi Strong' },
        { name: 'constructionOfOffice', value: 'Temporary', label: 'Temporary' },
    ]
    let easeofLocating = [
        { name: 'easeofLocating', value: '', label: 'None' },
        { name: 'easeofLocating', value: 'Easily Traceable', label: 'Easily Traceable' },
        { name: 'easeofLocating', value: 'Difficult to Trace', label: 'Difficult to Trace' },
        { name: 'easeofLocating', value: 'Not Traceable', label: 'Not Traceable' },
    ]
    let businessActivityLevel = [
        { name: 'businessActivityLevel', value: '', label: 'None' },
        { name: 'businessActivityLevel', value: 'High', label: 'High' },
        { name: 'businessActivityLevel', value: 'Medium', label: 'Medium' },
        { name: 'businessActivityLevel', value: 'Low', label: 'Low' },
    ]
    let withinMunicipalLimits = [
        { name: 'withinMunicipalLimits', value: 'yes', label: 'yes' },
        { name: 'withinMunicipalLimits', value: 'no', label: 'no' }
    ]
    let picturePoliticalLeader = [
        { name: 'picturePoliticalLeader', value: '', label: 'None' },
        { name: 'picturePoliticalLeader', value: 'yes', label: 'yes' },
        { name: 'picturePoliticalLeader', value: 'no', label: 'no' }
    ]
    let stockLevel = [
        { name: 'stockLevel', value: '', label: 'None' },
        { name: 'stockLevel', value: 'High', label: 'High' },
        { name: 'stockLevel', value: 'Medium', label: 'Medium' },
        { name: 'stockLevel', value: 'Low', label: 'Low' },
    ]
    let docVerified = [
        { name: 'docVerified', value: '', label: 'None' },
        { name: 'docVerified', value: 'yes', label: 'yes' },
        { name: 'docVerified', value: 'no', label: 'no' }
    ]
    let assetSeenAtOffice = ['AC', 'PC', 'Printer', 'Telephone', 'Fax', 'xerox']
    let interiorConditions = ['Painted', 'Carpeted', 'clean']
    let exteriorCondition =
        ['Surrounding Wall', 'Gate', 'Garden', 'Car Parking', 'Lift', 'Security Office', 'Godown Area']

    return (
        <div>
            <h4>Verification Observer</h4>
            {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Type of Office</label>

                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={verificationObserver} />
                </div>
                <div>
                    <label>Locality of Office</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={localityofOffice} />
                </div>
                <div>
                    <label>Construction Of Office</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={constructionOfOffice} />
                </div>
                <div>
                    <label>Ease of Locating</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={easeofLocating} />
                </div>
                <div>
                    <label>Exterior Condition</label>
                    {/* <Input type="text" name='exteriorCondition' value={formdata['exteriorCondition']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={exteriorConditionsDrop} toggle={exteriorConditionsDroptoggle}>
                        <DropdownToggle>
                        Selected {formdata['exteriorCondition'].length}
                        </DropdownToggle>
                        <DropdownMenu >
                        {exteriorCondition.map((item) => {
                            return <div key={item} >
                                <Input type='checkbox' value={item} checked={formdata['exteriorCondition'].includes(item)} />
                                {item}
                            </div>
                        })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Approx Area of Office (sq.ft)</label>
                    <Input type="text" name='approxAreaofOffice' value={formdata['approxAreaofOffice']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Business Activity Level</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={businessActivityLevel} />
                </div>
                <div>
                    <label>No. of Employees Working in Office/ Business or Seen in Premises</label>
                    <Input type="text" name='noOfEmployeesWorkinginPremises' value={formdata['noOfEmployeesWorkinginPremises']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Within Municipal Limits</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={withinMunicipalLimits} />
                </div>
                <div>
                    <label>Distance from Neareast Railway Station</label>
                    <Input type="text" name='distanceFromRailwayStation' value={formdata['distanceFromRailwayStation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Picture Political Leader</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={picturePoliticalLeader} />
                </div>
                <div>
                    <label>Political Leader Details</label>
                    <Input type="text" name='politicalLeaderDetails' value={formdata['politicalLeaderDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Asset Seen At Office</label>
                    {/* <Input type="text" name='assetSeenAtOffice' value={formdata['assetSeenAtOffice']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={assetSeenAtOfficeDrop} toggle={assetSeenAtOfficeDroptoggle}>
                        <DropdownToggle>
                        Selected {formdata['assetSeenAtOffice'].length}
                        </DropdownToggle>
                        <DropdownMenu >
                        {assetSeenAtOffice.map((item) => {
                            return <div key={item} >
                                <Input type='checkbox' value={item} checked={formdata['assetSeenAtOffice'].includes(item)} />
                                {item}
                            </div>
                        })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Interior Conditions</label>
                    {/* <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={interorConditionsDrop} toggle={interorConditionsDroptoggle}>
                        <DropdownToggle>
                        Selected {formdata['interiorConditions'].length}
                        </DropdownToggle>
                        <DropdownMenu >
                        {interiorConditions.map((item) => {
                            return <div key={item} >
                                <Input type='checkbox' value={item} checked={formdata['interiorConditions'].includes(item)} />
                                {item}
                            </div>
                        })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Stock Level</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={stockLevel} />
                </div>
                <div>
                    <label>Doc Verified</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={docVerified} />
                </div>
                <div>
                    <label>Document Details</label>
                    <Input type="text" name='documentDetails' value={formdata['documentDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Negative Area</label>
                    <Input type="text" name='negativeArea' value={formdata['negativeArea']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='d-none'>
                    <button type='submit' id='officeVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
}
