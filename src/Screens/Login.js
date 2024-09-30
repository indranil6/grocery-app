import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSignin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const user = users.find(
        user => user.email === email && user.password === password,
      );

      if (user) {
        let signedInUser = {...user, isLoggedIn: true};
        users.splice(users.indexOf(user), 1, signedInUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        alert('Signin successful!');
        navigation.navigate('Home'); // Navigate to Home
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in');
    }
  };
  const isLoggedInUserFound = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(user => user.isLoggedIn === true);
    if (user) {
      navigation.navigate('Home');
    }
  };
  useEffect(() => {
    isLoggedInUserFound();
  }, []);
  const handleIconPress = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/playstore.png')} style={styles.image} />
      <Text style={styles.loginText}>Login</Text>

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
        onIconPress={handleIconPress}
      />

      <CommonButton title="Login" onPress={handleSignin} />

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
        }}>
        Forgot Password?
      </Text>

      <Text
        onPress={() => navigation.navigate('Signup')}
        style={{
          color: 'blue',
          alignSelf: 'center',
          marginTop: 20,
          textDecorationLine: 'underline',
        }}>
        Create New Account
      </Text>
    </View>
  );
};

export default Login;

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
