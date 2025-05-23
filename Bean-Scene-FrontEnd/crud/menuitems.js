// url to connect to api points
//const baseUrl = 'http://localhost:3000/api';
const baseUrl = 'https://api.finch.dev.thickets.onl/api';

//function to create menu items
const createItem = async (data) => {
    try {
        const response = await fetch(`${baseUrl}/menuitems`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        return await response.json()
    }
    catch (error) {
        console.error('Error creaing item', error)
    }
}

// function to get all menu items
const getMenuItems = async () => {
    try {
        const response = await fetch(`${baseUrl}/menuitems`);
        if (!response.ok) throw new Error('Failed to fetch items');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

// function to get menu items
const getSingleItem = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/menuitems/${id}`);
        if (!response.ok) throw new Error('Failed to fetch item');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

// function to update menu items
const updateMenuItem = async (id, updatedItem) => {
    try {
        const response = await fetch(`${baseUrl}/menuitems/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        });
        if (!response.ok) {
            throw new Error('Failed to update the menu item');
        }
        return await response.json
    }
    catch (error) {
        console.error('Error creaing item', error)
    }
};

// function to Delete menu items
const deleteItem = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/menuitems/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete item');
        }

        console.log('Item deleted');
    } catch (error) {
        console.error('Error deleting item', error.message);
        throw error; // Re-throw to handle it in the calling function
    }
};

export { createItem, getMenuItems, getSingleItem, updateMenuItem, deleteItem };