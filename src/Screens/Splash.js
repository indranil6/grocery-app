import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the Login screen after 3 seconds
      navigation.replace('Login');
    }, 3000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../images/playstore.png')}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default Splash;
