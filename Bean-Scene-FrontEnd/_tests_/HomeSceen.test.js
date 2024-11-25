import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import renderer from 'react-test-renderer'; 
import HomeScreen from '../screens/HomeScreen'; // Adjust the import path as needed
import * as ScreenOrientation from 'expo-screen-orientation';

jest.mock('expo-screen-orientation', () => ({
  lockAsync: jest.fn(),
  unlockAsync: jest.fn(),
  OrientationLock: {
    LANDSCAPE: 'LANDSCAPE',
  },
}));

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const tree = renderer.create(<HomeScreen navigation={mockNavigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls lockAsync on mount', () => {
    const component = renderer.create(<HomeScreen navigation={mockNavigation} />);
    // Ensure lockAsync is called with LANDSCAPE
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith(ScreenOrientation.OrientationLock.LANDSCAPE);
  });

  test('navigates to the correct screens on button presses', () => {
    const component = renderer.create(<HomeScreen navigation={mockNavigation} />);
    const root = component.root;

    // Find all TouchableOpacity elements
    const buttons = root.findAllByType(TouchableOpacity);

    // Simulate button presses
    buttons[0].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ServerOrder');

    buttons[1].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Ticket');

    buttons[2].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Kitchen');

    buttons[3].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Admin');

    buttons[4].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CustomerMenu');

    buttons[5].props.onPress();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CustomerOrder');
  });

  // New test for style assertions
  test('has correct styles applied to elements', () => {
    const component = renderer.create(<HomeScreen navigation={mockNavigation} />);
    const root = component.root;

    // Find elements to test their styles
    const texts = root.findAllByType(Text);
    const title = texts[0];
    expect(title.props.style).toEqual(expect.objectContaining({
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 50,
    }));
  
    // Check the general description text style (second Text element)
    const descriptionText = texts[1]; // Assuming this is the description "Hi, this is the Bean Scene menu ordering app"
    expect(descriptionText.props.style).toEqual(expect.objectContaining({
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#251605',
    }));
  
    // Check the button text style (third Text element)
    const buttonText = texts[2]; // This should be the first button text, "Server Ordering"
    expect(buttonText.props.style).toEqual(expect.objectContaining({
      color: '#F8FAE5',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    }));
  
    // Check all button styles (TouchableOpacity elements)
    const buttons = root.findAllByType(TouchableOpacity);
    buttons.forEach((button) => {
      expect(button.props.style).toEqual(expect.objectContaining({
        backgroundColor: '#76453B',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
      }));
    });
  })});