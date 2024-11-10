import React from 'react';
import { Button, Linking, Alert } from 'react-native';

const DownloadPDFButton = () => {
    const downloadPDF = async () => {
        try {
            const url = 'http://localhost:3000/api/menuitems/generatepdf'; // Use deployed URL if applicable
            Linking.openURL(url);
        } catch (error) {
            Alert.alert('Error', 'Failed to download PDF.');
        }
    };

    return <Button title="Download Menu as PDF" onPress={downloadPDF} />;
};

export default DownloadPDFButton;
