import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input, Button } from 'reactstrap'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AddAgent from './AddAgent';
import uuid from 'react-uuid';

const TotalAgents = ({ agents, rtAgents, branch }) => {
    const formatedDate = new Date().toDateString()

    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    const initialdata = {
        name: "",
        mobile1: "",
        pincode: "",
        remarks: "",
    }
    const [filterSearch, setFilterSearch] = useState(initialdata)
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const [add, setAdd] = useState(false);
    const handleFilter = (e) => {
        let data = { ...filterSearch }
        data[e.currentTarget.name] = e.currentTarget.value
        setFilterSearch(data);
        // let data = allData
        // if (e.currentTarget.value) {
        //     setAllData(data.filter(item => {
        //         // console.log('item', item)

        //         if (e.currentTarget.name === 'mobile1') {
        //             let concat = `${item.mobile1}` + `${item.mobile2}`

        //             let rval = concat.includes(e.currentTarget.value)
        //             return rval
        //         }
        //         if (e.currentTarget.name === 'pincode') {
        //             // secondary pincode logic
        //             let concat = item.secondaryPincodes.map(x => x.pincodes).join(' ')
        //             let concat1 = `${concat} ${item.pincode}`
        //             let rval = concat1.includes(e.currentTarget.value)
        //             return rval
        //         } else {
        //             if (item[e.currentTarget.name]) {
        //                 let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
        //                 return rval
        //             }
        //         }
        //     }
        //     ))
        // } else {
        //     setAllData(agents)
        // }
        setReset(Math.random())

    }

    const combineData = () => {
        let data = []
        for (let index = 0; index < agents.length; index++) {
            const element = agents[index];
            for (const key in rtAgents) {
                if (Object.hasOwnProperty.call(rtAgents, key)) {
                    const rtElement = rtAgents[key];
                    if (element.userId === rtElement.userId && rtElement.uniqueId && rtElement.uniqueId !== 'Disabled') {
                        element.uniqueId = rtElement.uniqueId
                    }

                }
            }
            data.push(element)
        }
        return data
    }
    const findDuplicate = (item) => {
        let obj = {}
        let dup = [];
        for (let index = 0; index < item.length; index++) {
            const element = item[index];
            if (obj[element.pincodes]) {
                dup.push(element.pincodes)
            } else {
                obj[element.pincodes] = element.pincodes
            }
        }
        return dup.toString();
    }
    const AgentStatus = ({ item }) => {
        for (const key in rtAgents) {
            if (Object.hasOwnProperty.call(rtAgents, key)) {
                const rtElement = rtAgents[key];
                if (item.userId === rtElement.userId) {
                    if (rtElement.uniqueId === 'Disabled') {
                        return <p className='text-danger'>Not Active</p>
                    }
                    return <p className='text-success'>Active</p>
                }

            }
        }
        return null
    }
    const handleModal = (status, item) => {
        console.log('handle', status, item)
        // if (status === 'add') {
        //     return <AddAgent allAgents={allData} add={'add'} />
        // }
        return <AddAgent allAgents={item ? item : allData} add={item ? 'update' :'add'} />

    }
    const filteredSearch = (item) => {
        // console.log('item', item)
        if (filterSearch.name) {
            return item.name?.toLowerCase().includes(filterSearch.name)
        }
        if (filterSearch.remarks) {
            return item.remarks?.toLowerCase().includes(filterSearch.remarks)
        }
        if (filterSearch.mobile1) {
            let mobileTotal = `${item.mobile1} ${item.mobile2}`
            return mobileTotal.toLowerCase().includes(filterSearch.mobile1.toLowerCase())
        }
        if (filterSearch.pincode) {
            let concat = item.secondaryPincodes.map(x => x.pincodes).join(' ')
            let concat1 = `${concat} ${item.pincode}`
            return concat1.includes(filterSearch.pincode)
        }

        return item
    }

    useEffect(() => {
        // console.log('agents', props.agents)
        setAllData(combineData())
        setReset(Math.random())
        // console.log('props', combineData())
    }, [agents, rtAgents])

    // Duplicate entries
    useEffect(() => {
        setTimeout(() => {
            if (allData && allData.length > 0) {
                var uniq = allData
                    .map((name) => {
                        return {
                            count: 1,
                            name: name.name
                        }
                    })
                    .reduce((a, b) => {
                        a[b.name] = (a[b.name] || 0) + b.count
                        return a
                    }, {})

                var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
                duplicates && duplicates.length > 0 && alert(`Duplicate Entries Found: ${duplicates.join(', ')}`)
                console.log('duplicates', duplicates)
            }
        }, 5000)
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Total Agents</h4>
                <button onClick={getExcel} className='btn btn-primary'>Get Excel</button>
                {/* <Button onClick={()=>handleModal('add')}>Add Agent</Button> */}
                <AddAgent allAgents={allData} add={'add'} />
            </div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="d-none "
                table="html-table"
                filename={`Active-${formatedDate}`}
                sheet="tablexls"
                buttonText="Download as XLS" />
            {/* <form className='d-flex justify-content-between flex-wrap'> */}
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
                    {reset > 0 && allData && allData.length > 0 && allData.filter(filteredSearch).map((item, index) => {
                        // console.log('item', item)
                        // if (item.branch === branch)
                            return <tr key={item.name}>
                                <th>{index + 1}</th>
                                <td >
                                    {/* <Button color={item.name ? "link" : "danger"} onClick={()=>handleModal('update', item)}>{item.name}</Button> */}
                                    <AddAgent agent={item} add={'update'}  />
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
                                                return <div key={uuid()}>
                                                    {item1.pincodes}
                                                </div>
                                            })}
                                            {findDuplicate(item.secondaryPincodes) && <div className='text-danger'>
                                                Duplicate :{findDuplicate(item.secondaryPincodes)}
                                            </div>}
                                        </div>
                                    }

                                </td>
                                <td>
                                    <AgentStatus item={item} />
                                </td>
                                <td>
                                    {moment(item.kycUpdateDate.seconds * 1000).format('ll')}
                                </td>
                                <td>
                                    {moment(item.kycreneweddate.seconds * 1000).format('ll')}
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
                        if (item.branch === branch) {
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
                                            {item.secondaryPincodes.map((item1, index1) => {
                                                return <div key={item1.pincodes}>{item1.pincodes}</div>
                                            })}
                                        </div>
                                    }

                                </td>
                                <td>
                                    <AgentStatus item={item} />
                                </td>
                                <td>
                                    {moment(item.kycUpdateDate.seconds * 1000).format('ll')}
                                </td>
                                <td>
                                    {moment(item.kycreneweddate.seconds * 1000).format('ll')}
                                </td>
                                <td>
                                    {item.remarks}
                                </td>
                            </tr>

                        }
                    })
                    }
                </tbody>
            </table>
            {/* </form> */}
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        agents: state.fagents,
        branch: state.branch,
        rtAgents: state.agents
    }
}
export default connect(mapStateToProps)(TotalAgents)