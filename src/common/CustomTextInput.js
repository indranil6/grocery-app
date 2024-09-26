import React from 'react';
import {TextInput, StyleSheet, View, Image, Pressable} from 'react-native';

const CustomTextInput = props => {
  return (
    <View style={styles.input}>
      <PressableIcon icon={props.icon} onPress={props.onIconPress || null} />

      <TextInput
        keyboardType={props.keyboardType || 'default'}
        placeholder={props.placeholder || ''}
        placeholderTextColor={'#000'}
        secureTextEntry={props.secureTextEntry || false}
        value={props.value || ''}
        onChangeText={props.onChangeText || null}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

function PressableIcon(props) {
  return props.onPress ? (
    <Pressable onPress={props.onPress || null}>
      <Image
        source={props.icon}
        style={{width: 20, height: 20, marginRight: 10}}
      />
    </Pressable>
  ) : (
    <Image
      source={props.icon}
      style={{width: 20, height: 20, marginRight: 10}}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    width: '85%',
    marginTop: 20,
    paddingLeft: 10,
    alignItems: 'center',
  },
});
