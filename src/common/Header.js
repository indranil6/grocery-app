import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

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
      <Text style={styles.subText}>Sub Text</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    elevation: 5,
  },
  brandLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
