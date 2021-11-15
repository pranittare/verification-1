import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Badge } from 'reactstrap';

const ProblemCases = ({ cases }) => {
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const toggle = () => {
        setModal(!modal)
    };
    // const checked;
    let outside = false
    let resiApplicant = false
    let officeApplicant = false
    // let resiVerification = false
    // let officeVerifica
    if (cases) {
        let stringcase = JSON.stringify(cases)
        if (cases?.allocated) {
            outside = true
        }
        if (cases?.branch) {
            outside = true
        }
        if (cases?.claimed) {
            outside = true
        }
        if (cases?.claimedAt) {
            outside = true
        }
        if (cases?.key) {
            outside = true
        }
        if (cases?.tat) {
            outside = true
        }
        if (cases?.claimedAt) {
            outside = true
        }
        if (cases?.resident?.applicantDetails?.appid) {
            resiApplicant = true
        }
        if (cases?.resident?.applicantDetails?.contactNo) {
            resiApplicant = true   
        }
        if (cases?.resident?.applicantDetails?.loaction) {
            resiApplicant = true
        }
        if (cases?.resident?.applicantDetails?.mobileNo) {
            resiApplicant = true
        }
        if (cases?.office?.applicantDetails?.appid) {
            officeApplicant = true
        }
        if (cases?.office?.applicantDetails?.contactNo) {
            officeApplicant = true   
        }
        if (cases?.office?.applicantDetails?.loaction) {
            officeApplicant = true
        }
        if (cases?.office?.applicantDetails?.mobileNo) {
            officeApplicant = true
        }
        console.log('props', cases)

    }
    return (
        <div>
            <Badge className={'badge ',outside ? 'bg-primary': 'bg-danger'}>Outside</Badge>
            {cases?.resident?.applicantDetails?.appid && <Badge className={'badge ',resiApplicant ? 'bg-primary': 'bg-danger'}>ResiApplicatn</Badge>}
            {cases?.office?.applicantDetails?.appid && <Badge className={'badge ',officeApplicant ? 'bg-primary': 'bg-danger'}>OfficeApplicant</Badge>}
            <Button onClick={toggle}>Some button</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader>Header</ModalHeader>
                <ModalBody>Body</ModalBody>
            </Modal>
        </div>
    )
}
export default ProblemCases
