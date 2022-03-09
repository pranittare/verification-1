import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { getDatabase, remove, ref } from "firebase/database";


const ActiveCases = (props) => {
    const { agents } = props;
    const formatedDate = new Date().toDateString()
    let history = useHistory();
    const db = getDatabase();
    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    const [tooltip, setTooltip] = useState();
    const formData = (forms) => {
        const formKeys = Object.keys(forms)
        let formarray = []
        for (let j = 0; j < formKeys.length; j++) {
            const element1 = formKeys[j];
            let form = forms[element1]
            let newform = Object.keys(form)
            for (let index = 0; index < newform.length; index++) {
                const element2 = newform[index];
                let single = form[element2]
                single.key = element2
                if (single.appid && !single.submitted && single.branch === props.branch) {
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
        let data = allData
        if (e.currentTarget.value) {
            setAllData(data.filter(item => {
                if (item[e.currentTarget.name]) {
                    let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
                    return rval

                } else {
                    if (e.currentTarget.name === 'customerName') {
                        if (item.office) {
                            let rval = item.office?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        } else if (item.resident) {
                            let rval = item.resident?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        }
                    } else if (e.currentTarget.name === 'clientName') {
                        console.log('office', item)
                        if (item.office) {
                            let rval = item.office?.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        } else if (item.resident) {
                            let rval = item.resident?.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        }
                    }
                }
            }
            ))
        } else {
            formData(props.forms)
        }
        setReset(Math.random())

    }
    const pincodeFilter = (e) => {
        let data = allData
        if (e.currentTarget.value) {
            setAllData(data.filter(item => {
                if (item?.office) {
                    if (item?.office?.applicantDetails) {
                        if (item?.office?.applicantDetails?.pincode) {
                            let rval = item.office?.applicantDetails?.pincode?.toString().includes(e.currentTarget.value)
                            return rval
                        }
                    }
                } else if (item?.resident) {
                    if (item?.resident?.applicantDetails) {
                        if (item?.resident?.applicantDetails?.pincode) {
                            let rval = item.resident?.applicantDetails?.pincode?.toString().includes(e.currentTarget.value)
                            return rval
                        }
                    }
                }
            }))
        } else {
            formData(props.forms)
        }
        setReset(Math.random());
    }

    const allSearch = (e) => {
        let data = allData
        let val = e.currentTarget.value.toLocaleLowerCase()
        if (e.currentTarget.value) {
            setAllData(data.filter(item => {
                if (item.appid.toString().toLocaleLowerCase().includes(val)) {
                    return item
                }
                if (item?.office) {
                    if (item?.office?.applicantDetails) {
                        if (item.office?.applicantDetails?.customerName) {
                            let rval = item.office?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        }
                        if (item?.office?.applicantDetails?.pincode) {
                            let rval = item.office?.applicantDetails?.pincode?.toString().includes(e.currentTarget.value)
                            return rval
                        }
                    }
                } else if (item?.resident) {
                    if (item?.resident?.applicantDetails) {
                        if (item.resident?.applicantDetails?.customerName) {
                            let rval = item.resident?.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        }
                        if (item?.resident?.applicantDetails?.pincode) {
                            let rval = item.resident?.applicantDetails?.pincode?.toString().includes(e.currentTarget.value)
                            return rval
                        }
                    }
                }
            }))
        } else {
            formData(props.forms)
        }
        setReset(Math.random());
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
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleDelete = (item) => {
        console.log({ item })
        let type = '';
        let pincode;
        if (item?.office?.applicantDetails) {
            type = 'office';
            pincode = item.office.applicantDetails.pincode
        } else if (item?.resident?.applicantDetails) {
            type = 'resident';
            pincode = item.resident.applicantDetails.pincode
        }
        if (type && pincode) {
            const path = `form/${pincode}/${item.key}`
            console.log('path', path)
            remove(ref(db, path)).then(res => {
                alert('Case Removed');
                setReset(Math.random());
            })
        } else if (item.pincode && item.key) {
            pincode = item.pincode
            const path = `form/${pincode}/${item.key}`
            console.log('path', path)
            remove(ref(db, path)).then(res => {
                alert('Case Removed');
                setReset(Math.random());
            })

        } else {
            alert('problem found delete from backend!');
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
        // console
    }, [props.forms])
    useEffect(() => {
        setTimeout(() => {
            if (allData && allData.length > 0) {
                var uniq = allData
                    .map((name) => {
                        if (name.office?.applicantDetails.customerName) {
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
                alert(`Duplicate Entries Found: ${duplicates.join(', ')}`)
                console.log('duplicates', duplicates)
            }
        }, 5000)
    }, [])
    // useEffect(() => {

    // }[document.getElementById('form')])
    // console.log('form', document.getElementById('form').clientHeight)
    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Active Cases</h4>
                <button onClick={getExcel} className='btn btn-primary'>Get Excel</button>
            </div>
            <div className='d-flex sticky-top bg-white justify-content-end'>
                <p className='text-primary me-1 ms-1'>Office</p>
                <p className='text-success'>Resident</p>
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="d-none "
                table="html-table"
                filename={`Active-${formatedDate}`}
                sheet="tablexls"
                buttonText="Download as XLS" />
            <div className='d-flex justify-content-between'>
                <div >
                    <label>Pincode</label>
                    <Input type="text" onChange={pincodeFilter} name="pincode" placeholder={'Pincode'} />
                </div>
                <div>
                    <label>Search</label>
                    <Input type="text" onChange={allSearch} placeholder={'Search all'} />
                </div>
            </div>
            <form className='d-flex justify-content-between flex-wrap' id='form'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="appid" placeholder={'ApplicationID'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'LoginDate'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'LoginTime'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="customerName" placeholder={'CustomerName'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'TAT'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="clientName" placeholder={'ClientName'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'Stage'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'Remark'} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.tat}-${index + 1}`} onMouseOver={() => setTooltip(index)}>

                                <td >
                                    <div onClick={() => handleViewForm(item)} style={{ cursor: 'pointer' }} className={item?.office?.applicantDetails ? 'text-primary' : 'text-success'}>
                                        <p type="button" data-toggle="tooltip" data-placement="top" title={`${getAgentName(item)}`}>
                                            {item.appid}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {moment(item.tat).format('ll')}
                                </td>
                                <td>
                                    {moment(item.tat).format('LT')}
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
                                    {item.claimed ? 'Claimed' : item.assigned ? 'Assigned' : ''}
                                    {/* Assigned {item?.assigned ? 'true' : 'false'}
                                    Claimed {item?.claimed ? 'true' : 'false'} */}
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
                                    <button className='btn btn-danger' type='button' onClick={() => handleDelete(item)}>X</button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
                <table className="table table-striped table-bordered d-none" id='html-table'>
                    <thead>
                        <tr>
                            <th scope="col"> ApplicationID</th>
                            <th scope="col"> LoginDate</th>
                            <th scope="col"> LoginTime</th>
                            <th scope="col"> CustomerName</th>
                            <th scope="col"> Type</th>
                            <th scope="col"> TAT</th>
                            <th scope="col"> Address</th>
                            <th scope="col"> Pincode</th>
                            <th scope="col"> ClientName</th>
                            <th scope="col"> Stage</th>
                            <th scope="col"> Remark</th>
                            <th scope="col">Agent Name</th>
                            <th scope="col">Mobile No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.tat}-${index + 1}`}>
                                <td>
                                    {item.appid}
                                </td>
                                <td>
                                    {moment(item.tat).format('ll')}

                                </td>
                                <td>
                                    {moment(item.tat).format('LT')}

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
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.form
                                            :
                                            item.resident?.applicantDetails?.form
                                    }
                                </td>
                                <td>
                                    {moment(item.tat).fromNow()}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.officeAddressProvided
                                            :
                                            item.resident?.applicantDetails?.residenceAddressProvided
                                    }
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.pincode
                                            :
                                            item.resident?.applicantDetails?.pincode
                                    }
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
                                    {item.claimed ? 'Claimed' : item.assigned ? 'Assigned' : ''}

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
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.mobileNo
                                            :
                                            item.resident?.applicantDetails?.mobileNo
                                    }

                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </form>
        </div>
    )
}
const getAgentName = (item) => {

    if (item.rejectedFrom === item.selected) {
        return ''
    } else if (item.selected) return item.selected
}
const mapStateToProps = (state) => {
    return {
        forms: state.forms,
        branch: state.branch,
        agents: state.agents
    }
}
export default connect(mapStateToProps)(ActiveCases)