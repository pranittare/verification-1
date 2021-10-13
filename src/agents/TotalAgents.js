import React from 'react'
import { Input } from 'reactstrap'

export default function TotalAgents() {
    return (
        <div>
            <h4>Total Agents</h4>
            <form className='d-flex justify-content-between flex-wrap'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Sr.No'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Name of Agent'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Mobile No.'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'PinCode'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Status'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'KYC Update'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'KYC Renewe'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Remarks'} /> </th>

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
