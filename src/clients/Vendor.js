import React, { useState } from 'react'
import AddVendor from './AddVendor';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Vendor = ({ vendors }) => {
    console.log('vendors', vendors)

    const [clientInfo, setClientInfo] = useState({
        vendorCode: '',
        clientName: '',
        location: '',
        address: '',
        gstNo: '',
        localCost: '',
        ICGLCost: '',
        OGLCost: '',
        contactPerson: '',
        contactNo: '',
        productList: [],
        newEmail: '',
        newProduct: '',
        agreementDate: new Date(),
        renewalDate: new Date(),

    });


    const [addProduct, setAddProduct] = useState(false);
    const [addEmail, setAddEmail] = useState(false);

    const onHandleChange = (e) => {
        let clientForm = { ...clientInfo }
        clientForm[e.name] = e.value
        setClientInfo(clientForm)
    }
    const onHandleChangeProduct = (e, index) => {
        let productForm = { ...clientInfo }
        productForm.productList[index].productName = e.value
        setClientInfo(productForm)
    }
    const onHandleChangeEdit = (e, index, index1) => {
        let emailList = { ...clientInfo }
        emailList.productList[index1].emailList[index].email = e.value
        setClientInfo(emailList)
    }
    const addProductFnc = () => {
        let form = { ...clientInfo }
        form.productList.push({ productName: form.newProduct, emailList: [] })
        setClientInfo(form)
        setAddProduct(false)
        setAddEmail(false)
    }
    const addEmailfnc = (index) => {
        let form = { ...clientInfo }
        form.productList[index].emailList.push({ email: form.newEmail })
        setClientInfo(form)
        setAddProduct(false)
        setAddEmail(false)

    }
    const [product, setProduct] = useState();
    const [productDropdown, setProductDropdown] = useState(false);
    const toggleProduct = () => {
        setProductDropdown(!productDropdown);
    }
    const onHandleDeleteEmail = (emailIndex, productIndex) => {
        let form = { ...clientInfo }
        form.productList[productIndex].emailList.splice(emailIndex, 1)
        setClientInfo(form)

    }
    const onHandleDeleteProduct = (productIndex) => {
        let form = { ...clientInfo }
        form.productList.splice(productIndex, 1)
        setClientInfo(form)
    }

    const toggle = () => {
        setClientInfo(false);
    }
    const toggleAddProduct = () => {
        setAddProduct(!addProduct)
    }
    const toggleAddEmail = () => {
        setAddEmail(!addEmail)
    }
    return (
        <div>
            <AddVendor setClientInfo={(data)=> setClientInfo(data)}/>

            <div>
                <Modal isOpen={clientInfo}>
                    <ModalHeader>
                        {clientInfo?.clientName ? clientInfo?.clientName : "Add Client"}
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
                                    <DatePicker className='form-control' placeholderText='Start Date' selected={clientInfo?.agreementDate?.seconds * 1000 ? clientInfo?.agreementDate?.seconds * 1000 : new Date()} 
                                    onChange={(date) => setClientInfo(...clientInfo, {agreementDate: date})}
                                    />
                                    {/* <Input name='agreementDate' value={moment(clientInfo?.agreementDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} /> */}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div>
                                    <label>Renewal Date</label>
                                    <DatePicker className='form-control' placeholderText='Start Date' selected={clientInfo?.renewalDate?.seconds * 1000 ? clientInfo?.renewalDate?.seconds * 1000 : new Date()} 
                                    onChange={(date) => setClientInfo(...clientInfo, {renewalDate: date})} />
                                    {/* <Input name='renewalDate' value={moment(clientInfo?.renewalDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} /> */}
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
                                <Button className='mt-2' onClick={toggleAddProduct}>Add Product</Button>
                                {addProduct && <div>
                                    <p className='my-1'>Product Name</p>
                                    <div className='d-flex'>
                                        <Input value={clientInfo.newProduct} onChange={(e) => onHandleChange(e.target)} name='newProduct' />
                                        <Button color='primary' outline style={{ border: 'none', fontSize: '25px' }} onClick={addProductFnc}>+</Button>
                                    </div>
                                </div>}
                                <Dropdown className='mt-2' isOpen={productDropdown}>
                                    <DropdownToggle onClick={toggleProduct} color='primary'>
                                        {product ? product.item.productName : 'None'}
                                    </DropdownToggle>
                                    <DropdownMenu className='overflow-auto' style={{ maxHeight: 300 }}>
                                        {clientInfo?.productList?.map((item, index) => {
                                            return <DropdownItem key={item?.productName} onClick={() => setProductDropdown(true)}>
                                                <div className='d-flex'>
                                                    <Input value={item?.productName} onClick={() => setProduct({ item, index })} name={item?.productName} onChange={(e) => onHandleChangeProduct(e.target, index)} />
                                                    <Button color='danger' outline style={{ border: 'none' }} onClick={() => onHandleDeleteProduct(index)}>X</Button>
                                                </div>
                                            </DropdownItem>
                                        })}

                                    </DropdownMenu>
                                </Dropdown>
                                {product && <div>
                                    <Button color='success' onClick={toggleAddEmail} className='my-2'>Add Email</Button>
                                    {addEmail && <div>
                                        <p className='my-1'>Email Id</p>
                                        <div className='d-flex'>
                                            <Input value={clientInfo.newEmail} onChange={(e) => onHandleChange(e.target)} name='newEmail' />
                                            <Button onClick={() => addEmailfnc(product.index)} color='primary' outline style={{ border: 'none', fontSize: '25px' }}>+</Button>
                                        </div>
                                    </div>}
                                </div>
                                }
                                <div className='overflow-auto' style={{ maxHeight: 300 }}>
                                    {product?.item.emailList?.map((item1, index) => {
                                        return <div><p className='my-1'>Email Id</p>
                                            <div className='d-flex'>
                                                <Input value={item1.email} onChange={(e) => onHandleChangeEdit(e.target, index, product.index)} />
                                                <Button color='danger' onClick={() => onHandleDeleteEmail(index, product.index)} outline style={{ border: 'none' }}>X</Button>
                                            </div>
                                        </div>
                                    })}

                                </div>
                                <br />
                                <p>Upload Docs</p>
                                <Button>Choose File</Button>
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => console.log('form', clientInfo)}> Add </Button>
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