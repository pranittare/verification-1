import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import DropDownComp from '../components/DropDownComp'

const VerificationObserverResident = forwardRef(({ data, id }, ref) => {
    const [exteriorConditionsDrop, setExteriorConditionsDrop] = useState(false);
    const exteriorConditionsDroptoggle = () => setExteriorConditionsDrop(prevState => !prevState);
    const [interorConditionsDrop, setInterorConditionsDrop] = useState(false);
    const interorConditionsDroptoggle = () => setInterorConditionsDrop(prevState => !prevState);
    const [assetSeenAtResidenceDrop, setAssetSeenAtResidenceDrop] = useState(false);
    const assetSeenAtResidenceDroptoggle = () => setAssetSeenAtResidenceDrop(prevState => !prevState);
    const [refresh, setRefresh] = useState(0);
    const initialState = {
        localityOfAddress: '',
        typeOfHouse: '',
        typeOfHouseOthers: '',
        constructionOfResidence: '',
        accessibility: '',
        easeofLocating: '',
        interiorConditions: [],
        exteriorConditions: [],
        areaofResidence: '',
        customerAttitude: '',
        distancefromStation: '',
        picturePoliticalLeader: '',
        politicalLeaderDetails: '',
        assetSeenAtResidence: [],
        negativeArea: ''
    }
    const [formdata, setFormdata] = useState(initialState)

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
    const handleSubmit = (e) => {
        // const formdata = new FormData(e.currentTarget)
        e.preventDefault()
        // verification(formdata)
        // setData(formdata)
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
    }
    useEffect(() => {
        if (data) {
            let form = formdata
            // console.log('data', data)
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
    let localityOfAddress = [
        { name: 'localityOfAddress', value: '', label: 'None' },
        { name: 'localityOfAddress', value: 'Complex', label: 'Complex' },
        { name: 'localityOfAddress', value: 'Slum', label: 'Slum' },
        { name: 'localityOfAddress', value: 'Market Area', label: 'Market Area' },
        { name: 'localityOfAddress', value: 'Lower Middle Class', label: 'Lower Middle Class' },
        { name: 'localityOfAddress', value: 'Middle Class', label: 'Middle Class' },
        { name: 'localityOfAddress', value: 'Upper Middle Class', label: 'Upper Middle Class' },
        { name: 'localityOfAddress', value: 'High Class', label: 'High Class' },
    ]
    let typeOfHouse = [
        { name: 'typeOfHouse', value: '', label: 'None' },
        { name: 'typeOfHouse', value: 'Flat', label: 'Flat' },
        { name: 'typeOfHouse', value: 'Independent House', label: 'Independent House' },
        { name: 'typeOfHouse', value: 'Part of Independent House', label: 'Part of Independent House' },
        { name: 'typeOfHouse', value: 'Row House or Bungalow', label: 'Row House or Bungalow' },
        { name: 'typeOfHouse', value: 'Multi Tenant House (Pagdi)', label: 'Multi Tenant House (Pagdi)' },
        { name: 'typeOfHouse', value: 'Standing Chawl', label: 'Standing Chawl' },
        { name: 'typeOfHouse', value: 'Sitting Chawl', label: 'Sitting Chawl' },
        { name: 'typeOfHouse', value: 'Others', label: 'Others' },
    ]
    let constructionOfResidence = [
        { name: 'constructionOfResidence', value: '', label: 'None' },
        { name: 'constructionOfResidence', value: 'Strong', label: 'Strong' },
        { name: 'constructionOfResidence', value: 'Semi Strong', label: 'Semi Strong' },
        { name: 'constructionOfResidence', value: 'Temporary', label: 'Temporary' },
    ]
    let accessibility = [
        { name: 'accessibility', value: '', label: 'None' },
        { name: 'accessibility', value: 'Rail', label: 'Rail' },
        { name: 'accessibility', value: 'Road', label: 'Road' },
        { name: 'accessibility', value: 'All modes', label: 'All modes' },
    ]
    let easeofLocating = [
        { name: 'easeofLocating', value: '', label: 'None' },
        { name: 'easeofLocating', value: 'Easily Traceable', label: 'Easily Traceable' },
        { name: 'easeofLocating', value: 'Difficult to Trace', label: 'Difficult to Trace' },
        { name: 'easeofLocating', value: 'Not Traceable', label: 'Not Traceable' },
    ]
    let customerAttitude = [
        { name: 'customerAttitude', value: '', label: 'None' },
        { name: 'customerAttitude', value: 'Co-operative', label: 'Co-operative' },
        { name: 'customerAttitude', value: 'Limited Information', label: 'Limited Information' },
        { name: 'customerAttitude', value: 'Non Co-operative', label: 'Non Co-operative' },
    ]
    let picturePoliticalLeader = [
        { name: 'picturePoliticalLeader', value: '', label: 'None' },
        { name: 'picturePoliticalLeader', value: 'yes', label: 'yes' },
        { name: 'picturePoliticalLeader', value: 'no', label: 'no' }
    ]
    let interiorConditions = ['Clean', 'Painted', 'Carpeted', 'Curtains', 'Poor Maintained']

    let exteriorConditions = ['Surrounding Wall', 'Gate', 'Garden', 'Car Parking', 'Lift', 'Security', 'Godown Area']

    let assetSeenAtResidence = ['TV', 'Fridge', 'Washing Machine', 'AC', 'Computer', 'Laptop', 'Home Theater'];

    let negativeArea = [
        { name: 'negativeArea', value: 'Community Dominated Area', label: 'Community Dominated Area' },
        { name: 'negativeArea', value: 'Sitting Chawl/Standing Chawl', label: 'Sitting Chawl/Standing Chawl' },
        { name: 'negativeArea', value: 'Slum Area', label: 'Slum Area' },
        { name: 'negativeArea', value: 'High Risk Area', label: 'High Risk Area' },
        { name: 'negativeArea', value: 'Community Dominated/Sitting Chawl/Standing Chawl Area', label: 'Community Dominated/Sitting Chawl/Standing Chawl Area' },
        { name: 'negativeArea', value: 'Community Dominated / Slum Area', label: 'Community Dominated / Slum Area' },
    ]
    const addCheckboxes = (e, item) => {
        let form = {...formdata}
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
            const refData = {...formdata}
            for(const key in refData){
                if(initialState[key] === undefined)
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
                    <label>Locality of Address</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={localityOfAddress} />
                </div>
                <div>
                    <label>Type of House</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={typeOfHouse} />
                </div>
                <div>
                    <label>Type of House Others</label>
                    <Input type="text" name='typeOfHouseOthers' value={formdata['typeOfHouseOthers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Construction Of Residence</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={constructionOfResidence} />
                </div>
                <div>
                    <label>Accessibility/Approachibility</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={accessibility} />
                </div>
                <div>
                    <label>Ease of Locating</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={easeofLocating} />
                </div>
                <div>
                    <label>Interior Conditions</label>
                    {/* <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} 
                    onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={interorConditionsDrop} toggle={interorConditionsDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['interiorConditions']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {interiorConditions?.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' name='interiorConditions' value={item} checked={formdata['interiorConditions']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Exterior Condition</label>
                    <Dropdown isOpen={exteriorConditionsDrop} toggle={exteriorConditionsDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['exteriorConditions']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {exteriorConditions?.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' value={item} name='exteriorConditions' checked={formdata['exteriorConditions']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>

                    {/* <Input type="text" name='exteriorConditions' value={formdata['exteriorConditions']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                </div>
                <div>
                    <label>Area of Residence (sq.ft)</label>
                    <Input type="text" name='areaofResidence' value={formdata['areaofResidence']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='mx-2'>
                    <label>Customer Attitude</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={customerAttitude} />
                </div>
                <div className='mx-2'>
                    <label>Distance from Station</label>
                    <Input type="text" name='distancefromStation' value={formdata['distancefromStation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className='mx-3'>
                    <label>Picture Political Leader</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={picturePoliticalLeader} />
                </div>
                <div className='mx-3'>
                    <label>Political Leader Details</label>
                    <Input type="text" name='politicalLeaderDetails' value={formdata['politicalLeaderDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Asset Seen At Residence</label>
                    {/* <Input type="text" name='assetSeenAtResidence' value={formdata['assetSeenAtResidence']} onChange={(e) => onHandleChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={assetSeenAtResidenceDrop} toggle={assetSeenAtResidenceDroptoggle}>
                        <DropdownToggle>
                            Selected {formdata['assetSeenAtResidence']?.length}
                        </DropdownToggle>
                        <DropdownMenu >
                            {assetSeenAtResidence.map((item) => {
                                return <div key={item} >
                                    <Input type='checkbox' value={item} name='assetSeenAtResidence' checked={formdata['assetSeenAtResidence']?.includes(item)} onChange={(e) => addCheckboxes(e, item)} />
                                    {item}
                                </div>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Negative Area</label>
                    <DropDownComp id='verificationObserverOffice' onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={negativeArea} />
                </div>
                <div className="d-none">
                    <button type='submit' id='residentVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
})

export default VerificationObserverResident


