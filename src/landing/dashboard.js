import React from 'react'

export default function Dashboard() {
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
            
        </div>
    )
}
