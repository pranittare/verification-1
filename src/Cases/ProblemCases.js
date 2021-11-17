import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Badge, Table } from 'reactstrap';
import DropDownComp from '../components/DropDownComp';
import moment from 'moment';
const ProblemCases = ({ cases }) => {
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [outsideEdit, setOutsideEdit] = useState(false);
    const [formdata, setFormdata] = useState({
        branches: '',
        allocated: '',
        claimed: ''
    })
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
    const handleoutsideEdit = () => {
        setOutsideEdit(true)
    }
    let branches = [
        { name: 'branch', value: 'branch-1', label: 'Branch-1' },
        { name: 'branch', value: 'nashik', label: 'Nashik' },
        { name: 'branch', value: 'pune', label: 'Pune' },
    ]
    let allocated = [
        { name: 'allocated', value: true, label: 'True' },
        { name: 'allocated', value: false, label: 'False' },
    ]
    let claimed = [
        { name: 'claimed', value: true, label: 'True' },
        { name: 'claimed', value: false, label: 'False' },
    ]

    const onHandleChange = (e) => {
        // name
        // console.log(e)
        let form = formdata
        form[e.name] = e.value
        // addOrUpdate(form)
        // if (allAgents && allAgents.length > 0) {
        //     for (let index = 0; index < allAgents.length; index++) {
        //         const element = allAgents[index];
        //         console.log('element', element)
        //         if (form.agentCode === element['agentCode']) {
        //             alert('Same Agent Code Do not Continue!')
        //         }
        //         if (form.name === element['name']) {
        //             alert('Same Agent Name Do not Continue!')
        //         }

        //     }
        // }
        setFormdata(form)
        setRefresh(Math.random())
        // console.log(form)
    }
    const handleoutsideApply = () => {
        let ndate = moment().format('ddd ll')
        let tat = new Date().toString()
        console.log('ndate', ndate, tat)
    }
    return (
        <div>
            <div className='d-flex justify-content-around mt-1 mb-1'>
                <Badge className={'badge ', outside ? 'bg-primary' : 'bg-danger'}>Outside</Badge>
                {cases?.resident?.applicantDetails?.appid && <Badge className={'badge ', resiApplicant ? 'bg-primary' : 'bg-danger'}>ResiApplicant</Badge>}
                {cases?.office?.applicantDetails?.appid && <Badge className={'badge ', officeApplicant ? 'bg-primary' : 'bg-danger'}>OfficeApplicant</Badge>}

            </div>
            <Button onClick={toggle}>View Error Case</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader>Header</ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Outside</th>
                                <th>Applicant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='d-flex justify-content-around'>
                                        <Button onClick={handleoutsideEdit}>Edit</Button>
                                        <Button color='warning' onClick={handleoutsideApply}>Apply</Button>
                                    </div>
                                    <div>
                                        allocated: {JSON.stringify(cases?.allocated)}
                                        {outsideEdit && <DropDownComp id='problemCases' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={allocated} />}
                                    </div>
                                    <br />
                                    <div>
                                        branch: {JSON.stringify(cases?.branch)}
                                        {outsideEdit && <DropDownComp id='problemCases' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={branches} />}
                                    </div>
                                    <br />
                                    <div>
                                        claimed: {JSON.stringify(cases?.claimed)}
                                        {outsideEdit && <DropDownComp id='problemCases' other={true} onHandleChange={(e) => onHandleChange(e)} formdata={formdata} dropDowmArry={claimed} />}
                                    </div>
                                    <br />
                                    <div>
                                        claimedAt: {JSON.stringify(cases?.claimedAt)}
                                        <br />
                                        {outsideEdit && 'Auto Reset will be triggered'}
                                    </div>
                                    <div>
                                        key: {JSON.stringify(cases?.key)}
                                    </div>
                                    <div>
                                        tat: {JSON.stringify(cases?.tat)}
                                        <br />
                                        {outsideEdit && 'Auto Reset will be triggered'}
                                    </div>
                                </td>
                                <td>
                                    {resiApplicant ?
                                        <>
                                            <div>
                                                appid: {JSON.stringify(cases?.resident?.applicantDetails?.appid)}
                                            </div>
                                            <br />
                                            <div>
                                                contactNo: {JSON.stringify(cases?.resident?.applicantDetails?.contactNo)}
                                            </div>
                                            <br />
                                            <div>
                                                loaction: {JSON.stringify(cases?.resident?.applicantDetails?.loaction)}
                                            </div>
                                            <br />
                                            <div>
                                                mobileNo: {JSON.stringify(cases?.resident?.applicantDetails?.mobileNo)}
                                            </div>

                                        </>
                                        :
                                        <>
                                            <div>
                                                appid: {JSON.stringify(cases?.office?.applicantDetails?.appid)}
                                            </div>
                                            <br />
                                            <div>
                                                contactNo: {JSON.stringify(cases?.office?.applicantDetails?.contactNo)}
                                            </div>
                                            <br />
                                            <div>
                                                loaction: {JSON.stringify(cases?.office?.applicantDetails?.loaction)}
                                            </div>
                                            <br />
                                            <div>
                                                mobileNo: {JSON.stringify(cases?.office?.applicantDetails?.mobileNo)}
                                            </div>
                                        </>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='text-center text-danger'>
                        Fixing will reset the TAT
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ProblemCases
