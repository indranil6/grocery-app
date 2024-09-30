import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CartIcon from './CartIcon';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back-arrow.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <Image
          source={require('../images/playstore.png')}
          style={styles.brandLogo}
        />
        <Text style={styles.brandText}>Grocer Spencer</Text>
      </View>
      <CartIcon />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    elevation: 5,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  back: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  brandText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  subText: {
    fontSize: 12,
    marginRight: 10,
  },
});
