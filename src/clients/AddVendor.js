import React from 'react'

export default function AddVendor({setClientInfo}) {

  return (
    <button className='btn btn-primary' onClick={()=>setClientInfo(true)}>addVendor</button>
  )
}
