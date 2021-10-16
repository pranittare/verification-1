import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'

const TotalAgents = (props) => {
    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);

    useEffect(() => {
        // console.log('agents', props.agents)
        setAllData(props.agents)
        setReset(Math.random())
    }, [props.agents])
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
    return (
        <div>
            <h4>Total Agents</h4>
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
                            return <tr key={item.userId}>
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
                                </td>
                                <td>
                                    <Input type="text" name="TPCRemark1" />
                                </td>
                                <td>
                                    {item.kycUpdateDate.seconds.toString()}
                                </td>
                                <td>
                                    {item.kycreneweddate.seconds.toString()}
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