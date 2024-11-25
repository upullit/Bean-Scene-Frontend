import React from 'react';
import { render, act } from 'react-test-renderer';  // Ensure correct import from 'react-test-renderer'
import ServerOrderScreen from '../screens/ServerOrderScreen';
import { getMenuItems } from '../crud/menuitems';
import { createTicket } from '../crud/ticket';

jest.mock('../crud/menuitems');
jest.mock('../crud/ticket');

describe('ServerOrderScreen', () => {
  let component;

  beforeEach(async () => {
    // Mock the resolved data for menu items
    getMenuItems.mockResolvedValue([
      { _id: '1', name: 'Item 1', price: 10, category: 'Drinks' },
      { _id: '2', name: 'Item 2', price: 20, category: 'Breakfast' },
    ]);

    // Mock the createTicket function
    createTicket.mockResolvedValue({ success: true });

    // Use the correct render method from 'react-test-renderer'
    await act(async () => {
      component = render(<ServerOrderScreen />);
    });
  });

  it('should render menu items', () => {
    // Verify that the menu items are rendered
    expect(component.root.findByProps({ children: 'Item 1' })).toBeTruthy();
    expect(component.root.findByProps({ children: 'Item 2' })).toBeTruthy();
  });

  it('should add an item to the order', async () => {
    const addButton = component.root.findByProps({ testID: 'add-item-1' });
    await act(async () => {
      addButton.props.onPress();
    });

    const totalPrice = component.root.findByProps({ testID: 'total-price' });
    expect(totalPrice.props.children).toContain('Total Price: $10.00');
  });

  it('should clear the order', async () => {
    const addButton = component.root.findByProps({ testID: 'add-item-1' });
    await act(async () => {
      addButton.props.onPress();
    });

    const totalPrice = component.root.findByProps({ testID: 'total-price' });
    expect(totalPrice.props.children).toContain('Total Price: $10.00');

    const clearButton = component.root.findByProps({ testID: 'clear-order' });
    await act(async () => {
      clearButton.props.onPress();
    });

    expect(totalPrice.props.children).toContain('Total Price: $0.00');
  });
});