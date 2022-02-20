import React from 'react'
import AddVendor from './AddVendor';

const Vendor = () => {
    return (
        <div>
            <AddVendor />
            <table className="table table-striped mt-2">
                <thead>
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Date of Entry</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vendor Code</th>
                        <th scope="col">Locations</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>
                            {/* {{item.agreementDate.seconds * 1000 | date:'mediumDate'}}  */}
                        </td>
                        <td>
                            <button className="btn text-primary" data-toggle="modal"
                                data-target="#exampleModal">
                                {/* {{item.clientName}} */}
                            </button>
                        </td>
                        <td>
                            {/* {{item.vendorCode}} */}
                        </td>
                        <td>
                            {/* {{item.location}} */}
                        </td>
                        <td>
                            <button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" >X</button>
                            <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                aria-hidden="true" data-backdrop="false">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Are You Sure you want to Delete
                                                {/* {{itemdata?.vendorCode}} */}
                                            </h5>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                            <button type="button" className="btn btn-danger">Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Vendor;