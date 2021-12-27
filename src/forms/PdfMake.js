import React, { useEffect, useState } from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { connect } from 'react-redux';
import stamp from '../assets/stamp.jpeg'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfMake = ({ data, images, refresh }) => {

    const [stamp64, setStamp64] = useState();
    const [map, setMap] = useState();
    const [pdfImages, setPDFImages] = useState([])
    const toDataURL = (url, callback) => {
        let xhRequest = new XMLHttpRequest();
        xhRequest.onload = function () {
            let reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhRequest.response);
        };
        xhRequest.open('GET', url);
        xhRequest.responseType = 'blob';
        xhRequest.send();
    }
    const documentDefinition = {
        content: [
            {
                text: 'Office Report', color: 'purple', alignment: 'center', fontSize: 18,
                border: [true, true, true, true], fillColor: '#358fd4'
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#358fd4',
                                text: 'Office Report',
                                color: 'white',
                                alignment: 'center',
                                fontSize: 18,
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Applicant Details',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Applicant Details', style: 'header',border: [true, true, true, true] },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'App.Id/Lead id'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.appid
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Sr.No'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.srNo
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Month'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.month
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Initiation Date'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.initiationDate
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.customerName
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Bank/ NBFC name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.bankNBFCname
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.product
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Location'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.loaction
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Pincode'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.pincode
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Contact No'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.contactNo
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mobile No'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.mobileNo
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [


                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Address Provided'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.officeAddressProvided
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Mismatch Address Details'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: 'ADD DATA HERE'
                            // },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mismatch Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.mismatchAddress
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Office Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.visitedOfficeAddress
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Verification Report',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Report', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visit Date'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.visitDate
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Time'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.visitedTime
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Address Confirmed'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.addressConfirmed
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Board Seen'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.businessBoardSeen
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Landmark(Neareast)'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.landmark
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Board Seen Details'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.businessBoardSeenNote
                            }
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.personMet
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.personMetName
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Designation'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.personMetNameDesignation
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Yrs in present Employment/Business & Total Yrs of Exp'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.totalYearsExp
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Yrs At Current Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.totalYearsExpAtCurrentAddress
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Less than 1 yr at Current Address'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.lessThanYrAtCurrentAddress
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Prev Address/ Prev Employment'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.lessThanYrAtCurrentAddressNote
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nature of Business'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.natureofBusines
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nature of Business (details)'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.natureOfBusinessDetails
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Entity'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.typeofEntity
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Ownership'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.officeOwnership
                            },

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'if Rented then Rent Amount'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.rentAmount
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Details(Income/Designation)'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.detailsIncomeDesignation
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Approx Area of Office (sq.ft)'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.approxAreaofOffice
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Any other Family member working/Business'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: data.otherWorkingBusiness
                            // },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Additional Income'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.additionalIncome
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Source'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.source
                            },
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150],
            //     body: [
            //       [

            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Source'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: data.source
            //         },
            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: "Verifier's Observation",
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Observer', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.verificationObserver
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Locality of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.localityofOffice
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Construction Of Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.constructionOfOffice
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Ease of Locating'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.easeofLocating
                            },
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Activity Level'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.businessActivityLevel
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No. of Employees Seen in Office/ Business'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.noOfEmployeesWorkinginPremises
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Stock Level'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.stockLevel
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Distance from Station(Km)'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.distanceFromRailwayStation
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Office Setup Detail'
                            // },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   text: data.officeSetupDetails
                            // },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Within Municipal Limits'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.withinMunicipalLimits
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Negative Area'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.negativeArea
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Asset Seen At Office'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.assetSeen

                            },

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Interior Conditions'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.interior
                            },

                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Exterior Condition'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.exteriorconditions
                            }
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Picture Political Leader'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.picturePoliticalLeader
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Political Leader Details'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.politicalLeaderDetails
                            },
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [


                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Doc Verified'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.docVerified
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Document Details'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.documentDetails
                            }
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [150, 370],
            //     body: [
            //       [

            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Document Details'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: data.documentDetails
            //         }
            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'TPC Confirmation',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'TPC Confirmation', style: 'header' },


            {
                style: 'table',
                table: {
                    widths: [10, 130, 100, 260],

                    body: [
                        [
                            {
                                fillColor: '#ccc',
                                text: '#'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Name'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Remark /Contact Numbe'
                            },

                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['1', data.TPCName1, data.TPCStatus1, data.TPCRemark1]
                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [10, 130, 100, 260],

                    body: [
                        [
                            {
                                fillColor: '#ccc',
                                text: '#'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Name'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                fillColor: '#ccc',
                                text: 'Remark /Contact Number'
                            },
                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['2', data.TPCName2, data.TPCStatus2, data.TPCRemark2]
                    ]
                }
            },

            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Market Reputation/Dedup Check'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.marketReputation
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TPCRemarks
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'TVR Comments',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'TVR Comments', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Number'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRNumber
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Designation'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRDesignation
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRStatus
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRBusinessName
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of years in Business'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRNoofyearsinBusiness
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.TVRRemarks
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                border: [true, true, true, true],
                                fillColor: '#88c0eb',
                                text: 'Final Status',
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Final FI Status', style: 'header' },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [

                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Overall Status'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.overallStatus
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Agency name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.finalFIAgencyname
                            },
                        ],

                    ]
                }
            },
            {
                style: 'table',
                table: {

                    widths: [100, 420],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Standard Remark'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.finalFIAnyRemarks,
                                // pageBreak: 'before'
                            }


                        ],


                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                border: [true, true, true, true],
                                text: data.finalFIRemarks
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Company Stamp'
                            },
                            {

                                border: [true, true, true, true],
                                image: stamp64,
                                width: 150,
                            },
                        ],

                    ]
                }
            },

            {
                style: 'table',
                table: {

                    widths: [100, 150, 100, 150],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product Supervisor'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.productSupervisor,
                                // pageBreak: 'before'
                            },
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verifier Name'
                            },
                            {

                                border: [true, true, true, true],
                                text: data.finalFIVerifierName
                            },
                        ],
                    ]
                }
            },
            {
                style: 'table',
                table: {
                    widths: [100, 420],
                    body: [
                        [
                            {

                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verification Note'
                            },
                            {

                                fontSize: 9,
                                border: [true, true, true, true],
                                text: 'The Observation/photograph provided in the report is purely based on photograph taken in approximate vincity of the address provided. We, as a process, do not check or collect any documentary evidence to check the authenticity of the information gathered. Neither we certify the correctness of observation nor the photograph is admissible as an evidence. Photograph is additional information provided by us as customary practice without any corresponding liabilities. We do takecare of tagging photos/observation to the appropriate case/applicant, however, considering visual transmission of data, erros can not be eliminated.  ',
                                // pageBreak: 'after'
                            },
                        ],
                    ]
                }
            },
            {
                style: 'table',
                margin: [0, 20],
                table: {

                    widths: [250, 270],
                    body: [
                        [
                            {
                                image: map,
                                width: 200,
                                pageBreak: 'before'
                            },
                            {

                                border: [true, true, true, true],
                                text: `Geo Tagging \n\n Latitude: ${data?.region?.latitude} \n Longitude: ${data?.region?.longitude} \n ${data.locName}`,
                                link: `http://maps.google.com/maps?q=${data?.region?.latitude} +, + ${data?.region?.longitude}`,
                                color: 'blue',
                                pageBreak: 'before'
                            },

                        ]
                    ]
                }
            },
            ...pdfImages,
            // {
            //   image: images,
            //   width: 200
            // },

        ],
        styles: {

            header: {
                fontSize: 14,
                bold: true,
                color: '#2984c4',
                // text-align:center
            },
            table: {
                fontSize: 9
            },
            mainheader: {
                fontSize: 16,
                fillColor: '#bf9728',
                color: 'black'
            }
        }

    }
    useEffect(() => {
        if (images && images.length > 0) {
            let myImages = [];
            images.map((item, index) => {
                // console.log('item', item);
                toDataURL(item, (dataUrl) => {
                    myImages.push({
                        style: 'table',
                        table: {
                            widths: [500],
                            body: [
                                [
                                    {
                                        image: dataUrl,
                                        width: 500,
                                    },
                                ]
                            ]
                        }
                    })
                }
                )
            })
            setPDFImages(myImages)
            if (stamp) {
                toDataURL(stamp, (dataUrl) => {
                    setStamp64(dataUrl)
                });
                toDataURL(`https://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&markers=${data?.region?.latitude},${data?.region?.longitude}&key=AIzaSyBPoGWXtGubXKV44J4D4ZsBtvY-lIBjEMU&zoom=16`, (dataUrl) => {
                    setMap(dataUrl)
                });
            }
        }
    }, [images.length])
    return (
        <div>
            <button className='btn text-primary' onClick={() => { pdfMake.createPdf(documentDefinition).open() }}>Print PDfmake</button>
            <button className='btn text-danger' onClick={() => { refresh() }}>Load Pdf</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}
export default connect(mapStateToProps)(PdfMake); 