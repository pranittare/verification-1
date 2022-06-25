import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button } from 'reactstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { getDatabase, remove, ref } from "firebase/database";
import Alert from '../components/Alert';

const SubmittedCases = (props) => {
    const { vendors, agents } = props;
    const db = getDatabase();
    let history = useHistory();
    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    const formatedDate = new Date().toDateString();
    const [dropdownBankNameOpen, setDropdownBankNameOpen] = useState(false);
    const toggleBankName = () => {
        setDropdownBankNameOpen(!dropdownBankNameOpen);
    }
    const initialdata = { appid: "",
    initiationDate: "",
    customerName: "",
    tat: "",
    bankNBFCname: "",
    overallStatus: "" 
   }
const [filterSearch, setFilterSearch] = useState(initialdata)
    const [selectedBank, setSelectedBank] = useState(false);    
    const [alertMessage, setAlertMessage] = useState('');
    const formData = (forms) => {
        let formarray = []
        const formKeys = Object.keys(forms)
        for (let j = 0; j < formKeys.length; j++) {
            const element1 = formKeys[j];
            let form = forms[element1]
            let newform = Object.keys(form)
            // console.log('keys', newform)
            for (let index = 0; index < newform.length; index++) {
                const element2 = newform[index];
                let single = form[element2]
                if (single.submitted && single.branch === props.branch) {
                    single.key = element2
                    formarray.push(single)
                }
                // console.log('form', single)

            }

        }
        console.log('forms', formarray)
        setAllData(formarray)
        setReset(Math.random())

    }
    const handleFilter = (e) => {
        let data = { ...filterSearch }
        data[e.currentTarget.name] = e.currentTarget.value
        setFilterSearch(data);
        // let data = allData
        // if (e.currentTarget.value) {
        //     setAllData(data.filter(item => {
        //         if (item[e.currentTarget.name]) {
        //             let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
        //             return rval

        //         } else {
        //             console.log('item', item)
        //             if (e.currentTarget.name === 'CustomerName') {
        //                 if (item.office) {
        //                     let rval = item.office?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                     return rval
        //                 } else {
        //                     let rval = item.resident?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                     return rval
        //                 }
        //             } else if (e.currentTarget.name === 'ClientName') {
        //                 console.log('office', item)
        //                 if (item.office) {
        //                     let rval = item.office?.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                     return rval
        //                 } else if (item.resident) {
        //                     let rval = item.resident?.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                     return rval
        //                 }
        //             }
        //         }
        //     }
        //     ))
        // } else {
        //     formData(props.forms)
        // }
        setReset(Math.random())

    }
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleViewForm = (item) => {
        console.log('handleViewForm', item)
        let pincode = ''
        for (const key in item) {
            if (key === 'office') {
                pincode = item?.office?.applicantDetails?.pincode
                history.push(`office/${pincode}/${item.key}`)
            } else if (key === 'resident') {
                pincode = item?.resident?.applicantDetails?.pincode
                history.push(`resident/${pincode}/${item.key}`)
            }
        }
    }
    const searchByBank = (a) => {
        if (selectedBank) {
            if (a?.office?.applicantDetails) {
                return a.office.applicantDetails?.bankNBFCname?.clientName === selectedBank
            } else if (a?.resident?.applicantDetails) {
                return a.resident.applicantDetails?.bankNBFCname?.clientName === selectedBank
            }
        }
        if (filterSearch.appid) {
            if (a?.office?.applicantDetails) {
                return a.office.applicantDetails.appid?.toLowerCase().includes(filterSearch.appid)
            } else if (a?.resident?.applicantDetails) {
                return a.resident.applicantDetails.appid?.toLowerCase().includes(filterSearch.appid)
            }
        }
        if (filterSearch.bankNBFCname) {
                 if (a?.office?.applicantDetails) {
                return a.office.applicantDetails.bankNBFCname?.clientName?.toLowerCase().includes(filterSearch.bankNBFCname.toLowerCase())
            } else if (a?.resident?.applicantDetails) {
                return a.resident.applicantDetails.bankNBFCname?.clientName?.toLowerCase().includes(filterSearch.bankNBFCname.toLowerCase())
            }
        }
        if (filterSearch.customerName) {
                 if (a?.office?.applicantDetails) {
                return a.office.applicantDetails.customerName?.toLowerCase().includes(filterSearch.customerName)
            } else if (a?.resident?.applicantDetails) {
                return a.resident.applicantDetails.customerName?.toLowerCase().includes(filterSearch.customerName)
            }
        }

        return a
    }
    const getAgentName = (item) => {

        if (item.rejectedFrom === item.selected) {
            return ''
        } else if (item.selected) return item.selected
    }
    const handleDelete = (item) => {
        console.log({ item })
        // let type = '';
        let pincode;
        if (item?.office?.applicantDetails) {
            // type = 'office';
            pincode = item.office.applicantDetails.pincode
        } else if (item?.resident?.applicantDetails) {
            // type = 'resident';
            pincode = item.resident.applicantDetails.pincode
        }
        if (pincode) {
            const path = `form/${pincode}/${item.key}`
            console.log('path', path)
            remove(ref(db, path)).then(res => {
                setAlertMessage('Case Removed');
                setReset(Math.random());
            })
        } else if (item.pincode && item.key) {
            pincode = item.pincode
            const path = `form/${pincode}/${item.key}`
            console.log('path', path)
            remove(ref(db, path)).then(res => {
                setAlertMessage('Case Removed');
                setReset(Math.random());
            })

        } else {
            setAlertMessage('problem found delete from backend!');
        }
    }
    const getAgentFullName = (item) => {
        let agentname = ''
        for (const key in agents) {
            if (Object.hasOwnProperty.call(agents, key)) {
                const element = agents[key];
                if (element.userId === item.selected) {
                    agentname = element.name
                }
            }
        }
        return agentname
    }
    useEffect(() => {
        formData(props.forms)
        // console.log
    }, [props.forms])
    useEffect(() => {
        setTimeout(() => {
            if (allData && allData.length > 0) {
                var uniq = allData
                    .map((name) => {
                        if (name?.office?.applicantDetails?.customerName) {
                            return {
                                count: 1,
                                name: name?.office?.applicantDetails?.customerName
                            }
                        } else {
                            return {
                                count: 1,
                                name: name?.resident?.applicantDetails?.customerName
                            }
                        }

                    })
                    .reduce((a, b) => {
                        a[b.name] = (a[b.name] || 0) + b.count
                        return a
                    }, {})

                var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
                duplicates.length > 0 && alert(`Duplicate Entries Found: ${duplicates.join(', ')}`)
                console.log('duplicates', duplicates)
            }
        }, 5000)
    }, [])
    return (
        <div>
           {alertMessage && <Alert message={alertMessage} setMessage={(data)=>setAlertMessage(data)}/>}
            <div className='d-flex justify-content-around mb-2 mt-2'>
                <h4>Submitted Cases</h4>
                <button onClick={getExcel} className='btn btn-primary'>Get Excel</button>
            </div>
            <div className='d-flex sticky-top bg-white justify-content-between'>
                <div className='mb-1'>
                    <Dropdown toggle={toggleBankName} isOpen={dropdownBankNameOpen}>
                        <DropdownToggle caret>
                            {selectedBank ? selectedBank : 'None'}
                        </DropdownToggle>
                        <DropdownMenu
                        >
                            <DropdownItem onClick={() => { setSelectedBank(false) }}>None</DropdownItem>
                            {vendors?.map(item => {
                                return <DropdownItem key={item.clientName} onClick={() => { setSelectedBank(item.clientName) }}
                                    value={item.clientName}
                                    name={item.clientName}>
                                    {item.clientName}
                                </DropdownItem>
                            })}

                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className='d-flex'>
                    <p className='mx-1'>Saved</p>
                    <p className='bg-warning rounded' style={{height: 24, width: 24}} />
                    <p className='text-primary mx-1'>Office</p>
                    <p className='text-success'>Resident</p>
                </div>
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="d-none "
                table="html-table"
                filename={`Submitted-${formatedDate}`}
                sheet="tablexls"
                buttonText="Download as XLS" />
            <form className='d-flex justify-content-between flex-wrap'>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="appid" placeholder={'ApplicationID'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="claimedAt" placeholder={'LoginDate'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="claimedAt" placeholder={'LoginTime'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="customerName" placeholder={'CustomerName'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="tat" placeholder={'TAT'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="bankNBFCname" placeholder={'ClientName'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'Stage'} /></th>
                            <th scope="col"><Input type="text" onChange={handleFilter} name="remarks" placeholder={'Remark'} /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.filter(searchByBank).map((item, index) => {

                            return <tr key={`${item.appid}-${index + 1}`}>
                                <td >
                                    <div onClick={() => handleViewForm(item)} style={{ cursor: 'pointer' }} className={item?.office?.applicantDetails ? 'text-primary' : 'text-success'}>
                                        <p type="button" data-toggle="tooltip" data-placement="top" title={`${getAgentName(item)}`}>
                                            {item.appid}
                                        </p>
                                    </div>
                                    {item.watcherEmail && item.watcherEmail}
                                    {/* <ProblemCases cases={item} /> */}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            moment(item.office?.applicantDetails?.initiationDate).format('ll')
                                            :
                                            moment(item.resident?.applicantDetails?.initiationDate).format('ll')
                                    }

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            moment(item.office?.applicantDetails?.initiationDate).format('LT')
                                            :
                                            moment(item.resident?.applicantDetails?.initiationDate).format('LT')
                                    }

                                </td>
                                <td className={item?.office?.verificationDetails?.productSupervisor ? 'bg-warning' : item?.resident?.verificationDetails?.productSupervisor ? 'bg-warning' : ''}>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.customerName
                                            :
                                            item.resident?.applicantDetails?.customerName
                                    }
                                </td>
                                <td>
                                    {moment(item.tat).fromNow()}

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.bankNBFCname.clientName
                                            :
                                            item.resident?.applicantDetails?.bankNBFCname.clientName
                                    }
                                </td>
                                <td>
                                    {item?.submitted ? 'Submitted' : item.claimed ? 'Claimed' : item.assigned ? 'Assigned' : ''}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.remarks
                                            :
                                            item.resident?.applicantDetails?.remarks
                                    }

                                </td>
                                <td>
                                    <Button color='danger' onClick={()=>handleDelete(item)}>X</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                {/* only for excel */}
                <table className="table table-striped table-bordered d-none" id='html-table'>
                    <thead>
                        <tr>
                            <th scope="col">ApplicationID</th>
                            <th scope="col">LoginDate</th>
                            <th scope="col">LoginTime</th>
                            <th scope="col">CustomerName</th>
                            <th scope="col">TAT</th>
                            <th scope="col">ClientName</th>
                            <th scope="col">Stage</th>
                            <th scope="col">Remark</th>
                            <th scope="col">Agent Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.appid}-${index + 1}`} >
                                <td>
                                    {item.appid}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            moment(item.office?.applicantDetails?.initiationDate).format('ll')
                                            :
                                            moment(item.resident?.applicantDetails?.initiationDate).format('li')
                                    }

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            moment(item.office?.applicantDetails?.initiationDate).format('LT')
                                            :
                                            moment(item.resident?.applicantDetails?.initiationDate).format('LT')
                                    }

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.customerName
                                            :
                                            item.resident?.applicantDetails?.customerName
                                    }
                                </td>
                                <td>
                                    {moment(item.tat).fromNow()}

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.bankNBFCname.clientName
                                            :
                                            item.resident?.applicantDetails?.bankNBFCname.clientName
                                    }
                                </td>
                                <td>
                                    {item?.submitted ? 'Submitted' : item.claimed ? 'Claimed' : item.assigned ? 'Assigned' : ''}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.remarks
                                            :
                                            item.resident?.applicantDetails?.remarks
                                    }

                                </td>
                                <td>
                                    {getAgentFullName(item)}
                                </td>
                            </tr>

                        })}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        forms: state.forms,
        branch: state.branch,
        vendors: state.vendors,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(SubmittedCases)