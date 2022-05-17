import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { Input, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
    databaseUpdateQueryExactSingle,
    databaseUpdateQueryExactMultiple, databaseUpdateQueryRangeSingle, databaseUpdateQueryRangeMultiple
} from '../utils/query';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';

const OldCases = (props) => {
    const history = useHistory();
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
    const initialdata = { appid: "",
         initiationDate: "",
         customerName: "",
         tat: "",
         bankNBFCname: "",
         overallStatus: "" 
        }
    const [filterSearch, setFilterSearch] = useState(initialdata)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [reset, setReset] = useState(0);
    const [dropdownBankNameOpen, setDropdownBankNameOpen] = useState(false);
    const toggleBankName = () => {
        setDropdownBankNameOpen(!dropdownBankNameOpen);
    }
    // const forms = useSelector(state => state.fforms)
    // const db = useSelector(state => state.oldcases)
    const vendors = useSelector(state => state.vendors)
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
        console.log('forms', forms)
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
            let data = databaseUpdateQueryExactMultiple('applicantDetails.bankNBFCname', searchData1.bankNBFCname, 'applicantDetails.customerName', searchData1.customerName)
            data.then((res) => {
                setAllData(res)
            })
        }
        if (searchData1.customerName) {
            let data = databaseUpdateQueryExactSingle('applicantDetails.customerName', searchData1.customerName)
            data.then((res) => {
                setAllData(res)
            })
        }
        if (searchData1.bankNBFCname) {
            let data = databaseUpdateQueryExactSingle('applicantDetails.bankNBFCname', searchData1.bankNBFCname)
            data.then((res) => {
                setAllData(res)
            })
        }
    }
    const search2 = () => {
        let start = Math.round((new Date(startDate)).getTime());
        let end = Math.round((new Date(endDate)).getTime());
        if (start && end) {
            let data = databaseUpdateQueryRangeMultiple('tat1', start, 'tat1', end)
            data.then((res) => {
                setAllData(res)
            })
        }
        if (start) {
            let data = databaseUpdateQueryRangeSingle('tat1', start)
            data.then((res) => {
                setAllData(res)
            })
        }
        // muted on purpose for performance issues
        // if (end) {
        //     let data = databaseUpdateQueryRangeSingle('tat1', end)
        //     data.then((res) => {
        //         setAllData(res)
        //     })
        // }
    }
    const getBank = (bank) => {
        if (bank.clientName) {
            return bank.clientName
        }
        return bank
    }
    const getProduct = (prod) => {
        if (prod.productName) return prod.productName;
        return prod;
    }
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleFilter = (e) => {
        let data = { ...filterSearch }
        data[e.currentTarget.name] = e.currentTarget.value
        setFilterSearch(data);

        // let data = { ...allData }
        // if (e.currentTarget.value && data.length > 0) {
        //     setAllData(data?.filter(item => {
        //         if (item[e.currentTarget.name]) {
        //             let rval = item[e.currentTarget.name]?.toLocaleLowerCase().includes(e.currentTarget.value)
        //             return rval

        //         } else {
        //             console.log('item', item);
        //             if (e.currentTarget.name === 'customerName') {
        //                 let rval = item.applicantDetails?.customerName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                 return rval

        //             } else if (e.currentTarget.name === 'clientName') {
        //                 console.log('office', item)
        //                 let rval = item.applicantDetails?.bankNBFCname?.clientName.toLocaleLowerCase().includes(e.currentTarget.value)
        //                 return rval

        //             }
        //         }
        //     }
        //     ))
        // } else {
        //     formData(props.db)
        // }
        setReset(Math.random())

    }
    const filteredSearch = (item) => {
        if (filterSearch.appid) {
            let rval = item.applicantDetails.appid?.toLowerCase().includes(filterSearch.appid)
            return rval
        }
        if (filterSearch.bankNBFCname) {
            let rval = item.applicantDetails.bankNBFCname?.toLowerCase().includes(filterSearch.bankNBFCname.toLowerCase())
            return rval
        }
        if (filterSearch.customerName) {
            let rval = item.applicantDetails.customerName?.toLowerCase().includes(filterSearch.customerName)
            return rval
        }

        return item
        // if (filterSearch[0].appid) {
        //     let rval = item.appid?.toLocaleLowerCase().includes(filterSearch[0].appid)
        //     return rval
        // }
        // if (filterSearch[0].appid) {
        //     let rval = item.appid?.toLocaleLowerCase().includes(filterSearch[0].appid)
        //     return rval
        // }
    }
    const handleViewForm = (item) => {
        let pincode = ''
        if (item?.applicantDetails.form == 'office') {
            pincode = item?.applicantDetails?.pincode
            history.push(`office/${pincode}/${item.key}`)
        } else {
            pincode = item?.applicantDetails?.pincode
            history.push(`resident/${pincode}/${item.key}`)
        }
    }
    const getAgentName = (item) => {

        return `Supervisor: ${item?.verificationDetails.productSupervisor} Agent: ${item?.verificationDetails.finalFIVerifierName}`
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
                        <Dropdown toggle={toggleBankName} isOpen={dropdownBankNameOpen}>
                            <DropdownToggle caret className='text-wrap'>
                                {searchData1['bankNBFCname'] ? searchData1['bankNBFCname'] : 'None'}
                            </DropdownToggle>
                            <DropdownMenu
                            >
                                {vendors?.map(item => {
                                    return <DropdownItem key={item.clientName} onClick={() => {
                                        let form = searchData1
                                        form.bankNBFCname = item.clientName
                                        setSearchData1(form)
                                        // setFormdata({...formdata, bankNBFCname: item.clientName})
                                    }}
                                        value={item.clientName}
                                        name={item.clientName}>
                                        {item.clientName}
                                    </DropdownItem>
                                })}

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-2">
                        <Input placeholder='Customer Name' name='customerName' onChange={(e) => handleFilterSearch(e.currentTarget)} />
                    </div>
                    <div className="col-2">
                        <button className='btn btn-info' type='button' onClick={() => search1()} >Search</button>
                    </div>
                    <div className="col-2">
                        <DatePicker className='form-control' placeholderText='Start Date' selected={startDate} onChange={(date) => setStartDate(date)} />
                        {/* <Input placeholder='Start Date' name='start' onChange={handleFilterSearchTime} /> */}
                    </div>
                    <div className="col-2">
                        <DatePicker className='form-control' placeholderText='End Date' selected={endDate} onChange={(date) => setEndDate(date)} />
                        {/* <Input placeholder='End Date' name='end' onChange={handleFilterSearchTime} /> */}
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
                            <th scope="col"> <Input type="text" name="overallStatus" placeholder={'Status'} onChange={handleFilter} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset && allData && allData.length > 0 && allData.filter(filteredSearch).map((item, index) => {
                            return <tr key={`${item?.key}-${index + 1}`}>
                                <td>
                                    <Link to={{ pathname: item?.applicantDetails?.form == 'office' ? `office/${item?.applicantDetails?.pincode}/${item.key}` : `resident/${item?.applicantDetails?.pincode}/${item.key}`, state: item }} className={item?.applicantDetails?.form == 'office' ? 'text-primary' : 'text-success'}>
                                        <p type="button" data-toggle="tooltip" data-placement="top" title={`${getAgentName(item)}`}>
                                            {item?.applicantDetails?.appid}
                                        </p>
                                    </Link>
                                </td>
                                <td>

                                    {moment(item?.applicantDetails?.initiationDate).format('ll')}
                                </td>
                                <td>
                                    {moment(item?.applicantDetails?.initiationDate).format('LT')}

                                </td>
                                <td>
                                    {item?.applicantDetails?.customerName}
                                </td>
                                <td>
                                    {moment(item.applicantDetails.initiationDate).from(item.tat1)}
                                </td>
                                <td>
                                    {getBank(item?.applicantDetails?.bankNBFCname)}

                                </td>
                                <td>
                                    {item?.verificationDetails?.overallStatus}

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
                            <th scope="col">Login Date</th>
                            <th scope="col">Login Time</th>
                            <th scope="col">CustomerName</th>
                            <th scope="col">TAT</th>
                            <th scope="col">ClientName</th>
                            <th scope="col">Product</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Submitted Date</th>
                            <th scope="col">Submitted Time</th>
                            <th scope="col">Product Supervisor</th>
                            <th scope="col">Agent Name</th>
                            <th scope="col">Remarks</th>
                            <th scope="col">Type</th>
                            <th scope="col">Mobile No</th>
                            <th scope="col">Contact No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.key}-${index + 1}`}>
                                <td>
                                    {item?.applicantDetails?.appid}
                                </td>
                                <td>
                                    {moment(item?.applicantDetails?.initiationDate).format('L')}
                                </td>
                                <td>
                                    {moment(item?.applicantDetails?.initiationDate).format('LT')}
                                </td>
                                <td>
                                    {item?.applicantDetails?.customerName}
                                </td>
                                <td>
                                    {/* {moment(item?.tat).fromNow()} */}
                                    {moment(item.applicantDetails.initiationDate).from(item.tat1)}
                                </td>
                                <td>
                                    {getBank(item?.applicantDetails?.bankNBFCname)}
                                </td>
                                <td>
                                    {/* {item?.applicantDetails?.product} */}
                                    {getProduct(item.applicantDetails.product)}
                                </td>
                                <td>
                                    {item?.applicantDetails?.pincode}
                                </td>
                                <td>
                                    {item?.applicantDetails?.visitedOfficeAddress ? item?.applicantDetails?.visitedOfficeAddress : item?.applicantDetails?.officeAddressProvided ? item?.applicantDetails?.officeAddressProvided : item?.applicantDetails?.visitedresidentAddress ? item?.applicantDetails?.visitedresidentAddress : item?.applicantDetails?.residenceAddressProvided}
                                </td>
                                <td>
                                    {item?.verificationDetails?.overallStatus}
                                </td>
                                <td>
                                    {moment(item?.tat1).format('L')}
                                </td>
                                <td>
                                    {moment(item?.tat1).format('LT')}
                                </td>
                                <td>
                                    {item?.verificationDetails?.productSupervisor}
                                </td>
                                <td>
                                    {item?.verificationDetails?.finalFIVerifierName}
                                </td>
                                <td>
                                    {item?.applicantDetails?.remarks}

                                </td>
                                <td>{item.applicantDetails.form}</td>
                                <td>{item.applicantDetails.mobileNo}</td>
                                <td>{item.applicantDetails.contactNo}</td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default OldCases;