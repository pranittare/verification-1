import { useState } from "react"
import { Button, Col, Input, Row } from "reactstrap"
import { getDatabase, remove, ref } from "firebase/database";
// import { doc, deleteDoc, addDoc, updateDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Cleanup = () => {
    const db = getDatabase();
    // const fdb = getFirestore();
    const [val, setVal] = useState('');
    const realTimeAgents = useSelector(state => state.agents);
    const firestoreAgents = useSelector(state => state.fagents);
    const realtimeAgentsArray = () => {
        let temp = []
        const objkeys = Object.keys(realTimeAgents)
        for (let index = 0; index < objkeys.length; index++) {
            const element = objkeys[index];
            let agent = realTimeAgents[element]
            if (agent.branch) {
                agent.key = element
            }
            if (agent?.userId?.toLowerCase() === val?.toLowerCase()) {
                temp.push(agent)
            }
        }
        return temp
    }
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete?") === true) {
            console.log('deleted')
            remove(ref(db, `agents/${id}`)).then(res => {
                alert("User Removed")
                window.reload()
            })
        }
    }
    return <div>
        <div className="d-flex justify-content-center mt-2">
        <Input value={val} placeholder={'enter userID'} className="w-50" onChange={(e)=>setVal(e.target.value)}/>
        </div>
        <div className="mt-4">
            <Row>
                <Col>
                <h5>Realtime DB</h5>
                {realtimeAgentsArray().map(item => {
                    return <div key={item.key}>
                       <p>{item?.name} <Button onClick={()=>handleDelete(item.key)}>Delete</Button></p>
                       <p>{item.pincode}</p>
                       {item?.secondary?.map((item, index) => {
                        return <p>{index + 1} -- {item.pincodes}</p> 
                       })}
                       <p>Key -- {item.key}</p>
                       
                    </div>
                })}
                </Col>
                <Col>
                <h5>Firestore DB</h5>
                {firestoreAgents?.map(item => {
                    if (item.userId.toLowerCase() === val.toLowerCase()) {
                    return <div key={item.key}>
                        <p>{item?.name}</p>
                       <p>{item.pincode}</p>
                        {item?.secondaryPincodes?.map((item, index) => {
                        return <p>{index + 1} -- {item.pincodes}</p> 
                       })} 
                       <p>Key -- {item.key}</p>
                    </div>
                    }
                })}
                </Col>
            </Row>
        </div>
    </div>
}
export default Cleanup