import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: 'column',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    summary: {
        padding: 30
    },
    tableContainer: {
        padding: 20,
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    header: {
        borderTop: 'none',
    },
    row: {
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    col1: {
        width: '27%',
    },
    col2: {
        width: '15%',
    },
    row3: {
        width: '15%',
    },
    row4: {
        width: '20%',
    },
    row5: {
        width: '27%',
    },
    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
    bold: {
        fontWeight: 'bold',
    },
});


const generateMockItems = (size: number): any[] => {
    const array: any[] = [];
    while (size-- > 0) {
        const imageIndex = size % 3;
        array.push({
            name: `product #${size}`,
            ref: `#123${size}`,
            price: '35€',
            quantity: size
        });
    }
    return array;
}

const tableHeaders = () => (
    <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.description}>{"ref"}</Text>
        <Text style={styles.description}>{"name"}</Text>
        <Text style={styles.description}>{"price"}</Text>
        <Text style={styles.description}>{"quantity"}</Text>
    </View>
);

const tableRows = () => {
    const rows = generateMockItems(40).map(item => (
        <View style={styles.row} key={1}>
            <Text style={styles.description}>{item.ref}</Text>
            <Text style={styles.description}>{item.name}</Text>
            <Text style={styles.description}>{item.price}</Text>
            <Text style={styles.description}>{item.quantity}</Text>
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
}

// Create Document Component
export const PdfDoc: React.FC = () => (
    <PDFViewer style={styles.viewer}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.summary}>
                    <Text style={styles.description}>{"nif 1234"}</Text>
                    <Text style={styles.description}>{"date 22/10/2022"}</Text>
                    <Text style={styles.description}>{"total : 515€"}</Text>
                </View>
                <View style={styles.tableContainer}>
                    {tableHeaders()}
                    {tableRows()}
                    {/*<TableFooter items={data.items} />*/}
                </View>
            </Page>
        </Document>
    </PDFViewer>
);