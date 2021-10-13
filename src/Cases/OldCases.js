import React from 'react'
import { Input } from 'reactstrap'

const OldCases = () => {
    return (
        <div>
            <h4>Old Cases</h4>
            <form className='d-flex justify-content-between flex-wrap'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th scope="col"> <Input type="text" name="TPCName1" placeholder={'ApplicationID'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'LoginDate'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'LoginTime'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'CustomerName'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'TAT'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'ClientName'} /> </th>
                            <th scope="col"> <Input type="text" name="TPCName1" placeholder={'Status'} /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
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
                            <td>
                                <Input type="text" name="TPCRemark1" />
                            </td>
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
export default OldCases