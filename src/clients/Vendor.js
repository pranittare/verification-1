import React, { useState, useEffect } from 'react'
import AddVendor from './AddVendor';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Vendor = ({ vendors }) => {
    console.log('vendors', vendors)

    const [clientInfo, setClientInfo] = useState({
        vendorCode: '',
        clientName: '',
        location: '',
        address: '',
        gstNo: '',
        agreementDate: '',
        renewalDate: '',
        localCost: '',
        ICGLCost: '',
        OGLCost: '',
        contactPerson: '',
        contactNo: ''
    })

    const onHandleChange = (e) => {
        let clientForm = { ...clientInfo }
        clientForm[e.name] = e.value
        setClientInfo(clientForm)
    }

    const toggle = () => {
        setClientInfo(false)
    }

    return (
        <div>
            <AddVendor />

            <div>
                <Modal isOpen={clientInfo}>
                    <ModalHeader>
                        {clientInfo?.clientName}
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>

                            <div className='col-6'>
                                <div>
                                    <label>Vendor Code</label>
                                    <input name='vendorCode' value={clientInfo.vendorCode} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Client Name</label>
                                    <input name='clientName' value={clientInfo.clientName} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Location</label>
                                    <input name='location' value={clientInfo.location} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Address</label>
                                    <input name='address' value={clientInfo.address} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>GST No.</label>
                                    <input name='gstNo' value={clientInfo.gstNo} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Agreement Date</label>
                                    <input name='agreementDate' value={moment(clientInfo?.agreementDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div>
                                    <label>Renewal Date</label>
                                    <input name='renewalDate' value={moment(clientInfo?.renewalDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Local Cost</label>
                                    <input name='localCost' value={clientInfo.localCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>ICGL Cost</label>
                                    <input name='ICGLCost' value={clientInfo.ICGLCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>OGL Cost</label>
                                    <input name='OGLCost' value={clientInfo.OGLCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Contact Person</label>
                                    <input name='contactPerson' value={clientInfo.contactPerson} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Contact No.</label>
                                    <input name='contactNo' value={clientInfo.contactNo} onChange={(e) => onHandleChange(e.target)} />
                                </div>
                            </div>

                            <div className='col-12'>
                                <button style={{ marginTop: 20 }}>Add Product</button>
                                <div>
                                    <label>Product</label>
                                    <p>(Add atLeast 1 email id per product!)</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                    <button className='mt-2'>Add Email</button>
                                    <p>Email Id</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                </div>
                                <div>
                                    <label>Product</label>
                                    <p>(Add atLeast 1 email id per product!)</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                    <button className='mt-2'>Add Email</button>
                                    <p>Email Id</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                </div>
                                <div>
                                    <label>Product</label>
                                    <p>(Add atLeast 1 email id per product!)</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                    <button className='mt-2'>Add Email</button>
                                    <p>Email Id</p>
                                    <div className='d-flex'>
                                        <input className='form-control' />
                                        <button className='text-danger' style={{ border: 'none', padding: 8, backgroundColor: 'transparent' }}>X</button>
                                    </div>
                                </div>
                                <br />
                                <p>Upload Docs</p>
                                <button>Choose File</button>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <button> Add </button>
                        <button onClick={() => toggle()}> Cancel </button>
                    </ModalFooter>
                </Modal>
            </div>

            <table className="table table-striped mt-2">
                <thead>
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Date of Entry</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vendor Code</th>
                        <th scope="col">Locations</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((item, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                {/* {{item.agreementDate.seconds * 1000 | date:'mediumDate'}}  */}
                                {moment(item.agreementDate.seconds * 1000).format("MMM Do YYYY")}
                            </td>
                            <td>
                                <button className="btn text-primary" data-toggle="modal"
                                    data-target="#exampleModal" onClick={() => setClientInfo(item)} >
                                    {item.clientName}
                                </button>
                            </td>
                            <td>
                                {item.vendorCode}
                            </td>
                            <td>
                                {item.location}
                            </td>
                            <td>
                                <button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" >X</button>
                                <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Are You Sure you want to Delete
                                                    {/* {{itemdata?.vendorCode}} */}
                                                </h5>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                                <button type="button" className="btn btn-danger">Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        vendors: state.vendors
    }
}
export default connect(mapStateToProps)(Vendor);