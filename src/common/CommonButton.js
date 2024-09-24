import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CommonButton = ({
  onPress,
  title,
  bgColor = 'black',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        width: '85%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 25,
      }}>
      <Text
        style={{
          color: textColor,
          fontSize: 20,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
