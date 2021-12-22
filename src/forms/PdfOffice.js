import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfTable from './PdfTable';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
export default function PdfOffice({data}) {

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );
    // const data = {
    //     id: "5df3180a09ea16dc4b95f910",
    //     items: [
    //       {
    //         sr: 1,
    //         desc: "desc1",
    //         xyz: 5,
    //       },
    //       {
    //         sr: 2,
    //         desc: "desc2",
    //         xyz: 6,
    //       },
    //     ],
    //   };
    return (
        <div>
            <div>
                <PDFViewer width="1000" height="600">
                    <PdfTable data={data} />
                </PDFViewer>
            </div>
            <br/>
            <PDFDownloadLink document={<PdfTable data={data}/>} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </div>
    )
}
