import React, { useEffect, useState } from 'react'
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';

export default function Tpc({ tpc, getData }) {
    const [formdata, setFormdata] = useState({
        TPCName1: '',
        status1: '',
        TPCRemark1: '',
        TPCName2: '',
        status2: '',
        TPCRemark2: '',
        TPCName3: '',
        status3: '',
        TPCRemark3: '',
        TVRNumber: '',
        TVRDesignation: '',
        TVRStatus: '',
        TVRBusinessName: '',
        TVRNoofyearsinBusiness: '',
        TVRRemarks: '',
        finalFIAgencyname: '',
        finalFIAnyRemarks: '',
        finalFIRemarks: '',
        finalFIVerifierName: '',
        productSupervisor: '',
        marketReputation: '',
        TPCRemarks: '',
        overallStatus: '',
    })
    const [refresh, setRefresh] = useState(0)
    const [status1Open, setStatus1] = useState(false);
    const status1toggle = () => setStatus1(prevState => !prevState);
    const [status2Open, setStatus2] = useState(false);
    const status2toggle = () => setStatus2(prevState => !prevState);
    const [status3Open, setStatus3] = useState(false);
    const status3toggle = () => setStatus3(prevState => !prevState);
    const [marketReputationOpen, setMarketReputation] = useState(false);
    const marketReputationtoggle = () => setMarketReputation(prevState => !prevState);
    const [TVRStatusOpen, setTVRStatus] = useState(false);
    const TVRStatustoggle = () => setTVRStatus(prevState => !prevState);
    const [overallStatusOpen, setOverallStatus] = useState(false);
    const overallStatustoggle = () => setOverallStatus(prevState => !prevState);

    const handleOnChange = (e) => {
        // name
        let form = formdata
        form[e.name] = e.value
        // console.log(e, form[e.name] )
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    const handleSubmit = (e) => {
        const formData = new FormData(e.currentTarget);
        e.preventDefault()
        tpc(formData)
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
    }
    useEffect(() => {
        if (getData) {
            document.getElementById('tpcdata').click()
        }
        console.log('getdata', getData)
    }, [getData])

    let status1 = [
        {name:'status1', value:'', label:'None'},
        {name:'status1', value:'positive', label:'Positive'},
        {name:'status1', value:'negative', label:'Negative'},
    ]

    let status2 = [
        {name:'status2', value:'', label:'None'},
        {name:'status2', value:'positive', label:'Positive'},
        {name:'status2', value:'negative', label:'Negative'},
    ]

    let status3 = [
        {name:'status3', value:'', label:'None'},
        {name:'status3', value:'positive', label:'Positive'},
        {name:'status3', value:'negative', label:'Negative'},
    ]

    let marketReputation = [
        {name:'marketReputation', value:'', label:'None'},
        {name:'marketReputation', value:'positive', label:'Positive'},
        {name:'marketReputation', value:'negative', label:'Negative'},
    ]

    let TVRStatus = [
        {name:'TVRStatus', value:'', label:'None'},
        {name:'TVRStatus', value:'positive', label:'Positive'},
        {name:'TVRStatus', value:'negative', label:'Negative'},
    ]

    let overallStatus = [
        {name:'overallStatus', value:'', label:'None'},
        {name:'overallStatus', value:'Recomended', label:'Recomended'},
        {name:'overallStatus', value:'Refer', label:'Refer'},
        {name:'overallStatus', value:'Not Recomended', label:'Not Recomended'},
    ]

    return (
        <div>
            <h4>TPC Confirmation</h4>
            <form className='d-flex justify-content-between flex-wrap' onSubmit={handleSubmit}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Remark /Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>
                                <Input type="text" name="TPCName1" value={formdata['TPCName1']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>

                                <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={status1} />
                            <td>
                                {/* <Input type='text' name='status1'  value={formdata['status1']} onChange={(e) => handleOnChange(e.currentTarget)}  /> */}
                                {/* <Dropdown isOpen={status1Open} toggle={status1toggle}>
                                    <DropdownToggle caret className='text-capitalize'>
                                        {formdata['status1'] ? formdata['status1'] : 'None'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem name='status1' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                                        <DropdownItem name='status1' onClick={(e) => handleOnChange(e.currentTarget)} value='positive'>Positive</DropdownItem>
                                        <DropdownItem name='status1' onClick={(e) => handleOnChange(e.currentTarget)} value='negative'>Negative</DropdownItem>

                                    </DropdownMenu>
                                </Dropdown> */}
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" value={formdata['TPCRemark1']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>
                                <Input type="text" name="TPCName2" value={formdata['TPCName2']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>

                                <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={status2} />
                            <td>
                                {/* <Input type='text' name='status2' value={formdata['status2']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                                {/* <Dropdown isOpen={status2Open} toggle={status2toggle}>
                                    <DropdownToggle caret className='text-capitalize'>
                                        {formdata['status2'] ? formdata['status2'] : 'None'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem name='status2' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                                        <DropdownItem name='status2' onClick={(e) => handleOnChange(e.currentTarget)} value='positive'>Positive</DropdownItem>
                                        <DropdownItem name='status2' onClick={(e) => handleOnChange(e.currentTarget)} value='negative'>Negative</DropdownItem>

                                    </DropdownMenu>
                                </Dropdown> */}
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark2" value={formdata['TPCRemark2']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>
                                <Input type="text" name="TPCName3" value={formdata['TPCName3']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>

                                <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={status3} />
                            <td>
                                {/* <Input type='text' name='status3' value={formdata['status3']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                                {/* <Dropdown isOpen={status3Open} toggle={status3toggle}>
                                    <DropdownToggle caret className='text-capitalize'>
                                        {formdata['status3'] ? formdata['status3'] : 'None'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem name='status3' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                                        <DropdownItem name='status3' onClick={(e) => handleOnChange(e.currentTarget)} value='positive'>Positive</DropdownItem>
                                        <DropdownItem name='status3' onClick={(e) => handleOnChange(e.currentTarget)} value='negative'>Negative</DropdownItem>

                                    </DropdownMenu>
                                </Dropdown> */}
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark3" value={formdata['TPCRemark3']} onChange={(e) => handleOnChange(e.currentTarget)} /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <label>Market Reputation/Dedup Check</label>
                    <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={marketReputation} />
                    {/* <Dropdown isOpen={marketReputationOpen} toggle={marketReputationtoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['marketReputation'] ? formdata['marketReputation'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='marketReputation' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='marketReputation' onClick={(e) => handleOnChange(e.currentTarget)} value='positive'>Positive</DropdownItem>
                            <DropdownItem name='marketReputation' onClick={(e) => handleOnChange(e.currentTarget)} value='negative'>Negative</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='TPCRemarks' value={formdata['TPCRemarks']} onChange={(e) => handleOnChange(e.currentTarget)} />

                </div>
                <h4 className='w-100'>TVR Comments</h4>
                <div>
                    <label>Number</label>
                    <Input type="text" name='TVRNumber' value={formdata['TVRNumber']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Designation</label>
                    <Input type="text" name='TVRDesignation' value={formdata['TVRDesignation']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Status</label>

                    <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={TVRStatus} />
                    {/* <Input type="text" name='TVRStatus' value={formdata['TVRStatus']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                    <div>
                    {/* <Dropdown isOpen={TVRStatusOpen} toggle={TVRStatustoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['TVRStatus'] ? formdata['TVRStatus'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='TVRStatus' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='TVRStatus' onClick={(e) => handleOnChange(e.currentTarget)} value='positive'>Positive</DropdownItem>
                            <DropdownItem name='TVRStatus' onClick={(e) => handleOnChange(e.currentTarget)} value='negative'>Negative</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                </div>
                <div>
                    <label>Business Name</label>
                    <Input type="text" name='TVRBusinessName' value={formdata['TVRBusinessName']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>No of years in Business</label>
                    <Input type="text" name='TVRNoofyearsinBusiness' value={formdata['TVRNoofyearsinBusiness']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='TVRRemarks' value={formdata['TVRRemarks']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div className='w-100 mt-2'>
                    <h4>Final FI Status
                        <Button color='link'>Recheck</Button>
                        <Button color='danger' className='ms-2 me-2'>Override Changes</Button>
                        <Button color='info'>Show Working</Button>
                    </h4>
                </div>
                <div>
                    <label>Status</label>

                    <DropDownComp handleOnChange={(e)=>handleOnChange()} formdata={formdata} dropDowmArry={overallStatus} />
                    {/* <Input type="text" name='TVRStatus' value={formdata['TVRStatus']} onChange={(e) => handleOnChange(e.currentTarget)} /> */}
                    {/* <Dropdown isOpen={overallStatusOpen} toggle={overallStatustoggle}>
                        <DropdownToggle caret className='text-capitalize'>
                            {formdata['overallStatus'] ? formdata['overallStatus'] : 'None'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name='overallStatus' onClick={(e) => handleOnChange(e.currentTarget)} value=''>None</DropdownItem>
                            <DropdownItem name='overallStatus' onClick={(e) => handleOnChange(e.currentTarget)} value='Recommended'>Recommended</DropdownItem>
                            <DropdownItem name='overallStatus' onClick={(e) => handleOnChange(e.currentTarget)} value='Refer'>Refer</DropdownItem>
                            <DropdownItem name='overallStatus' onClick={(e) => handleOnChange(e.currentTarget)} value='Not Recommended'>Not Recommended</DropdownItem>

                        </DropdownMenu>
                    </Dropdown> */}
                </div>
                <div>
                    <label>Agency name</label>
                    <Input type="text" name='finalFIAgencyname' value={formdata['finalFIAgencyname']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Standard Remarks</label>
                    <Input type="text" name='finalFIAnyRemarks' value={formdata['finalFIAnyRemarks']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='finalFIRemarks' value={formdata['finalFIRemarks']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Company Stamp</label>
                    <Input type="text" />
                </div>
                <div>
                    <label>Verifier Name</label>
                    <Input type="text" name='finalFIVerifierName' value={formdata['finalFIVerifierName']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div>
                    <label>Product Supervisor</label>
                    <Input type="text" name='productSupervisor' value={formdata['productSupervisor']} onChange={(e) => handleOnChange(e.currentTarget)} />
                </div>
                <div className='d-none'>
                    <Button id='tpcdata' type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}
