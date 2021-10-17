import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'

const SubmittedCases = (props) => {
    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    const formData = (forms) => {
        let formarray = []
        const formKeys = Object.keys(forms)
        for (let j = 0; j < formKeys.length; j++) {
            const element1 = formKeys[j];
            let form = forms[element1]
            let newform = Object.keys(form)
            for (let index = 0; index < newform.length; index++) {
                const element2 = newform[index];
                let single = form[element2]
                if (single.selected && single.submitted) {
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
    useEffect(() => {
        formData(props.forms)
        // console
    }, [props.forms])
    return (
        <div>
            <h4>Submitted Cases</h4>
            <form className='d-flex justify-content-between flex-wrap'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="appid" placeholder={'ApplicationID'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="claimedAt" placeholder={'LoginDate'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="claimedAt" placeholder={'LoginTime'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="customerName" placeholder={'CustomerName'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="tat" placeholder={'TAT'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="clientName" placeholder={'ClientName'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="TPCName1" placeholder={'Stage'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="remarks" placeholder={'Remark'} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr>
                                <td>
                                    {item.appid}
                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.initiationDate
                                            :
                                            item.resident?.applicantDetails?.initiationDate
                                    }

                                </td>
                                <td>
                                    {
                                        item?.office ?
                                            item.office?.applicantDetails?.initiationDate
                                            :
                                            item.resident?.applicantDetails?.initiationDate
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
                                    {item.tat}
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
                                    Assigned {item?.assigned ? 'true' : 'false'}
                                    Claimed {item?.claimed ? 'true' : 'false'}
                                    Submitted {item?.submitted ? 'true' : 'false'}
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
export default connect(mapStateToProps)(SubmittedCases)