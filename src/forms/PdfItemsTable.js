import React from 'react'
import { View, StyleSheet } from "@react-pdf/renderer";
import PdfTableRow from './PdfTableRow';

const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
export default function PdfItemsTable({ data }) {
    return (
        <View style={styles.tableContainer}>
        {/*<TableHeader />*/}
        <PdfTableRow items={data} />
        {/*<TableFooter items={data.items} />*/}
      </View>
    )
}
