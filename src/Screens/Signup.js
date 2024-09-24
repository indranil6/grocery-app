import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import React from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleIconPress = isConfirmPassword => {
    isConfirmPassword
      ? setShowConfirmPassword(!showConfirmPassword)
      : setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === email);

      if (userExists) {
        alert('User already exists');
      } else {
        users.push({email, password});
        await AsyncStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful!');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while signing up');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/playstore.png')} style={styles.image} />
      <Text style={styles.loginText}>Signup</Text>

      <CustomTextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        icon={require('../images/mail.png')}
      />

      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        icon={
          showPassword
            ? require('../images/show.png')
            : require('../images/hide.png')
        }
        onIconPress={() => handleIconPress(false)}
      />

      <CustomTextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        icon={
          showConfirmPassword
            ? require('../images/show.png')
            : require('../images/hide.png')
        }
        onIconPress={() => handleIconPress(true)}
      />

      <CommonButton title="Signup" onPress={handleSignup} />

      <Text
        onPress={() => navigation.navigate('Login')}
        style={{
          color: 'blue',
          alignSelf: 'center',
          marginTop: 20,
          textDecorationLine: 'underline',
        }}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginText: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 100,
    padding: 10,
  },
});
