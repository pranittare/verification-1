import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc, Timestamp } from "firebase/firestore"
import { getStorage, ref as refStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const Vendor = ({ vendors }) => {
    const storage = getStorage();
    const fdb = getFirestore();

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
        key: ''

    });


    const [addProduct, setAddProduct] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [gstWarning, setGstWarning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [getUrlDetails, setUrlDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const regex = new RegExp('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onHandleChange = (e) => {
        let clientForm = { ...clientInfo }
        clientForm[e.name] = e.value
        if (e.name === 'gstNo') {
            setGstWarning(regex.test(e.value))
        }
        setClientInfo(clientForm)
    }
    const onHandleDateChange = (name, data) => {
        let clientForm = { ...clientInfo }
        clientForm[name] = { seconds: data.getTime() / 1000 }
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
        if (!form.productList) {
            form.productList = []
        }
        form.productList.push({ productName: form.newProduct, emailList: [] })
        form.newProduct = ''
        setClientInfo(form)
        setAddProduct(false)
        setAddEmail(false)
    }
    const addEmailfnc = (index) => {
        let form = { ...clientInfo }
        form.productList[index].emailList.push({ email: form.newEmail })
        form.newEmail = ''
        setClientInfo(form)
        setAddProduct(false)
        setAddEmail(false)

    }
    const [product, setProduct] = useState();
    // const [productDropdown, setProductDropdown] = useState(false);
    // const toggleProduct = () => {
    //     setProductDropdown(!productDropdown);
    // }
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
        // setClientInfo(false);
        setIsModalOpen(false)
    }
    const toggleAddProduct = () => {
        setAddProduct(!addProduct)
    }
    const toggleAddEmail = () => {
        setAddEmail(!addEmail)
    }
    const getDownloadURLFile = (vendorCode, storageReference) => {
        const filePath = `vendors/${vendorCode}`;
        let storageRef = refStorage(storage, filePath)
        if (storageReference) {
            storageRef = storageReference
        }
        getDownloadURL(storageRef).then((downloadURL) => {
            setUrlDetails(downloadURL)
        }).catch((err) => {
            alert(err.message)
        })
    }
    const handleUploadFile = (event, vendorCode) => {
        const file = event.target.files[0];
        const filePath = `vendors/${vendorCode}`;
        const storageRef = refStorage(storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default: console.log('default');
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURLFile(vendorCode, uploadTask.snapshot.ref)
            }
        )

    }
    const addVendorToDB = (data) => {
        if (data) {
            let form = {...data}
            setLoading(true)
            form.agreementDate = form.agreementDate.seconds ? Timestamp.fromDate(new Date(form.agreementDate.seconds * 1000)) : Timestamp.fromDate(new Date(form.agreementDate))
            form.renewalDate = form.renewalDate.seconds ? Timestamp.fromDate(new Date(form.renewalDate.seconds * 1000)) : Timestamp.fromDate(new Date(form.renewalDate))
            console.log('data', data)
            
            if (form.key) {
                const clientUpdateRef = doc(fdb, `vendors/${form.key}`)
                updateDoc(clientUpdateRef, form).then(res => {
                    console.log('res update', res)
                    window.location.reload()
                    setLoading(false)
                })
            } else {
                addDoc(collection(fdb, "vendors"), form).then(res => {
                    console.log('res', res)
                    window.location.reload()
                }).catch(() => {
                    setLoading(false)
                })
            }
            setLoading(false)
        }
    }
    const [deleteModal, setDeleteModal] = useState(false)
    const handleDeleteClient = () => {
        if (deleteModal.key) {
            const clientUpdateRef = doc(fdb, "vendors", deleteModal.key)
            deleteDoc(clientUpdateRef).then(res => {
                console.log('res update', res)
                setDeleteModal(false)
                window.location.reload()
            })
        }
    }

    return (
        <div>
            <div className='d-flex my-2'>
                <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>Add Vendor</button>
            </div>


            <div>
                <Modal isOpen={isModalOpen}>
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
                                    <label className={!gstWarning ? 'text-danger' : ''}>GST No.{!gstWarning && ' Enter Valid Number'} </label>
                                    <Input name='gstNo' value={clientInfo.gstNo} onChange={(e) => onHandleChange(e.target)} />
                                </div>

                                <div>
                                    <label>Agreement Date</label>
                                    <DatePicker className='form-control' placeholderText='Start Date' selected={clientInfo?.agreementDate?.seconds * 1000 ? clientInfo?.agreementDate?.seconds * 1000 : new Date()}
                                        onChange={(date) => onHandleDateChange('agreementDate', date)}
                                    />
                                    {/* <Input name='agreementDate' value={moment(clientInfo?.agreementDate?.seconds * 1000).format("MMM Do YYYY")} onChange={(e) => onHandleChange(e.target)} /> */}
                                </div>
                            </div>

                            <div className='col-6'>
                                <div>
                                    <label>Renewal Date</label>
                                    <DatePicker className='form-control' placeholderText='Start Date' selected={clientInfo?.renewalDate?.seconds * 1000 ? clientInfo?.renewalDate?.seconds * 1000 : new Date()}
                                        onChange={(date) => onHandleDateChange('renewalDate', date)}
                                    />
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
                                <div className='overflow-auto' style={{ maxHeight: 300 }}>
                                    {clientInfo?.productList?.map((item, index) => {
                                        return <div key={item?.productName}>
                                            <div className='d-flex my-2'>
                                                <Input value={item?.productName} onClick={() => setProduct({ item, index })} name={item?.productName} onChange={(e) => onHandleChangeProduct(e.target, index)} />
                                                <Button color='danger' outline style={{ border: 'none' }} onClick={() => onHandleDeleteProduct(index)}>X</Button>
                                            </div>
                                        </div>
                                    })}

                                </div>
                                {/* <Dropdown className='mt-2' isOpen={productDropdown}>
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
                                </Dropdown> */}
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
                                <input type='file' onChange={(event) => handleUploadFile(event, clientInfo.vendorCode)} />
                                {(progress > 0 && progress !== 100) && <Progress value={progress} />}
                                <br />
                                {!getUrlDetails ? <Button onClick={() => getDownloadURLFile(clientInfo.vendorCode)}>Check for Files</Button>
                                    :
                                    <a href={getUrlDetails} target='_blank' rel="noreferrer">Download File</a>
                                }
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        {!loading && <Button color='primary' onClick={() => addVendorToDB(clientInfo)}> Add/Save </Button>}
                        <Button color='danger' onClick={() => { toggle(); setGstWarning(false) }}> Cancel </Button>
                        <Button onClick={() => setUrlDetails(false)}>Recheck Download</Button>
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
                                {moment(item?.agreementDate?.seconds * 1000).format("MMM Do YYYY")}
                            </td>
                            <td>
                                <Button color='link' data-toggle="modal"
                                    data-target="#exampleModal" onClick={() => { setClientInfo(item); setIsModalOpen(true) }} >
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
                                <Button className="btn btn-danger" type='button' onClick={() => setDeleteModal(item)}>X</Button>


                            </td>
                        </tr>
                    })}

                    <Modal isOpen={deleteModal}>
                        <ModalHeader>Are You Sure you want to Delete</ModalHeader>
                        <ModalFooter>
                            <Button onClick={() => handleDeleteClient()} color='danger'>Yes</Button>
                            <Button onClick={() => setDeleteModal(false)}>No</Button>
                        </ModalFooter>
                    </Modal>
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