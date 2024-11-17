import React from 'react';
import { Linking, Alert, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';

const DownloadPDFButton = () => {
    const downloadPDF = async () => {
        try {
            const url = 'http://localhost:3000/api/menuitems/generatepdf'; // Use deployed URL if applicable
            Linking.openURL(url);
        } catch (error) {
            Alert.alert('Error', 'Failed to download PDF.');
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <CustomButton title="Download Menu as PDF" onPress={downloadPDF} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'flex-end', // Align the button to the right
        marginBottom: 16, // Add spacing from other components
    },
    button: {
        width: 'auto', // Prevent the button from stretching
        paddingHorizontal: 10, // Adjust padding if needed
    },
});

export default DownloadPDFButton;