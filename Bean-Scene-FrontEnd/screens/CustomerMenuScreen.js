import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import DownloadPDFButton from '../DownloadPDFButton';

const MenuScreen = () => {
    const [menuSections, setMenuSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://api.finch.dev.thickets.onl/api/menuitems');
                const data = await response.json();

                // Group items by category into sections
                const sections = Object.entries(
                    data.reduce((acc, item) => {
                        if (!acc[item.category]) acc[item.category] = [];
                        acc[item.category].push(item);
                        return acc;
                    }, {})
                ).map(([category, items]) => ({
                    title: category,
                    data: items,
                }));

                setMenuSections(sections);
                setLoading(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to load menu items');
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bean Scene Menu</Text>
            </View>

            <SectionList
                sections={menuSections}
                keyExtractor={(item) => item._id}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.categoryTitle}>{title}</Text>
                )}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.itemRow}>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
                
            />

            <DownloadPDFButton style={styles.downloadButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF4E4',
        position: 'relative',
        marginHorizontal: 200,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 14,
        textAlign: 'center',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 10,
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    itemName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDescription: {
        flex: 1, 
        fontSize: 18,
        color: '#666',
    },
    itemPrice: {
        fontSize: 18,
        color: '#76453B',
        textAlign: 'right',
        marginLeft: 8,
    },
    header: {
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 14,
    },
    downloadButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 999,
    },
    divider: {
        height: 1,
        backgroundColor: '#DDD',
        marginTop: 8, // Space between title and the divider
        marginBottom: 10, // Space between divider and items
        width: '100%', // Ensures it spans across the width of the section
    },
});

export default MenuScreen;