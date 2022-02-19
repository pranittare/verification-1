import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import DropDownComp from '../components/DropDownComp'

const VerificationObserverOffice = forwardRef(({ data, id }, ref) => {
    const [refresh, setRefresh] = useState(0)
    const initialState = {
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
    }
    const [formdata, setFormdata] = useState(initialState)
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
        // verification(formdata)
    }
    useEffect(() => {
        if (data) {
            let form = formdata
            for (const key in data) {
                form[key] = data[key]
            }
            setFormdata(form)
            // if (localStorage.getItem(id)) {
            //     let local = JSON.parse(localStorage.getItem(id))
            //     for (const key in data) {
            //         local[key] = data[key]
            //     }
            //     setFormdata(local)
            // }
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
        { name: 'businessActivityLevel', value: 'No business activity', label: 'No business activity' },
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
        ['Surrounding Wall', 'Gate', 'Garden', 'Car Parking', 'Lift', 'Security Office', 'Godown Area'];
    let negativeArea = [
        { name: 'negativeArea', value: 'Community Dominated Area', label: 'Community Dominated Area' },
        { name: 'negativeArea', value: 'Sitting Chawl/Standing Chawl', label: 'Sitting Chawl/Standing Chawl' },
        { name: 'negativeArea', value: 'Slum Area', label: 'Slum Area' },
        { name: 'negativeArea', value: 'High Risk Area', label: 'High Risk Area' },
        { name: 'negativeArea', value: 'Community Dominated/Sitting Chawl/Standing Chawl Area', label: 'Community Dominated/Sitting Chawl/Standing Chawl Area' },
        { name: 'negativeArea', value: 'Community Dominated / Slum Area', label: 'Community Dominated / Slum Area' },
    ]
    const addCheckboxes = (e, item) => {
        let form = formdata
        form[e.target.name] = form[e.target.name].toString();
        form[e.target.name] = form[e.target.name].split(',');
        let data = form[e.target.name]
        form[e.target.name] = data.filter(a => a && a)
        if (e.target.checked) {
            form[e.target.name]?.push(item)
        } else {
            let data = form[e.target.name]
            form[e.target.name] = data.filter(a => a !== item)
        }
        setFormdata(form);
        setRefresh(Math.random());
    }
    useImperativeHandle(ref, () => ({

        getFormData() {
            const refData = { ...formdata }
            for (const key in refData) {
                if (initialState[key] === undefined)
                    delete refData[key]
            }
            return refData
            // applicantDetail(formdata)
        }

    }));
    return (
        <div>
            <h4>Verification Observer</h4>
            {(refresh > 0 || true) && <form className='d-flex justify-content-around flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Type of Office</label>

                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={verificationObserver} />
                </div>
                <div className='mx-3'>
                    <label>Locality of Office</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={localityofOffice} />
                </div>
                <div className='mx-3'>
                    <label>Construction Of Office</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={constructionOfOffice} />
                </div>
                <div className='mx-3'>
                    <label>Ease of Locating</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={easeofLocating} />
                </div>
                <div>
                    <label>Exterior Condition</label>
                    {/* <Input type="text" name='exteriorCondition' value={formdata['exteriorCondition']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={exteriorConditionsDrop} toggle={exteriorConditionsDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['exteriorCondition']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {exteriorCondition.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' value={item} name='exteriorCondition' checked={formdata['exteriorCondition']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className='mx-3'>
                    <label>Approx Area of Office (sq.ft)</label>
                    <Input type="text" name='approxAreaofOffice' value={formdata['approxAreaofOffice']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div style={{width: 300}}>
                    <label>Business Activity Level</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={businessActivityLevel} />
                </div>
                <div className='mx-3'>
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
                <div className='mx-3'>
                    <label>Picture Political Leader</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={picturePoliticalLeader} />
                </div>
                <div>
                    <label>Political Leader Details</label>
                    <Input type="text" name='politicalLeaderDetails' value={formdata['politicalLeaderDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='mx-3'>
                    <label>Asset Seen At Office</label>
                    {/* <Input type="text" name='assetSeenAtOffice' value={formdata['assetSeenAtOffice']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={assetSeenAtOfficeDrop} toggle={assetSeenAtOfficeDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['assetSeenAtOffice']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {assetSeenAtOffice.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' value={item} name='assetSeenAtOffice' checked={formdata['assetSeenAtOffice']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className='mx-3'>
                    <label>Interior Conditions</label>
                    {/* <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={interorConditionsDrop} toggle={interorConditionsDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['interiorConditions']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {interiorConditions?.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' value={item} name='interiorConditions' checked={formdata['interiorConditions']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div style={{width: 200}}>
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
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={negativeArea} />
                </div>
                <div className='d-none'>
                    <button type='submit' id='officeVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
})


export default VerificationObserverOffice;