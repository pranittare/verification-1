import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const TotalAgents = (props) => {
    const formatedDate = new Date().toDateString()

    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleFilter = (e) => {
        let data = allData
        if (e.currentTarget.value) {
            setAllData(data.filter(item => {
                if (item[e.currentTarget.name]) {
                    let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
                    return rval
                }
            }
            ))
        } else {
            setAllData(props.agents)
        }
        setReset(Math.random())

    }
    useEffect(() => {
        // console.log('agents', props.agents)
        setAllData(props.agents)
        setReset(Math.random())
        console.log('props', props.agents)
    }, [props.agents])
   
    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Total Agents</h4>
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
                            <th scope="col"> <Input type="text" name="srno" placeholder={'Sr.No'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="name" placeholder={'Name of Agent'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="mobile1" placeholder={'Mobile No.'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="pincode" placeholder={'Pincode'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="status" placeholder={'Status'} /> </th>
                            <th scope="col"> <Input type="text" name="kycUpdateDate" placeholder={'KYC Update'} /> </th>
                            <th scope="col"> <Input type="text" name="kycreneweddate" placeholder={'KYC Renewe'} /> </th>
                            <th scope="col"> <Input type="text" onChange={handleFilter} name="remarks" placeholder={'Remarks'} /> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            // console.log('item', item)
                            return <tr key={`${item.userId}-${item.agentCode}-${index}`}>
                                <th>{index + 1}</th>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.mobile1}
                                    <hr />
                                    {item.mobile2}
                                </td>
                                <td>
                                    {item.pincode}
                                    {item.secondaryPincodes &&
                                        <div>
                                            <hr />
                                            {item.secondaryPincodes.map((item1, index1) => {
                                                return <div key={item1.pincodes}>{item1.pincodes}</div>
                                            })}
                                        </div>
                                    }

                                </td>
                                <td>
                                    {item.uniqueId ? item.uniqueId !== 'Disabled' ? 'Active' : 'InActive' : 'InActive'}
                                </td>
                                <td>
                                    {moment(item.kycUpdateDate.seconds*1000).format('ll')}
                                </td>
                                <td>
                                    {moment(item.kycreneweddate.seconds*1000).format('ll')}
                                </td>
                                <td>
                                    {item.remarks}
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
                <table className="table table-striped table-bordered d-none" id='html-table'>
                    <thead>
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col"> Name of Agent</th>
                            <th scope="col"> Mobile No</th>
                            <th scope="col"> Pincode</th>
                            <th scope="col"> Status</th>
                            <th scope="col"> KYC Update</th>
                            <th scope="col"> KYC Renewe</th>
                            <th scope="col"> Remarks</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr key={`${item.userId}-${item.agentCode}-${index}`}>
                            <th>{index + 1}</th>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.mobile1}
                                <hr />
                                {item.mobile2}
                            </td>
                            <td>
                                {item.pincode}
                                {item.secondaryPincodes &&
                                    <div>
                                        {/* <hr /> */}
                                        {item.secondaryPincodes.map((item1, index1) => {
                                            return <div key={item1.pincodes}>{item1.pincodes}</div>
                                        })}
                                    </div>
                                }

                            </td>
                            <td>
                                {item.uniqueId ? item.uniqueId !== 'Disabled' ? 'Active' : 'InActive' : 'InActive'}
                            </td>
                            <td>
                                {moment(item.kycUpdateDate.seconds*1000).format('ll')}
                            </td>
                            <td>
                                {moment(item.kycreneweddate.seconds*1000).format('ll')}
                            </td>
                            <td>
                                {item.remarks}
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
        agents: state.fagents,
    }
}
export default connect(mapStateToProps)(TotalAgents)