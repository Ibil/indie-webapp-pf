import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import { centsToCurrency } from '@app/utils/utils';

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
        width: '40%',
    },
    col2: {
        width: '30%',
    },
    col3: {
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


const tableHeaders = () => (
    <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.col1}>{"Product Id"}</Text>
        <Text style={styles.col2}>{"Product Name"}</Text>
        <Text style={styles.col3}>{"Price"}</Text>
        <Text style={styles.col3}>{"Quantity"}</Text>
    </View>
);



// Create Document Component
export const PdfDoc: React.FC = () => {
    const location = useLocation();

    const tableRows = () => {
        const rows = location.state.items.map(item => (
            <View style={styles.row} key={1}>
                <Text style={styles.col1}>{item.productId}</Text>
                <Text style={styles.col2}>{item.productName}</Text>
                <Text style={styles.col3}>{`${centsToCurrency(item.price)} €`}</Text>
                <Text style={styles.col3}>{item.quantity}</Text>
            </View>
        ));
        return <Fragment>{rows}</Fragment>;
    }

    return(
    <PDFViewer style={styles.viewer}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.summary}>
                    <Text style={styles.description}>{`Sale ID ${location.state.saleId}`}</Text>
                    <Text style={styles.description}>{`Seller ${location.state.sellerName}`}</Text>
                    <Text style={styles.description}>{`date ${location.state.createdAt}`}</Text>
                    <Text style={styles.description}>{`Total Price ${centsToCurrency(location.state.totalPrice)}€`}</Text>
                </View>
                <View style={styles.tableContainer}>
                    {tableHeaders()}
                    {tableRows()}
                    {/*<TableFooter items={data.items} />*/}
                </View>
            </Page>
        </Document>
    </PDFViewer>
)};