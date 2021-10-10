import React, { useEffect, useState } from 'react'
import { Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export default function VerificationObserverOffice({ verification, getData }) {
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
    const handleOnChange = (e) => {
        // name
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name])
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    const [verificationObserverOpen, setVerificationObserver] = useState(false);
    const verificationObservertoggle = () => setVerificationObserver(prevState => !prevState);
    const [localityofOfficeOpen, setLocalityofOffice] = useState(false);
    const localityofOfficetoggle = () => setLocalityofOffice(prevState => !prevState);
    // const [personMetOpen, setPersonMet] = useState(false);
    // const personMettoggle = () => setPersonMet(prevState => !prevState);
    // const [personMetOpen, setPersonMet] = useState(false);
    // const personMettoggle = () => setPersonMet(prevState => !prevState);
    // const [personMetOpen, setPersonMet] = useState(false);
    // const personMettoggle = () => setPersonMet(prevState => !prevState);
    // const [personMetOpen, setPersonMet] = useState(false);
    // const personMettoggle = () => setPersonMet(prevState => !prevState);
    // const [personMetOpen, setPersonMet] = useState(false);
    // const personMettoggle = () => setPersonMet(prevState => !prevState);
    const handleSubmit = (e) => {
        const formdata = new FormData(e.currentTarget)
        e.preventDefault()
        verification(formdata)
        // setData(formdata)
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
    }
    useEffect(() => {
        if (getData) {
            document.getElementById('officeVerificationObserver').click()
        }
        console.log('getdata', getData)
    }, [getData])

    return (
        <div>
            <h4>Verification Observer</h4>
            {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Type of Office</label>
                    {/* <Input type="text" name='verificationObserver' value={formdata['verificationObserver']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={verificationObserverOpen} toggle={verificationObservertoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['verificationObserver'] ? formdata['verificationObserver'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Independent Building'>Independent Building</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Commercial Gala'>Commercial Gala</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Industry or Factory'>Industry or Factory</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Office'>Office</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Shed'>Shed</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Shared Office'>Shared Office</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Shop'>Shop</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Resi cum Office'>Resi cum Office</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Clinic'>Clinic</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Godown'>Godown</DropdownItem>
                            <DropdownItem name='verificationObserver' onClick={(e) => handleOnChange(e.currentTarget)} value='Hosiptal or Nursing Home'>Hosiptal or Nursing Home</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Locality of Office</label>
                    {/* <Input type="text" name='localityofOffice' value={formdata['localityofOffice']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                    <Dropdown isOpen={localityofOfficeOpen} toggle={localityofOfficetoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['localityofOffice'] ? formdata['localityofOffice'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Complex'>Complex</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Commercial Building'>Commercial Building</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Business Center/Park'>Business Center/Park</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Market Area'>Market Area</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Slum'>Slum</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Residential'>Residential</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Factory or Industrail Area'>Factory or Industrail Area</DropdownItem>
                            <DropdownItem name='localityofOffice' onClick={(e) => handleOnChange(e.currentTarget)} value='Hosiptal/Mall/Commercial Premises'>Hosiptal/Mall/Commercial Premises</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <label>Construction Of Office</label>
                    <Input type="text" name='constructionOfOffice' value={formdata['constructionOfOffice']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Ease of Locating</label>
                    <Input type="text" name='easeofLocating' value={formdata['easeofLocating']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Exterior Condition</label>
                    <Input type="text" name='exteriorCondition' value={formdata['exteriorCondition']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Approx Area of Office (sq.ft)</label>
                    <Input type="text" name='approxAreaofOffice' value={formdata['approxAreaofOffice']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Business Activity Level</label>
                    <Input type="text" name='businessActivityLevel' value={formdata['businessActivityLevel']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>No. of Employees Working in Office/ Business or Seen in Premises</label>
                    <Input type="text" name='noOfEmployeesWorkinginPremises' value={formdata['noOfEmployeesWorkinginPremises']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Within Municipal Limits</label>
                    <Input type="text" name='withinMunicipalLimits' value={formdata['withinMunicipalLimits']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Distance from Neareast Railway Station</label>
                    <Input type="text" name='distanceFromRailwayStation' value={formdata['distanceFromRailwayStation']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Picture Political Leader</label>
                    <Input type="text" name='picturePoliticalLeader' value={formdata['picturePoliticalLeader']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Political Leader Details</label>
                    <Input type="text" name='politicalLeaderDetails' value={formdata['politicalLeaderDetails']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Asset Seen At Office</label>
                    <Input type="text" name='assetSeenAtOffice' value={formdata['assetSeenAtOffice']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Interior Conditions</label>
                    <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Stock Level</label>
                    <Input type="text" name='stockLevel' value={formdata['stockLevel']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Doc Verified</label>
                    <Input type="text" name='docVerified' value={formdata['docVerified']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Document Details</label>
                    <Input type="text" name='documentDetails' value={formdata['documentDetails']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Negative Area</label>
                    <Input type="text" name='negativeArea' value={formdata['negativeArea']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div className='d-none'>
                    <button type='submit' id='officeVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
}
