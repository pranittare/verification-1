import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import DropDownComp from '../components/DropDownComp'

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

    let localityOfAddress = [
        {name:'localityOfAddress', value:'', label:'None'},
        {name:'localityOfAddress', value:'Complex', label:'Complex'},
        {name:'localityOfAddress', value:'Slum', label:'Slum'},
        {name:'localityOfAddress', value:'Market Area', label:'Market Area'},
        {name:'localityOfAddress', value:'Lower Middle Class', label:'Lower Middle Class'},
        {name:'localityOfAddress', value:'Middle Class', label:'Middle Class'},
        {name:'localityOfAddress', value:'Upper Middle Class', label:'Upper Middle Class'},
        {name:'localityOfAddress', value:'High Class', label:'High Class'},
    ]
    let typeOfHouse =  [
        {name:'typeOfHouse', value:'', label:'None'},
        {name:'typeOfHouse', value:'Flat', label:'Flat'},
        {name:'typeOfHouse', value:'Independent House', label:'Independent House'},
        {name:'typeOfHouse', value:'Part of Independent House', label:'Part of Independent House'},
        {name:'typeOfHouse', value:'Row House or Bungalow', label:'Row House or Bungalow'},
        {name:'typeOfHouse', value:'Multi Tenant House (Pagdi)', label:'Multi Tenant House (Pagdi)'},
        {name:'typeOfHouse', value:'Standing Chawl', label:'Standing Chawl'},
        {name:'typeOfHouse', value:'Sitting Chawl', label:'Sitting Chawl'},
        {name:'typeOfHouse', value:'Others', label:'Others'},
    ]
    let constructionOfResidence =  [
        {name:'constructionOfResidence', value:'', label:'None'},
        {name:'constructionOfResidence', value:'Strong', label:'Strong'},
        {name:'constructionOfResidence', value:'Semi Strong', label:'Semi Strong'},
        {name:'constructionOfResidence', value:'Temporary', label:'Temporary'},
    ]
    let accessibility =  [
        {name:'accessibility', value:'', label:'None'},
        {name:'accessibility', value:'Rail', label:'Rail'},
        {name:'accessibility', value:'Road', label:'Road'},
        {name:'accessibility', value:'All modes', label:'All modes'},
    ]
    let easeofLocating =  [
        {name:'easeofLocating', value:'', label:'None'},
        {name:'easeofLocating', value:'Easily Traceable', label:'Easily Traceable'},
        {name:'easeofLocating', value:'Difficult to Trace', label:'Difficult to Trace'},
        {name:'easeofLocating', value:'Not Traceable', label:'Not Traceable'},
    ]
    let customerAttitude =  [
        {name:'customerAttitude', value:'', label:'None'},
        {name:'customerAttitude', value:'Co-operative', label:'Co-operative'},
        {name:'customerAttitude', value:'Limited Information', label:'Limited Information'},
        {name:'customerAttitude', value:'Non Co-operative', label:'Non Co-operative'},
    ]
    let picturePoliticalLeader =  [
        {name:'picturePoliticalLeader', value:'', label:'None'},
        {name:'picturePoliticalLeader', value:'yes', label:'yes'},
        {name:'picturePoliticalLeader', value:'no', label:'no'}
    ]

    return (
        <div>
            <h4>Verification Observer</h4>
            {(refresh > 0 || true) && <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit} >
                <div>
                    <label>Locality of Address</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={localityOfAddress} />
                </div>
                <div>
                    <label>Type of House</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={typeOfHouse} />
                </div>
                <div>
                    <label>Type of House Others</label>
                    <Input type="text" name='typeOfHouseOthers' value={formdata['typeOfHouseOthers']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Construction Of Residence</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={constructionOfResidence} />
                </div>
                <div>
                    <label>Accessibility/Approachibility</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={accessibility} />
                </div>
                <div>
                    <label>Ease of Locating</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={easeofLocating} />
                </div>
                <div>
                    <label>Interior Conditions</label>
                    <Input type="text" name='interiorConditions' value={formdata['interiorConditions']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Exterior Condition</label>
                    <Input type="text" name='exteriorConditions' value={formdata['exteriorConditions']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Area of Residence (sq.ft)</label>
                    <Input type="text" name='areaofResidence' value={formdata['areaofResidence']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Customer Attitude</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={customerAttitude} />
                </div>
                <div>
                    <label>Distance from Station</label>
                    <Input type="text" name='distancefromStation' value={formdata['distancefromStation']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Picture Political Leader</label>
                    <DropDownComp id='verificationObserverResident' onHandleChange={(e)=>onHandleChange(e)} formdata={formdata} dropDowmArry={picturePoliticalLeader} />
                </div>
                <div>
                    <label>Political Leader Details</label>
                    <Input type="text" name='politicalLeaderDetails' value={formdata['politicalLeaderDetails']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Asset Seen At Residence</label>
                    <Input type="text" name='assetSeenAtResidence' value={formdata['assetSeenAtResidence']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Negative Area</label>
                    <Input type="text" name='negativeArea' value={formdata['negativeArea']} onChange={(e) => onHandleChange(e.currentTarget)} />
                </div>
                <div className="d-none">
                    <button type='submit' id='residentVerificationObserver'>Submit</button>
                </div>
            </form>
            }
        </div>
    )
}
