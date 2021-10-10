import React, { useEffect, useState } from 'react'
import { Button, Input } from 'reactstrap';

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
    })
    const [refresh, setRefresh] = useState(0)
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
                                <Input type="text" name="TPCName1"  value={formdata['TPCName1']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                            <td>
                                <Input type='text' name='status1'  value={formdata['status1']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1"  value={formdata['TPCRemark1']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>
                                <Input type="text" name="TPCName2"  value={formdata['TPCName2']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                            <td>
                                <Input type='text' name='status2'  value={formdata['status2']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark2"  value={formdata['TPCRemark2']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>
                                <Input type="text" name="TPCName3"  value={formdata['TPCName3']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                            <td>
                                <Input type='text' name='status3'  value={formdata['status3']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark3"  value={formdata['TPCRemark3']} onChange={(e) => handleOnChange(e.currentTarget)}  /></td>
                        </tr>
                    </tbody>
                </table>
                <h4 className='w-100'>TVR Comments</h4>
                <div>
                    <label>Number</label>
                    <Input type="text" name='TVRNumber'  value={formdata['TVRNumber']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Designation</label>
                    <Input type="text" name='TVRDesignation'  value={formdata['TVRDesignation']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Status</label>
                    <Input type="text" name='TVRStatus'  value={formdata['TVRStatus']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Business Name</label>
                    <Input type="text" name='TVRBusinessName'  value={formdata['TVRBusinessName']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>No of years in Business</label>
                    <Input type="text" name='TVRNoofyearsinBusiness'  value={formdata['TVRNoofyearsinBusiness']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='TVRRemarks'  value={formdata['TVRRemarks']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div className='w-100 mt-2'>
                    <h4>Final FI Status
                        <Button color='link'>Recheck</Button>
                        <Button color='danger' className='ms-2 me-2'>Override Changes</Button>
                        <Button color='info'>Show Working</Button>
                    </h4>
                </div>
                <div>
                    <label>Agency name</label>
                    <Input type="text" name='finalFIAgencyname'  value={formdata['finalFIAgencyname']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Standard Remarks</label>
                    <Input type="text" name='finalFIAnyRemarks'  value={formdata['finalFIAnyRemarks']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Remarks</label>
                    <Input type="text" name='finalFIRemarks'  value={formdata['finalFIRemarks']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Company Stamp</label>
                    <Input type="text" />
                </div>
                <div>
                    <label>Verifier Name</label>
                    <Input type="text" name='finalFIVerifierName'  value={formdata['finalFIVerifierName']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div>
                    <label>Product Supervisor</label>
                    <Input type="text" name='productSupervisor'  value={formdata['productSupervisor']} onChange={(e) => handleOnChange(e.currentTarget)}  />
                </div>
                <div className='d-none'>
                    <Button id='tpcdata' type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}
