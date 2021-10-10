import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'

export default function VerificationObserverResident({ verification, getData }) {
    const [refresh, setRefresh] = useState(0)
    const [formdata, setFormdata] = useState({
        localityOfAddress: '',
        typeOfHouse: '',
        typeOfHouseOthers: '',
        constructionOfResidence: '',
        accessibility: '',
        easeofLocating: '',
        interiorConditions: '',
        exteriorConditions: '',
        areaofResidence: '',
        customerAttitude: '',
        distancefromStation: '',
        picturePoliticalLeader: '',
        politicalLeaderDetails: '',
        assetSeenAtResidence: '',
        negativeArea: ''
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
            document.getElementById('residentVerificationObserver').click()
        }
        console.log('getdata', getData)
    }, [getData])
    return (
        <div>
            <h4>Verification Observer</h4>
            {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Locality of Address</label>
                    <Input type="text" name='localityOfAddress' value={formdata['localityOfAddress']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Type of House</label>
                    <Input type="text" name='typeOfHouse' value={formdata['typeOfHouse']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Type of House Others</label>
                    <Input type="text" name='typeOfHouseOthers' value={formdata['typeOfHouseOthers']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Construction Of Residence</label>
                    <Input type="text" name='constructionOfResidence' value={formdata['constructionOfResidence']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Accessibility/Approachibility</label>
                    <Input type="text" name='accessibility' value={formdata['accessibility']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Ease of Locating</label>
                    <Input type="text" name='easeofLocating' value={formdata['easeofLocating']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Interior Conditions</label>
                    <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Exterior Condition</label>
                    <Input type="text" name='exteriorConditions' value={formdata['exteriorConditions']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Area of Residence (sq.ft)</label>
                    <Input type="text" name='areaofResidence' value={formdata['areaofResidence']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Customer Attitude</label>
                    <Input type="text" name='customerAttitude' value={formdata['customerAttitude']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Distance from Station</label>
                    <Input type="text" name='distancefromStation' value={formdata['distancefromStation']} onChange={(e) => handleOnChange(e.currentTarget)} />
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
                    <label>Asset Seen At Residence</label>
                    <Input type="text" name='assetSeenAtResidence' value={formdata['assetSeenAtResidence']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Negative Area</label>
                    <Input type="text" name='negativeArea' value={formdata['negativeArea']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div className="d-none">
                    <button type='submit' id='residentVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
}
