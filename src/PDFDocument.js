import { Component } from 'react';
//React-PDF: MIT-license
import { Document, Page, Text, View, Svg } from '@react-pdf/renderer';
//QRCode: MIT-license
import QRCode from "react-qr-code";


class PDFDocument extends Component {
    render() {
        return (
            <Document>
                <Page>
                    <View>
                        <Text>Section #1</Text>
                    </View>
                    <View>
                        <Svg><QRCode value="Hallo :)" size={90} /></Svg>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default PDFDocument;
