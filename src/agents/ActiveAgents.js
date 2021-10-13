import React from 'react'
import { Input } from 'reactstrap'

export default function ActiveAgents() {
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
                        <tr>
                            <th>1</th>
                            <td>
                                <Input type="text" name="TPCName1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>

                        </tr>
                        <tr>
                            <th>2</th>
                            <td>
                                <Input type="text" name="TPCName1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>

                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
