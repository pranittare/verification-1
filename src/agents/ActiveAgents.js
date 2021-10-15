import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap'

class Object1 {
    constructor(key, value) {
        this.length = 1
        this.output = {[this.length] : {[key]: value}}
        this.oldoutput = {[key]: value}
    }
    push(key,value){
        this.length++
        this.output[this.length] =  {[key]: value}
        this.oldoutput[key] = value
        // return this
    }
    getAll() {
        for(let i = 0; i <= this.length; i++) {
            let item = this.output[i]
            console.log('item', item)
        }
    }
}

const ActiveAgents = (props) => {
    const [allData, setAllData] = useState([])
    const combinedData = (agents, forms) => {
        let allCombined = []
        const objkeys = Object.keys(agents)
        const formKeys = Object.keys(forms)
        let formarray = []
        for (let j = 0; j < formKeys.length; j++) {
            const element1 = formKeys[j];
            let form = forms[element1]
            let newform = Object.keys(form)
            for (let index = 0; index < newform.length; index++) {
                const element2 = newform[index];
                let single = form[element2]
                formarray.push(single)
                // console.log('form', single)

            }

        }
        for (let index = 0; index < objkeys.length; index++) {
            const element = objkeys[index];
            let agent = agents[element]
            // console.log('agent', agent)
            let claimed = 0
            let submitted = 0
            for (let j = 0; j < formarray.length; j++) {
                const form = formarray[j];
                if (agent.userId  === form.selected) {
                    if (form.submitted) {
                        submitted++
                    } else if(form.claimed) {
                        claimed++
                    }
                    // console.log('match', agent, element1)

                }
            }
            agent.claimed = claimed
            agent.submitted = submitted
            allCombined.push(agent)
           
        }
        setAllData(allCombined)
        console.log('fnc started', allCombined)
        
    }
    useEffect(() => {
        // if (props.forms.length > 0) {
        // }
        combinedData(props.agents, props.forms)
        console.log(props.forms)
        // setAllData(props.data)
        // console.log('props', props.data)
    }, [props])
    return (
        <div>
            <h4>Active Agents</h4>
            <form className='d-flex justify-content-between flex-wrap'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Sr.No'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Name of Agent'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'PINCODE'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Last Updated'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Claimed'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Submitted'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Total'} /> </th>

                        </tr>
                    </thead>
                    <tbody>
                        {allData && allData.length > 0 && allData.map((item, index) => {
                            return <tr>
                                <th>{index + 1}</th>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.pincode}

                                </td>
                                <td>
                                    {item.lastUpdated}

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
                        })}
                    </tbody>
                </table>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        agents: state.agents,
        forms: state.forms

    }
}

export default connect(mapStateToProps)(ActiveAgents);
