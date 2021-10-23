import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';

const ActiveCases = (props) => {
    const formatedDate = new Date().toDateString()

    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
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
                if (!single.submitted) {
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
                    console.log('item', item)
                    if (e.currentTarget.name === 'CustomerName') {
                        if (item.office) {
                            let rval = item.office.applicantDetails.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        } else {
                            let rval = item.resident.applicantDetails.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        }
                    } else if (e.currentTarget.name === 'ClientName') {
                        console.log('office', item)
                        if (item.office) {
                            let rval = item.office?.applicantDetails?.bankNBFCname.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
                            return rval
                        } else {
                            let rval = item.resident?.applicantDetails?.bankNBFCname.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
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
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    useEffect(() => {
        formData(props.forms)
        // console
    }, [props.forms])
    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Active Cases</h4>
                <button onClick={getExcel} className='btn btn-primary'>Get Excel</button>
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="d-none "
                table="html-table"
                filename={`Active-${formatedDate}`}
                sheet="tablexls"
                buttonText="Download as XLS" />
            <form className='d-flex justify-content-between flex-wrap'>
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
                            if (item.appid) {
                                return <tr key={item.tat}>
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
                                </tr>
                            }
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
                            <th scope="col"> TAT</th>
                            <th scope="col"> ClientName</th>
                            <th scope="col"> Stage</th>
                            <th scope="col"> Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            if (item.appid) {
                                return <tr key={item.key}>
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

                                    </td>
                                    <td>
                                        {
                                            item?.office ?
                                                item.office?.applicantDetails?.remarks
                                                :
                                                item.resident?.applicantDetails?.remarks
                                        }

                                    </td>
                                </tr>
                            }
                        })}

                    </tbody>
                </table>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        forms: state.forms
    }
}
export default connect(mapStateToProps)(ActiveCases)