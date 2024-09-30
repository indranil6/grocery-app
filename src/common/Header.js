import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import CartIcon from './CartIcon';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
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
