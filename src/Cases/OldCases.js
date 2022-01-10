import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'
import { databaseUpdateQueryExactSingle } from '../utils/query'
import { databaseUpdateQueryExactMultiple } from '../utils/query'
import { databaseUpdateQueryRangeSingle } from '../utils/query'
import { databaseUpdateQueryRangeMultiple } from '../utils/query'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';

const OldCases = (props) => {
    const formatedDate = new Date().toDateString()
    const [allData, setAllData] = useState([])
    const [searchData1, setSearchData1] = useState({
        bankNBFCname: '',
        customerName: '',
    })
    const [searchData2, setSearchData2] = useState({
        start: '',
        end: '',
    })
    const [reset, setReset] = useState(0);
    const formData = (forms) => {
        // let formarray = []
        // const formKeys = Object.keys(forms)
        // for (let j = 0; j < formKeys.length; j++) {
        //     const element1 = formKeys[j];
        //     let form = forms[element1]
        //     let newform = Object.keys(form)
        //     for (let index = 0; index < newform.length; index++) {
        //         const element2 = newform[index];
        //         let single = form[element2]
        //         if (single.selected && single.submitted) {
        //             formarray.push(single)
        //         }
        //         // console.log('form', single)

        //     }

        // }
        // console.log('forms', formarray)
        setAllData(forms)
        setReset(Math.random())

    }

    const handleFilterSearch = (e) => {
        let val = searchData1
        val[e.name] = e.value
        setSearchData1(val)
    }
    const handleFilterSearchTime = (e) => {
        let val = searchData2
        val[e.name] = e.value
        setSearchData1(val)
    }
    const search1 = () => {
        if (searchData1.customerName && searchData1.bankNBFCname) {
            setAllData(databaseUpdateQueryExactMultiple('applicantDetails.bankNBFCname', searchData1.bankNBFCname, 'applicantDetails.customerName', searchData1.customerName))
        }
        if (searchData1.customerName) {
            setAllData(databaseUpdateQueryExactSingle('applicantDetails.customerName', searchData1.customerName))

        }
        if (searchData1.bankNBFCname) {
            setAllData(databaseUpdateQueryExactSingle('applicantDetails.bankNBFCname', searchData1.bankNBFCname))

        }
    }
    const search2 = () => {
        if (searchData2.start && searchData1.end) {

        }
        if (searchData2.start) {

        }
        if (searchData2.end) {

        }
    }
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleFilter = (e) => {
        let data = allData
        if (e.currentTarget.value) {
            setAllData(data.filter(item => {
                if (item[e.currentTarget.name]) {
                    let rval = item[e.currentTarget.name]?.toLocaleLowerCase().includes(e.currentTarget.value)
                    return rval

                } else {
                    console.log('item', item);
                    if (e.currentTarget.name === 'customerName') {
                        let rval = item.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
                        return rval

                    } else if (e.currentTarget.name === 'clientName') {
                        console.log('office', item)
                        let rval = item.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
                        return rval

                    }
                }
            }
            ))
        } else {
            formData(props.db)
        }
        setReset(Math.random())

    }
    useEffect(() => {
        formData(props.db)
        // databaseUpdateQueryExactSingle('applicantDetails.bankNBFCname', 'TESTBANK')
        console.log('forms', props)
    }, [props])
    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Old Cases</h4>
                <button onClick={getExcel} className='btn btn-primary'>Get Excel</button>
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="d-none "
                table="html-table"
                filename={`Old-${formatedDate}`}
                sheet="tablexls"
                buttonText="Download as XLS" />
            <form className='d-flex justify-content-between flex-wrap'>
                <div className="row">
                    <div className="col-2">
                        <Input placeholder='Client Name' name='bankNBFCname' onChange={(e) => handleFilterSearch(e.currentTarget)} />
                    </div>
                    <div className="col-2">
                        <Input placeholder='Customer Name' name='customerName' onChange={(e) => handleFilterSearch(e.currentTarget)} />
                    </div>
                    <div className="col-2">
                        <button className='btn btn-info' type='button' onClick={() => search1()} >Search</button>
                    </div>
                    <div className="col-2">
                        <Input placeholder='Start Date' name='start' onChange={handleFilterSearchTime} />
                    </div>
                    <div className="col-2">
                        <Input placeholder='End Date' name='end' onChange={handleFilterSearchTime} />
                    </div>
                    <div className="col-2">
                        <button className='btn btn-info' type='button' onClick={() => search2()}>Search</button>
                    </div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"> <Input type="text" name="appid" placeholder={'ApplicationID'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="initiationDate" placeholder={'InitiationDate'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="initiationDate" placeholder={'InitiationTime'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="customerName" placeholder={'CustomerName'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="tat" placeholder={'TAT'} /> </th>
                            <th scope="col"> <Input type="text" name="bankNBFCname" placeholder={'ClientName'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="mobileNo" placeholder={'Mobile No'} onChange={handleFilter} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.key}-${index + 1}`}>
                                <td>
                                    {item.applicantDetails.appid}
                                </td>
                                <td>

                                    {moment(item.applicantDetails.initiationDate).format('ll')}
                                </td>
                                <td>
                                    {moment(item.applicantDetails.initiationDate).format('LT')}

                                </td>
                                <td>
                                    {item.applicantDetails.customerName}
                                </td>
                                <td>

                                    {/* {moment(item.initiationDate).diff(item.tat, 'hours')} */}

                                    {moment(item.tat).format('LT')}

                                </td>
                                <td>
                                    {item.applicantDetails.bankNBFCname}

                                </td>
                                <td>
                                    {item.applicantDetails.mobileNo}

                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
                <table className="table table-striped table-bordered d-none" id='html-table'>
                    <thead>
                        <tr>
                            <th scope="col">ApplicationID</th>
                            <th scope="col">InitiationDate</th>
                            <th scope="col">InitiationTime</th>
                            <th scope="col">CustomerName</th>
                            <th scope="col">TAT</th>
                            <th scope="col">ClientName</th>
                            <th scope="col">Mobile No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.key}-${index + 1}`}>
                                <td>
                                    {item.applicantDetails.appid}
                                </td>
                                <td>
                                    {moment(item.applicantDetails.initiationDate).format('ll')}
                                </td>
                                <td>
                                    {moment(item.applicantDetails.initiationDate).format('LT')}
                                </td>
                                <td>
                                    {item.applicantDetails.customerName}
                                </td>
                                <td>
                                    {moment(item.tat).format('ll')}

                                </td>
                                <td>
                                    {item.applicantDetails.bankNBFCname}

                                </td>
                                <td>
                                    {item.applicantDetails.mobileNo}

                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        forms: state.fforms,
        db: state.oldcases
    }
}
export default connect(mapStateToProps)(OldCases)