import React from 'react'
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid black",
        padding: "5px"
    },
    description: {
        width: "50%",
        borderRight: "1px solid black"

    },
    xyz: {
        paddingLeft: "8px",
        width: "50%",
    },
});
export default function PdfTableRow({ items }) {
    // const rows = () => {
    //     for (const [key, value] of Object.entries(object1)) {
    //         console.log(`${key}: ${value}`);
    //       }
    // } 
    // console.log('items', items)
    const rows = items && Object.keys(items).map((key1, index) => {
        if (key1 !== 'region' && !Array.isArray(items[key1])) {
            console.log('inside', key1, items[key1])
        return  <View style={styles.row} key={index}>
        <Text style={styles.description}>{key1}</Text>
        <Text style={styles.xyz}>{items[key1]}</Text>
      </View>
            
        }
    })
    // const rows = items && Object.entries(items).map(([key1, value], index) => {
    //     console.log('inside', key1, value)
    //     if (!value.length && key1 !== 'region') {
    //         return <View style={styles.row} key={index}>
    //             <Text style={styles.description}>{key1}</Text>
    //             <Text style={styles.xyz}>{value}</Text>
    //         </View>
    //     }
    // });
    //   console.log('rows', rows)
    return (
        <>
            {rows}
        </>
    )
}
