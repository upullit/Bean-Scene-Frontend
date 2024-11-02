import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const CustomText = (props) => {
  return <RNText {...props} style={[styles.defaultFont, props.style]} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'Baloo Tammudu 2',
  },
});

export default CustomText;