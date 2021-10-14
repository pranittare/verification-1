import React,{useEffect} from 'react'
import {connect} from 'react-redux'

const Dashboard=(props)=> {

    useEffect(()=>{
        console.log('dashboard redux',props)
      },[])

    return (
        <div className='row'>
            <div className="col-6 bg-secondary">
                cases Toady
            </div>
            <div className="col-6 bg-danger">
                Total Cases
            </div>
            <div className="col-6 bg-warning">
                Unclaimed cases
            </div>
            <div className="col-6 bg-primary">
                Active agents
            </div>
            <div className="col-12 bg-success">
                TAt
            </div>

            <button value='update store' onClick={()=> props.dispatch({type:'DATA', data:'XYZ'})}>update redux</button>
            
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      userData: state.data
    }
  }
  export default connect(mapStateToProps)(Dashboard);