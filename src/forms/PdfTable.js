import React from 'react'
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import PdfItemsTable from './PdfItemsTable';

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
});

export default function PdfTable({ data }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <PdfItemsTable data={data} />
            </Page>
        </Document>
    )
}
