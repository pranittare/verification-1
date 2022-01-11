import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'
import { combinedData } from '../utils/utils'
import { onFilter } from '../utils/input-filter'
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ActiveAgents = (props) => {
    const formatedDate = new Date().toDateString()

    const [allData, setAllData] = useState([])
    const [reset, setReset] = useState(0);
    // const combinedData = (agents, forms) => {
    //     let allCombined = []
    //     const objkeys = Object.keys(agents)
    //     const formKeys = Object.keys(forms)
    //     let formarray = []
    //     for (let j = 0; j < formKeys.length; j++) {
    //         const element1 = formKeys[j];
    //         let form = forms[element1]
    //         let newform = Object.keys(form)
    //         for (let index = 0; index < newform.length; index++) {
    //             const element2 = newform[index];
    //             let single = form[element2]
    //             formarray.push(single)
    //             // console.log('form', single)

    //         }

    //     }
    //     for (let index = 0; index < objkeys.length; index++) {
    //         const element = objkeys[index];
    //         let agent = agents[element]
    //         // console.log('agent', agent)
    //         let claimed = 0
    //         let submitted = 0
    //         for (let j = 0; j < formarray.length; j++) {
    //             const form = formarray[j];
    //             if (agent.userId === form.selected) {
    //                 if (form.submitted) {
    //                     submitted++
    //                 } else if (form.claimed) {
    //                     claimed++
    //                 }
    //                 // console.log('match', agent, element1)

    //             }
    //         }
    //         agent.claimed = claimed
    //         agent.submitted = submitted
    //         allCombined.push(agent)

    //     }
    //     setAllData(allCombined)
    //     setReset(Math.random())
    //     console.log('fnc started', allCombined)

    // }
    // const onFilter = (e) => {
    //     let data = allData
    //     if (e.currentTarget.value) {
    //         setAllData(data.filter(item => {
    //             if (item[e.currentTarget.name]) {
    //                 let rval = item[e.currentTarget.name].toLocaleLowerCase().includes(e.currentTarget.value)
    //                 return rval
    //             }
    //         }
    //         ))
    //         setReset(Math.random())
    //     } else {
    //         combinedData(props.agents, props.forms)
    //     }

    // }
    const getExcel = () => {
        let table = document.getElementById('test-table-xls-button')
        table.click()
    }
    const handleFilter = (e) => {
        setAllData(onFilter(e, allData, props.agents, props.forms))
        setReset(Math.random())

    }
    useEffect(() => {
        // if (props.forms.length > 0) {
        // }
        setAllData(combinedData(props.agents, props.forms))
        setReset(Math.random())

        // console.log(props.forms)
        // setAllData(props.data)
        // console.log('props', props.data)
    }, [props])
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
                duplicates.length > 0 && alert(`Duplicate Entries Found: ${duplicates.join(', ')}`)
                console.log('duplicates', duplicates)
            }
        }, 5000)
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-around mb-2 mt-2'>

                <h4>Active Agents</h4>
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
                            <th scope="col"> <Input type="text" name="srno" onChange={handleFilter} placeholder={'Sr.No'} /> </th>
                            <th scope="col"> <Input type="text" name="name" placeholder={'Name of Agent'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="pincode" placeholder={'PINCODE'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="lastUpdated" placeholder={'Last Updated'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="claimed" placeholder={'Claimed'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="submitted" placeholder={'Submitted'} onChange={handleFilter} /> </th>
                            <th scope="col"> <Input type="text" name="total" placeholder={'Total'} onChange={handleFilter} /> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.sort((a,b) => {
                            return (b.claimed + b.submitted) - (a.claimed + a.submitted)
                        }).map((item, index) => {
                            if (item.isLoggedIn && item.branch === props.branch) {
                                return <tr key={item.userId}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <a href={`http://maps.google.com/maps/search/?api=1&query=${item?.location?.coords?.latitude},${item?.location?.coords?.longitude}`}
                                            target="_blank" className="text-primary">
                                            {item.name}
                                        </a>
                                        <hr />
                                        {item.userId}
                                    </td>
                                    <td>
                                        {item.pincode}
                                        {item?.secondary && <hr />}
                                        {item.secondary?.length > 0 && item.secondary?.map((item, index) => {
                                            return <div key={`${item.pincode}-${index}`}>
                                                {item.pincodes}
                                            </div>
                                        })
                                        }
                                    </td>
                                    <td>
                                        {moment(item.lastUpdated).format('lll')}

                                    </td>
                                    <td>
                                        {item.claimed}

                                    </td>
                                    <td>
                                        {item.submitted}

                                    </td>
                                    <td>
                                        {item.claimed + item.submitted}

                                    </td>

                                </tr>
                            }
                        })}
                    </tbody>
                </table>
                <table className="table table-striped table-bordered d-none" id='html-table'>
                    <thead>
                        <tr>
                            <th scope="col"> srno</th>
                            <th scope="col"> name</th>
                            <th scope="col"> pincode</th>
                            <th scope="col"> lastUpdated</th>
                            <th scope="col"> claimed</th>
                            <th scope="col"> submitted</th>
                            <th scope="col"> total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reset > 0 && allData && allData.length > 0 && allData.map((item, index) => {
                            if (item.isLoggedIn && item.uniqueId && item.branch === props.branch) {
                                return <tr key={item.userId}>
                                    <th>{index + 1}</th>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.pincode}

                                    </td>
                                    <td>
                                        {moment(item.lastUpdated).format('lll')}

                                    </td>
                                    <td>
                                        {item.claimed}

                                    </td>
                                    <td>
                                        {item.submitted}

                                    </td>
                                    <td>
                                        {item.claimed + item.submitted}

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
    // console.log('state', state)
    return {
        agents: state.agents,
        forms: state.forms,
        branch: state.branch
    }
}

export default connect(mapStateToProps)(ActiveAgents);
