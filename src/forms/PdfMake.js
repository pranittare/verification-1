import React, { useEffect } from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { connect } from 'react-redux';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfMake = ({ data, images, refresh }) => {

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
                                // rowSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'App.Id/Lead id'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.appid
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Sr.No'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Month'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.month
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Initiation Date'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Name'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.customerName
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Bank/ NBFC name'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.product
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Location'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Pincode'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.pincode
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Contact No'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mobile No'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Address Provided'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.officeAddressProvided
                            },
                            // {
                            //   // rowSpan: 1,
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Mismatch Address Details'
                            // },
                            // {
                            //   // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Mismatch Address'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.mismatchAddress
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Office Address'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visit Date'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.visitDate
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Visited Time'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Address Confirmed'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.addressConfirmed
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Board Seen'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Landmark(Neareast)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.landmark
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Board Seen Details'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.personMet
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Name'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Person Met Designation'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.personMetNameDesignation
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Yrs in present Employment/Business & Total Yrs of Exp'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Yrs At Current Address'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.totalYearsExpAtCurrentAddress
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Less than 1 yr at Current Address'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Prev Address/ Prev Employment'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.lessThanYrAtCurrentAddressNote
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nature of Business'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Nature of Business (details)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.natureOfBusinessDetails
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Entity'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Ownership'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.officeOwnership
                            },

                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'if Rented then Rent Amount'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Details(Income/Designation)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.detailsIncomeDesignation
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Approx Area of Office (sq.ft)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.approxAreaofOffice
                            },
                            // {
                            //   // rowSpan: 1,
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Any other Family member working/Business'
                            // },
                            // {
                            //   // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Additional Income'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.additionalIncome
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Source'
                            },
                            {
                                // colSpan: 1,
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
            //           // rowSpan: 1,
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Source'
            //         },
            //         {
            //           // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of Office'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.verificationObserver
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Locality of Office'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Construction Of Office'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.constructionOfOffice
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Ease of Locating'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Activity Level'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.businessActivityLevel
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No. of Employees Seen in Office/ Business'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Stock Level'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.stockLevel
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Distance from Station(Km)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.distanceFromRailwayStation
                            },
                            // {
                            //   // rowSpan: 1,
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Office Setup Detail'
                            // },
                            // {
                            //   // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Within Municipal Limits'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.withinMunicipalLimits
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Negative Area'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Asset Seen At Office'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.assetSeen

                            },

                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Interior Conditions'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Exterior Condition'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Picture Political Leader'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.picturePoliticalLeader
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Political Leader Details'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Doc Verified'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.docVerified
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Document Details'
                            },
                            {
                                // colSpan: 1,
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
            //           // rowSpan: 1,
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Document Details'
            //         },
            //         {
            //           // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Market Reputation/Dedup Check'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.marketReputation
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Number'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.TVRNumber
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Designation'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Status'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.TVRStatus
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Business Name'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of years in Business'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.TVRNoofyearsinBusiness
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Overall Status'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.overallStatus
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Agency name'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Standard Remark'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Remarks'
                            },
                            {
                                border: [true, true, true, true],
                                text: data.finalFIRemarks
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Company Stamp'
                            },
                            // {
                            // colSpan: 1,
                            // border: [true, true, true, true],
                            // image: stamp2,
                            // width: 150
                            // text: 'Image'
                            // }
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product Supervisor'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.productSupervisor,
                                // pageBreak: 'before'
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verifier Name'
                            },
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Verification Note'
                            },
                            {
                                // colSpan: 1,
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
                            // {
                            // image: map2,
                            //     width: 200,
                            //     pageBreak: 'before'
                            // },
                            {
                                // rowSpan: 1,
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
            // tableHeader {
            //   fillColor: '#b4c1de'
            // }
            // table: {
            //   fillColor: 'white',
            //   // fillColor: '#b4c1de',
            //   color: 'black',
            //   // color: white
            // },
            // tbody: {
            //   fillColor: 'white',
            //   color: 'black',
            // }
        }

    }
    useEffect(() => {
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                let item = images[i];
                console.log('item', item);
                toDataURL(item, (dataUrl) => {
                    documentDefinition.content.push({
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
            }
        }
    }, [images.length])

    return (
        <div>
            <button onClick={() => { pdfMake.createPdf(documentDefinition).open()}}>Print PDfmake</button>
            <button onClick={() => { refresh()}}>Load Pdf</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}
export default connect(mapStateToProps)(PdfMake); 