// url to connect to api points
const baseUrl = 'http://localhost:3000/api';

// Function to create a new ticket
const createTicket = async (data) => {
    try {
        const response = await fetch(`${baseUrl}/ticketorders`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        if (!response.ok) throw new Error('Failed to create ticket');
        return await response.json()
    } catch (error) {
        console.error('Error creating ticket:', error)
    }
};

// Function to get all tickets
const getTickets = async () => {
    try {
        const response = await fetch(`${baseUrl}/ticketorders`);
        if (!response.ok) throw new Error('Failed to fetch tickets');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }
};

// Function to get a single ticket by ID
const getSingleTicket = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/ticketorders/${id}`);
        if (!response.ok) throw new Error('Failed to fetch ticket');
        return await response.json();
    } catch (error) {
        console.error('Error fetching ticket:', error);
    }
};

// Function to update a ticket
const updateTicket = async (id, updatedData) => {
    try {
        const response = await fetch(`${baseUrl}/ticketorders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) throw new Error('Failed to update ticket');
        return await response.json();
    } catch (error) {
        console.error('Error updating ticket:', error);
    }
};

// Function to delete a ticket
const deleteTicket = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/ticketorders/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete ticket');
        console.log('Ticket deleted');
    } catch (error) {
        console.error('Error deleting ticket:', error);
    }
};

export { createTicket, getTickets, getSingleTicket, updateTicket, deleteTicket };