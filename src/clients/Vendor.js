import React, { useState, useEffect } from 'react'
import AddVendor from './AddVendor';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp'
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
        contactNo: '',
        productList: []
    })

    const onHandleChange = (e) => {
        let clientForm = { ...clientInfo }
        clientForm[e.name] = e.value
        setClientInfo(clientForm)
    }
    const [product, setProduct] = useState();
    const [productDropdown, setProductDropdown] = useState(false);
    const toggleProduct = () => {
        setProductDropdown(!productDropdown);
    }

    const toggle = () => {
        setClientInfo(false);
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
                                    <Input name='vendorCode' value={clientInfo.vendorCode} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Client Name</label>
                                    <Input name='clientName' value={clientInfo.clientName} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Location</label>
                                    <Input name='location' value={clientInfo.location} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Address</label>
                                    <Input name='address' value={clientInfo.address} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>GST No.</label>
                                    <Input name='gstNo' value={clientInfo.gstNo} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Agreement Date</label>
                                    <Input name='agreementDate' value={moment(clientInfo?.agreementDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div>
                                    <label>Renewal Date</label>
                                    <Input name='renewalDate' value={moment(clientInfo?.renewalDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Local Cost</label>
                                    <Input name='localCost' value={clientInfo.localCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>ICGL Cost</label>
                                    <Input name='ICGLCost' value={clientInfo.ICGLCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>OGL Cost</label>
                                    <Input name='OGLCost' value={clientInfo.OGLCost} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Contact Person</label>
                                    <Input name='contactPerson' value={clientInfo.contactPerson} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Contact No.</label>
                                    <Input name='contactNo' value={clientInfo.contactNo} onChange={(e) => onHandleChange(e.target)} />
                                </div>
                            </div>

                            <div className='col-12'>
                                <Button className='mt-2'>Add Product</Button>
                                <Dropdown isOpen={productDropdown}>
                                    <DropdownToggle onClick={toggleProduct}>
                                        {product ? product : 'None'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    {clientInfo?.productList?.map(item => {
                                        return <DropdownItem key={item?.productName} onClick={()=> setProductDropdown(true)}>
                                              <div className='d-flex'>
                                            <Input value={item?.productName} onClick={()=>setProduct(item?.productName)}/>
                                            <Button color='danger' outline style={{border: 'none'}} onClick={()=> alert('del')}>X</Button>
                                        </div>
                                        </DropdownItem>
                                })}

                                    </DropdownMenu>
                                </Dropdown>
                                {clientInfo?.productList?.map(item => {
                                    return <div>
                                        <label>Product</label>
                                        <p>(Add atLeast 1 email id per product!)</p>
                                        <div className='d-flex'>
                                            <Input value={item?.productName} />
                                            <Button color='danger' outline style={{border: 'none'}}>X</Button>
                                        </div>
                                        <Button className='mt-2'>Add Email</Button>
                                        {item?.emailList?.map(item1 => {
                                            return <div><p>Email Id</p>
                                                <div className='d-flex'>
                                                    <Input value={item1.email}/>
                                                    <Button color='danger' outline style={{border: 'none'}}>X</Button>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                })}
                                <br />
                                <p>Upload Docs</p>
                                <Button>Choose File</Button>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary'> Add </Button>
                        <Button color='danger' onClick={() => toggle()}> Cancel </Button>
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
                                <Button color='link' data-toggle="modal"
                                    data-target="#exampleModal" onClick={() => setClientInfo(item)} >
                                    {item.clientName}
                                </Button>
                            </td>
                            <td>
                                {item.vendorCode}
                            </td>
                            <td>
                                {item.location}
                            </td>
                            <td>
                                <Button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" >X</Button>
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
                                                <Button type="Button" className="btn btn-secondary" data-dismiss="modal">No</Button>
                                                <Button type="Button" className="btn btn-danger">Yes</Button>
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