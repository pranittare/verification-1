import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";
import PdfTableRow from './PdfTableRow';
import PdfTableImages from './PdfTableImages';
// import { useSelector } from 'react-redux';
// import { store } from '../index';
const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    breakable: { width: '100%', height: 400 },
    subtitle: {
        fontSize: 18,
        margin: 30,
    },
});
const PdfItemsTable = ({ data, images }) => {
    // const [refresh, setRefresh] = useState(0);
    // const images = store.getState().images
    // useEffect(() => {
    //     if (images.length > 0) {
    //         setRefresh(Math.random())
    //     }

    // }, [images.length > 0])
    return (
        <View style={styles.tableContainer}>
            {data && Object.keys(data).map((key1, index) => {
                if (key1 !== 'region' && !Array.isArray(data[key1])) {
                    return <PdfTableRow key={key1} name={key1} value={data[key1]}/>
                }
            })}
            {/* <View style={styles.breakable}/> */}
            {/* <Text break>Images</Text> */}
            <Text style={styles.subtitle} break>
                Images
            </Text>
            {console.log('map', images)}
            {data && images.map((item, index) => {
                return <View break>
                    <Text>{index + 1}</Text>
                    <PdfTableImages src={item} key={item} />
                    </View>
            })}

            {/*<TableHeader />*/}
            {/* <PdfTableRow items={data} />
            <PdfTableRow items={data} /> */}
            {/*<TableFooter items={data.items} />*/}
        </View>

    )
}

export default PdfItemsTable;