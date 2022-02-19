import React, { useEffect } from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { connect } from 'react-redux';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfMakeResident = ({ data, images, download, initiationDate, stampAndMap, setpdfViewed }) => {

    const {stamp, map} = stampAndMap
    let assetSeenAtResident = data?.assetSeenAtResidence?.toString()
    let exteriorConditons = data?.exteriorConditions?.toString()
    let interiorConditions = data?.interiorConditions?.toString()
    const documentDefinition = {
        content: [
            {
                style: 'table',
                table: {
                    widths: [525],
                    body: [
                        [

                            {
                                
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
                                text: initiationDate
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
                                text: data?.bankNBFCname?.clientName
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
                                text: data?.product?.productName
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
                                text: 'Residence Address Provided'
                            },
                            {
                                
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
                                text: 'Visited Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.visitedresidentAddress
                            },
                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Distance from Station(Km)'
                            // },
                            // {
                            //   
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
            //         //   
            //         //   border: [true, true, true, true],
            //         //   fillColor: '#ccc',
            //         //   text: 'Nearest Landmark'
            //         // },
            //         // {
            //         //   
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
                                text: 'Nearest Landmark'
                            },
                            {
                                
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
                                text: 'Person Met Age'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.personMetAge
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Relationship with Applicant'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Name and Relationship with Applicant (Others)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.personMetRealtionwithApplicantOther
                            },

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Staying in City (No. of Yrs)'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Staying at Current Address (No. of Yrs)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.totalYearsAtCurrentAddress
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
                                text: 'Less than 1 yr at Current Address (Prev.Address)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.lessThanYrAtCurrentAddressNote
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Residence Status'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Occupation'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.customerOccupation
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Qualification'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Marital Status'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.marrried
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Gate/Door color & Bldg Color'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'No of Family Members'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.noOfFamilyMembers
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Earning Members'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Dependents'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.dependents
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Children'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Name'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.officeName
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Designation'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Office Address'
                            },
                            {
                                
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
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From'
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           text: data.customerNameVerifiedFrom.toString()
            //         },
            //         {
            //           
            //           border: [true, true, true, true],
            //           fillColor: '#ccc',
            //           text: 'Customer Name Verified From Others'
            //         },
            //         {
            //           
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Locality of Address'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.localityOfAddress
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of House'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Type of House Others'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.typeOfHouseOthers
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Construction Of Residence'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Accessibility/Approachibility'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.accessibility
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Area of Residence (sq.ft)'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Ease of Locating'
                            },
                            {
                                
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Customer Attitude'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.customerAttitude
                            },

                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Asset Seen At Residence'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: assetSeenAtResident
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
                                text: 'Interior Conditions'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: interiorConditions
                            },
                            {
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Exterior Condition'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: exteriorConditons

                            },

                            // {
                            //   
                            //   border: [true, true, true, true],
                            //   fillColor: '#ccc',
                            //   text: 'Vehical Owned'
                            // },
                            // {
                            //   
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
                                
                                border: [true, true, true, true],
                                fillColor: '#ccc',
                                text: 'Distance from Station(Km)'
                            },
                            {
                                
                                border: [true, true, true, true],
                                text: data.distancefromStation
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
                                text: 'OverAll Status'
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
                                image: stamp,
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
                                text: data.productSupervisor
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
            ...images,

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
        if (download) {
            document.getElementById('download').click()
        }
    },[download]);
    return (
        <div>
            <button className='btn text-primary' onClick={() => { pdfMake.createPdf(documentDefinition).open(); setpdfViewed(true) }}>View PDF</button>
            <button className='btn text-primary' id='download' onClick={() => { pdfMake.createPdf(documentDefinition).download(); setpdfViewed(true) }}>Download PDF</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        stampAndMap: state.stampAndMap
    }
}
export default connect(mapStateToProps)(PdfMakeResident); 