import React from "react";
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { DummyMenu } from '../Media-TempData/dummyMenu.js'; // Replace with crud menu
import CustomButton from '../CustomButton.js';


const MenuItem = ({ item }) => (
    <View style={styles.menuItem}>
        <View style={styles.details}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
);

const exportMenuToPDF = async () => {
    try {
      const htmlContent = `
        <h1 style="text-align: center;">Bean Scene Menu</h1>
        <ul>
          ${DummyMenu.map(item => `
            <li style="margin-bottom: 10px;">
              <strong>${item.title}</strong><br />
              <em>${item.description}</em><br />
              Price: ${item.price}
            </li>
          `).join('')}
        </ul>
      `;
  
      const options = {
        html: htmlContent,
        fileName: 'Bean_Scene_Menu',
        directory: 'Documents',
      };
  
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('PDF created', `File saved to: ${file.filePath}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create PDF: ' + error.message);
    }
  };

  const CustomerMenuScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bean Scene Menu</Text>
            <FlatList
                data={DummyMenu} // Use imported DummyMenu here
                renderItem={({ item }) => <MenuItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.menuList}
            />
            <CustomButton title="Export Menu to PDF" onPress={exportMenuToPDF} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF4E4', // Light, neutral background
        padding: 20,
    },
    menuList: {
        paddingBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    details: {
        flex: 1,
        paddingRight: 10,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#76453B',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        alignContent: 'center',
    },
});



export default CustomerMenuScreen;



