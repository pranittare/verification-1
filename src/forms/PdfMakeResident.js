import React, { useEffect, useState } from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { connect } from 'react-redux';
import stamp from '../assets/stamp.jpeg'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfMakeResident = ({ data, images, refresh }) => {

    const [stamp64, setStamp64] = useState();
    const [map, setMap] = useState();
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
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#358fd4',
                                text: 'Residence Verification Report',
                                color: 'white',
                                alignment: 'center',
                                fontSize: 18,
                            },

                        ],

                    ]
                }
            },
            // { text: 'Residential Report', color: 'purple', alignment: 'center', 
            // fontSize: 18,border: [true, true, true, true], fillColor: '#ccc' },
            // { text: 'Applicant Details', style: 'header' },
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
                                text: 'Residence Address Provided'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.residenceAddressProvided
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
                                text: 'Visited Address'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.visitedresidentAddress
                            },
                            // {
                            //   // rowSpan: 1,
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Distance from Station(Km)'
                            // },
                            // {
                            //   // colSpan: 1,
                            //   border: [true, true, true, true],
                            //   text: data.distancefromNeareastStation
                            // },
                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150, 100, 150],
            //     body: [
            //       [


            //         // {
            //         //   // rowSpan: 1,
            //         //   border: [true, true, true, true],
            //         //   fillColor: '#ccc',
            //         //   text: 'Nearest Landmark'
            //         // },
            //         // {
            //         //   // colSpan: 1,
            //         //   border: [true, true, true, true],
            //         //   text: data.nearestLandMark
            //         // },


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
                                text: 'Nearest Landmark'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.landmark
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
                                text: 'Person Met Age'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.personMetAge
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Relationship with Applicant'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.personMetRealtionwithApplicant
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
                                text: 'Name and Relationship with Applicant (Others)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.personMetRealtionwithApplicantOther
                            },

                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Staying in City (No. of Yrs)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.totalYearsInCity
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
                                text: 'Staying at Current Address (No. of Yrs)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.totalYearsAtCurrentAddress
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
                                text: 'Less than 1 yr at Current Address (Prev.Address)'
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
                                text: 'Residence Status'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.residenceStatus
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
                                text: 'Customer Occupation'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.customerOccupation
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Qualification'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.qualification
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
                                text: 'Marital Status'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.marrried
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Gate/Door color & Bldg Color'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.gateDoorColor
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
                                text: 'No of Family Members'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.noOfFamilyMembers
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Earning Members'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.earningMembers
                            },
                            // GAte


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
                                text: 'Dependents'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.dependents
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Children'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.children
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
                                text: 'Office Name'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.officeName
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
                                text: data.designation
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
                                text: 'Office Address'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.officeAddress
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
                                text: "Verifier's Observation",
                                fontSize: 14,

                            },

                        ],

                    ]
                }
            },
            // { text: 'Verification Observer', style: 'header' },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [100, 150, 100, 150],
            //     body: [
            //       [

            //         {
            //           // rowSpan: 1,
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From'
            //         },
            //         {
            //           // colSpan: 1,
            //           border: [true, true, true, true],
            //           text: data.customerNameVerifiedFrom.toString()
            //         },
            //         {
            //           // rowSpan: 1,
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From Others'
            //         },
            //         {
            //           // colSpan: 1,
            //           border: [true, true, true, true],
            //           text: data.customerNameVerifiedFromOther
            //         },
            //       ],

            //     ]
            //   }
            // },
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
                                text: 'Locality of Address'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.localityOfAddress
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of House'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.typeOfHouse
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
                                text: 'Type of House Others'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.typeOfHouseOthers
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Construction Of Residence'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.constructionOfResidence
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
                                text: 'Accessibility/Approachibility'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.accessibility
                            },
                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Area of Residence (sq.ft)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.areaofResidence
                            },

                        ],

                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [525],
            //     body: [
            //       [

            //         {
            //           border: [true, true, true, true],
            //           fillColor: '#88c0eb',
            //           text: "Verifier's Observation",
            //           fontSize: 14,

            //         },

            //       ],

            //     ]
            //   }
            // },
            {
                style: 'table',
                table: {
                    widths: [100, 425],
                    body: [
                        [

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
                                text: 'Customer Attitude'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.customerAttitude
                            },

                            {
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Asset Seen At Residence'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.assetSeen
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
                                text: 'Interior Conditions'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.interior
                            },
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

                            },

                            // {
                            //   // rowSpan: 1,
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Vehical Owned'
                            // },
                            // {
                            //   // colSpan: 1,
                            //   border: [true, true, true, true],
                            //   text: data.vehicalOwned
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
                                text: 'Distance from Station(Km)'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.distancefromStation
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
                                text: 'Remark /Contact Number'
                            },
                            // {
                            //   fillColor: '#ccc',
                            //   text: 'Contact Number'
                            // },
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
                            // {
                            //   fillColor: '#ccc',
                            //   text: 'Contact Number'
                            // },
                        ],
                        // ['#', 'Name', 'Status',
                        //   'Remark', 'Contact Number',
                        // ],
                        ['2', data.TPCName2, data.TPCStatus2, data.TPCRemark2]
                    ]
                }
            },
            // {
            //   style: 'table',
            //   table: {
            //     widths: [10, 130, 100, 150, 100],

            //     body: [
            //       [
            //         {
            //           fillColor: '#ccc',
            //           text: '#'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Name'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Status'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Remark'
            //         },
            //         {
            //           fillColor: '#ccc',
            //           text: 'Contact Number'
            //         },
            //       ],
            //       // ['#', 'Name', 'Status',
            //       //   'Remark', 'Contact Number',
            //       // ],
            //       ['3', data.TPCName3, data.TPCStatus3, data.TPCRemark3,
            //         data.TPCContactnumber3]
            //     ]
            //   }
            // },
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
                                text: 'OverAll Status'
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
                                text: data.finalFIAnyRemarks
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
                            {
                                // colSpan: 1,
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Product Supervisor'
                            },
                            {
                                // colSpan: 1,
                                border: [true, true, true, true],
                                text: data.productSupervisor
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
                                // pageBreak: 'before'
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
                                // rowSpan: 1,
                                border: [true, true, true, true],
                                text: `Geo Tagging \n\n Latitude: ${data?.region?.latitude} \n Longitude: ${data?.region?.longitude} \n ${data?.locName}`,
                                link: `http://maps.google.com/maps?q=${data?.region?.latitude} +, + ${data?.region?.longitude}`,
                                color: 'blue',
                                pageBreak: 'before'
                            },

                        ]
                    ]
                }
            },

        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                color: '#2984c4'
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
    };
    useEffect(() => {
        // images = JSON.parse(images)
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                let item = images[i];
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
            <button onClick={() => { pdfMake.createPdf(documentDefinition).open() }}>Print PDfmake</button>
            <button onClick={() => { refresh() }}>Load Pdf</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}
export default connect(mapStateToProps)(PdfMakeResident); 