import React, { useState } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddAgent() {

    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [downloadUrl, setDownloadUrl] = useState(false)
    const initalState = {
        agentCode: '',
        name: '',
        address: '',
        location: '',
        pincode: '',
        pincodes: '',
        mobile1: '',
        mobile2: '',
        userId: '',
        kycUpdateDate: '',
        kycreneweddate: '',
        password: '',
        remarks: '',
    }
    const [formdata, setFormdata] = useState({
        agentCode: '',
        name: '',
        address: '',
        location: '',
        pincode: '',
        pincodes: '',
        mobile1: '',
        mobile2: '',
        userId: '',
        kycUpdateDate: '',
        kycreneweddate: '',
        password: '',
        remarks: '',
    })

    const toggle = () => {
        setFormdata(initalState)
        setModal(!modal)};
    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        setFormdata(form)
        setRefresh(Math.random())
        console.log(form)
    }
    const onSubmit = () => {
        let form = formdata
        let secondarypincodes = []
        let secondary = form['pincodes'].replace(/\s/g, "X").split(',')
        for (let index = 0; index < secondary.length; index++) {
            const element = secondary[index];
            secondarypincodes.push({ pincodes: element })
        }
        console.log(secondarypincodes)
    }
    const uploadFile = (e) => {
        const file = e.target.files[0];
        const filePath = `agents/${formdata['agentCode']}`;
        console.log('upload', file)
        if (window.confirm('Are you sure you want to Upload')) {
            const storage = getStorage();
            const storageRef = ref(storage, filePath);
            uploadBytes(storageRef, file).then((snapshot) => {
                // console.log('Uploaded a blob or file!');
                alert('Upload Successful')

            });

        } else {
            alert('Upload Cancelled')
        }
    }
    const downloadUrlfnc = () => {
        const storage = getStorage();
        const filePath = `agents/${formdata['agentCode']}`;
        getDownloadURL(ref(storage, filePath))
            .then((url) => {
                setDownloadUrl(url)
            })
            .catch((error) => {
                alert('Nothing found')
                // Handle any errors
            });
    }
    return (
        <div>
            <Button color="danger" onClick={toggle}>Add Agent</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6'>
                            <div >
                                <label>Agent Code</label>
                                <Input type="text" name='agentCode' value={formdata['agentCode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div><div >
                                <label>Full Name</label>
                                <Input type="text" name='name' value={formdata['name']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div><div >
                                <label>Address</label>
                                <Input type="text" name='address' value={formdata['address']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Location</label>
                                <Input type="text" name='location' value={formdata['location']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>pincode</label>
                                <Input type="text" name='pincode' value={formdata['pincode']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>User Id</label>
                                <Input type="text" name='userId' value={formdata['userId']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div >
                                <label>Mobile No.1</label>
                                <Input type="text" name='mobile1' value={formdata['mobile1']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div><div >
                                <label>Mobile No.2</label>
                                <Input type="text" name='mobile2' value={formdata['mobile2']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div><div >
                                <label>KYC Updated Date</label>
                                <Input type="text" name='kycUpdateDate' value={formdata['kycUpdateDate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>KYC Renewal date</label>
                                <Input type="text" name='kycreneweddate' value={formdata['kycreneweddate']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                            <div >
                                <label>Upload Doc</label>
                                <Input type="file" onClick={(e) => uploadFile(e)} />
                                {downloadUrl && <a href={downloadUrl} target='_blank'>Click here to Download the Document</a>}
                            </div>
                            <div >
                                <label>Password</label>
                                <Input type="text" name='password' value={formdata['password']} onChange={(e) => onHandleChange(e.currentTarget)} />
                            </div>
                        </div>
                        <div className='col-12'>
                            <label>Secondary Pincode</label>
                            <Input type="text" name='pincodes' value={formdata['pincodes']} onChange={(e) => onHandleChange(e.currentTarget)} />
                        </div>
                        <div className="col-12">
                            <label>Remarks</label>
                            <textarea rows="5" cols="3" type="text" className="form-control" name="remarks" onChange={(e) => onHandleChange(e.currentTarget)}>
                            </textarea>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
                    <Button color="info" onClick={downloadUrlfnc}>Get Download Url</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
